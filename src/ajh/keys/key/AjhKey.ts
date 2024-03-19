
import { Color, Mesh, MeshMatcapMaterial, Object3D, Vector2, Vector3, WebGLRenderer } from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry";
import { Filter } from "tone";
import AjhModel from "../../datamodels/AjhModel";
import { deepDispose } from "../../helpers/scene/ajhThreeDisposal";
import AjhNamedNote from "../../sonics/AjhNamedNote";
import AjhKeys from "../keyboards/AjhKeyBoard";
import AjhKeyColours from "./AjhKeyColours";
import AjhKeyDataModel from "./AjhKeyDataModel";
import AjhKeyHandlerFunctions from "./AjhKeyHandlerFunctions";

export default class AjhKey {

    ////////////////////////////////////////////////////////////////
    
    private _State: AjhKeyDataModel = new AjhKeyDataModel();
    public get KeyState(): AjhKeyDataModel {
        return this._State;
    }
    public set KeyState(value: AjhKeyDataModel) {
        this._State = value;
    }

    private KeyHandlers:AjhKeyHandlerFunctions

    private _baseColor: Color;
    public get baseColor(): Color {
        return this._baseColor;
    }
    public set baseColor(value: Color) {
        this._baseColor = value;
    }
       
    ////////////////////////////////////////////////////////////////
    
    constructor(

        id: number,
        rowId:number,
        colId:number,
        keyWidth:number,
        keyHeight:number, 
        keyLength:number,
        isSharpOrFlat:boolean,
        noteName:string,
        octave:number,
        keyboardInstance: AjhKeys,
        positionInKeyboard: number
        
    ) {

        this.KeyState.createAll();

        this.KeyState.setAllValueStates( 

            id,// IdNewValue, //:string,
            keyboardInstance,// keyboardInstance, //: AjhKeyBoard,
            positionInKeyboard, // PositionInKeyBoard : number

            false,// IsRayTouched, // : boolean,
            false, // IsPointerDown, // : boolean,
            false,// IsPointerMove, // : boolean,
            false,// IsPointerOut, // : boolean,

            colId,// ColId,// : number,
            rowId,// RowId, // : number,

            new AjhKeyColours(), // Colours, // : AjhKeyColours,
            keyHeight,// Height, // : number, 
            keyWidth,// Width, // : number,
           
            keyLength,// Length, // : number,
            new Vector3(),// Position, // : Vector3,
            new Vector2(),// ScreenPosition, // : Vector2,
            
            noteName,// NoteNameNewValue, //:string,
            octave, // OctaveNewValue, //:number,
            isSharpOrFlat,// IsSharpOrFlatState, //:boolean,
            false// IsPlayingState //:boolean
            
        )

        this.KeyHandlers = new AjhKeyHandlerFunctions(this);

        this.createKeyBody();

        this.changeKeySizeToFitScreenSize();

        
        this.addListeners();

      }

    ////////////////////////////////////////////////////////////////
    
    public createKeyBody() {

        this.KeyState.View.Body
        = 
        new Mesh(
            this.modelInstance.geometries.keyGeometry, 
            this.darkMaterial
        );

        this.repaintBody();
 
        // if( this.KeyState.Sonics.IsSharpOrFlat ){    
            
        //     this.KeyState.View.Body
        //     = 
        //     new Mesh(
        //         this.modelInstance.geometries.keyGeometry, 
        //         this.darkMaterial
        //     );

        //     this.KeyState.View.Colours.baseColour 
        //     = 
        //     this.KeyState.KeyboardInstance.KeyColoursDef.Accidentals;
            
        //     this.KeyState.View.Colours.createHighLightColourFromBaseColour();
        
        // } else{
            
        //     this.KeyState.View.Body
        //     = 
        //     new Mesh(
        //         this.modelInstance.geometries.keyGeometry, 
        //         this.lightMaterial
        //     );

        //     this.KeyState.View.Colours.baseColour 
        //     = 
        //     this.KeyState.KeyboardInstance.KeyColoursDef.Naturals;

        //     this.KeyState.View.Colours.createHighLightColourFromBaseColour();

        // }

        // this.KeyState.View.Body.castShadow = true;

        // /////////////////////////////////////////////////////
        // // set colour //
        // /////////////////////////////////////////////////////

        // let material 
        // = 
        // (
        //     this.KeyState.View.Body as Mesh
        // )
        // .material as MeshMatcapMaterial;
    
        // // this.darkMaterial.needsUpdate = true;
        // if(this.modelInstance.useSpectrumColours){
            
        //     material.color 
        //     =
        //     this.modelInstance.colours.spectrumArray[this.KeyState.View.ColId%12];
        //     // this.modelInstance.colours.spectrumArray[this.KeyState.PositionInKeyboard%12];
            
        //     material.needsUpdate = true;

        //     this.KeyState.View.Colours.baseColour 
        //     = 
        //     // this.modelInstance.colours.spectrumArray[this.KeyState.PositionInKeyboard%12];
        //     this.modelInstance.colours.spectrumArray[this.KeyState.View.ColId%12];

        //     this.KeyState.View.Colours.createHighLightColourFromBaseColour();
            
        // }

        ////////////////////////////////////////////////////////

        // material.needsUpdate = true;

        this.KeyState.View.Body.position.y = 0.5;

    }

    ////////////////////////////////////////////////////////////////
    
    disposeOfKeyBody(){
       
        deepDispose(this.KeyState.View.Body);
        
       (this._modelInstance.renderer as WebGLRenderer)
       .renderLists.dispose();

    }

    ////////////////////////////////////////////////////////////////
    
    changeKeySizeToFitScreenSize(){
        
        let screenSize = this.modelInstance.getCameraViewSizeXY();

        this.changeKeyLengthToFitScreenHeight(screenSize.y);
        this.changeKeyWidthToFitScreenWidth(screenSize.x);
        
    }

    ////////////////////////////////////////////////////////////////
    
    changeKeyLengthToFitScreenHeight(newScreenHeight){

        this.KeyState.View.Length 
        =  
        (newScreenHeight / this.KeyState.KeyboardInstance.numberOfRows);

        ( this.KeyState.View.Body as Mesh ).geometry.dispose();
        
        ( this.KeyState.View.Body as Mesh ).geometry 
        = 
        new RoundedBoxGeometry(
            this.KeyState.View.Width, 
            this.KeyState.View.Height, 
            this.KeyState.View.Length,
            7,
            0.05
        );


    }

    ////////////////////////////////////////////////////////////////
    
    changeKeyWidthToFitScreenWidth(newScreenWidth){
        
        this.KeyState.View.Width 
        = 
        (newScreenWidth
        / 
        this.KeyState.KeyboardInstance.numberOfColumns);

        ( this.KeyState.View.Body as Mesh ).geometry.dispose();
        
        ( this.KeyState.View.Body as Mesh ).geometry = 
        new RoundedBoxGeometry(
            this.KeyState.View.Width, 
            this.KeyState.View.Height, 
            this.KeyState.View.Length,
            7,
            0.65
        );

    }

    ////////////////////////////////////////////////////////////////
    
    private addListeners(){
  
        this._modelInstance.musicalKeyEventEmitter
        .on(
            "touchedByRay",
            this.KeyHandlers
            .isRayTouchedListener.bind(this.KeyHandlers)
        );
   
        this._modelInstance.musicalKeyEventEmitter
        .on(
            "onPointerUp",
            this.KeyHandlers
            .onPointerUpListener.bind(this.KeyHandlers)
        );

        this._modelInstance.musicalKeyEventEmitter
        .on(
            "onPointerDown",
            this.KeyHandlers
            .onPointerDownListener.bind(this.KeyHandlers)
        );

        this._modelInstance.musicalKeyEventEmitter
        .on(
            "onPointerLeave",
            this.KeyHandlers
            .onPointerLeaveListener.bind(this.KeyHandlers)
        );

    }

    ////////////////////////////////////////////////////////////////
    
    public setKeyInstanceScale(size){

        // this._body.scale.x =
        // this._body.scale.y =
        // this._body.scale.z = size;

    }

    ////////////////////////////////////////////////////////////////
    
    public setKeyColour(colour){

        (
            (this.KeyState.View.Body as Mesh)
            .material as MeshMatcapMaterial
        )
        .color 
        = 
        colour;

        //.emissive = colour;
        
    }

    ////////////////////////////////////////////////////////////////
    
    public highlightKey(toggle:boolean){

        const mesh = this.KeyState.View.Body as Mesh
        const material = mesh.material as MeshMatcapMaterial

        if(toggle == true){

            if(this.modelInstance.showColourMessages){

                console.log( "HIGHLIGHT : KEY : " + this.KeyState.Id )

            };

            material.color = this.KeyState.View.Colours.highlightColour;
            material.needsUpdate = true;
     
        } else{

            material.color = this.KeyState.View.Colours.baseColour;
            material.needsUpdate = true;    

        }

    }

    ////////////////////////////////////////////////////////////////
  
    
    ////////////////////////////////////////////////////////////////
    
    public selectedListener( 
        selected: boolean, 
        keyMeshInstance: number
     ){

        if(
                this.KeyState.State.IsRayTouched
            ){

                console.log(

                    "key selected:"    +    selected
                    
                )

            }

        if(
            (this._body.id === keyMeshInstance)
        ){

            if(this.modelInstance.showMusicalKeyMessages){

                console.log(

                    "I am  key number " 
                    + this._id
                    + ", at position "
                    + this._id
                    + " and i heard that it is "
                    + selected +
                    " that i was Selected!"
                
                );

            }
            
           // this._selected = true;

            this.modelInstance.musicalKeyEventEmitter
                .emit(
                    "toggle", 
                    this, 
                    this._id,
                    0,
                    0,
                    0
                    );

        }
    }

    ////////////////////////////////////////////////////////////////
    
    public repaintBody(){

        console.log("REPAINTING MY BODY : "+ this.KeyState.Id);

        let material 
        =  
        ((this.KeyState.View.Body as Mesh)
        .material as MeshMatcapMaterial);

        if( this.KeyState.Sonics.IsSharpOrFlat ){    
                
            if(this.modelInstance.useSpectrumColours){

                this.KeyState.View.Colours.baseColour
                =
                material.color 
                = 
                this.modelInstance
                    .colours
                    .spectrumArray[
                        this.modelInstance
                        .scaleTypes
                        .getNoteIndexFromName(this.KeyState.Sonics.NoteName)
                        
                        // this.KeyState.View.ColId%12
                    ];

                material.needsUpdate = true;

            } else {

                this.KeyState.View.Colours.baseColour
                =
                material.color 
                = 
                this.KeyState.KeyboardInstance.KeyColoursDef.Naturals;
                 //new Color('#408080');
            }
        
        } else {

            if(this.modelInstance.useSpectrumColours){
                
                this.KeyState.View.Colours.baseColour
                =
                material.color 
                =
                this.modelInstance.colours.spectrumArray[this.KeyState.View.ColId%12];
                
                material.needsUpdate = true;

            }
            else{

                this.KeyState.View.Colours.baseColour
                =
                material.color 
                = 
                this.KeyState.KeyboardInstance.KeyColoursDef.Accidentals;
                //new Color('#c18c3e');

            }

        }

        this.KeyState.View.Colours.baseColour = material.color;

        this.KeyState.View.Colours.createHighLightColourFromBaseColour();

    }

    ////////////////////////////////////////////////////////////////
    
    public darkMaterial 
    = new MeshMatcapMaterial({
        color: '#006786',
    // metalness: 0.35,
    // roughness: 0.41,
        // emissive:
        });

    public lightMaterial 
    = new MeshMatcapMaterial({
        color: '#00A8A0',
    //  metalness: 0.35,
    // roughness: 0.41,
        });

        public darkOnMaterial 
    = new MeshMatcapMaterial({
        color: '#DDA960',
    //  metalness: 0.35,
    //  roughness: 0.1,
        });

    public lighOntMaterial 
    = new MeshMatcapMaterial({
        color: '#F4DA93',
    // metalness: 0.35,
    // roughness: 0.1,
        });

    ////////////////////////////////////////////////////////////////

    private _isBlackKey: boolean = false;
    public get isBlackKey(): boolean {
        return this._isBlackKey;
    }
    public set isBlackKey(value: boolean) {
        this._isBlackKey = value;
    }

////////////////////////////////////////////////////////////////

    public get id(): number {
        return this._id;
    }

   
    public get filter(): Filter {
        return this._filter;
    }

    public get positionInKeyboardArray(): number {
        return this._positionInKeyboardArray;
    }
   
    public get body(): Object3D {
        return this._body;
    }

    public get frequency(): number {
        return this._frequency;
    }

    public get voice(): any {
        return this._voice;
    }

    public get modelInstance(): AjhModel {
        return this._modelInstance;
    }



    public get colours(): AjhKeyColours {
        return this.KeyState.View.Colours;
    }
   
    //  public get playing(): boolean {
    //     return this._playing;
    // }
   
    public get touched(): boolean {
        return this.KeyState.State.IsRayTouched;
    }
    

    
    // public get selected(): boolean {
    //     return this._selected;
    // }
    


    public get note(): AjhNamedNote {
        return this._note;
    }
    
//////////////////////////////////////////////////////////////////////

    public set note(value: AjhNamedNote) {
        this._note = value;
    }

    public set positionInKeyboardArray(value: number) {
        this._positionInKeyboardArray = value;
    }

    public set id(value: number) {
        this._id = value;

        if(this.modelInstance.showMusicalKeyMessages){

            console.log("I have set my id to: "+this._id);

        }
        
    }

    public set filter(value: Filter) {
        this._filter = value;
    }

    public set body(value: Object3D) {
        this._body = value;
    }

    public set frequency(value: number) {
        this._frequency = value;
    }

    public set voice(value: any) {
        this._voice = value;
    }

    public set modelInstance(value: AjhModel) {
        this._modelInstance = value;
    }

    ////////////////////////////////////////////////////////////////
    
    public set isOn(value: boolean) {

        this.KeyState.State.IsActive = value;

        if(this.KeyState.State.IsActive){


            if(this.modelInstance.showMusicalKeyMessages){

                console.log(

                    "I am  key number " 
                    + this._id
                    + ", and it is now "
                    + this.KeyState.State.IsActive 
                    + " that I am on,"
                    + "so I switched myself on"

                );
    
            }

           // this.setKeyInstanceScale(this.State.State.IsActiveScale);
            
            if(!this._muted){
              //  this.setKeyColour(this.colours.onColour);
            }

        }
         
        if(!this.KeyState.State.IsActive){

            if(this.modelInstance.showMusicalKeyMessages){

                console.log(

                    "I am  key number " 
                    + this._id
                    + " of Euclidean Ring "
                    
                    + " and it is now "
                    + this.KeyState.State.IsActive 
                    + " that I am on,"
                    + "so I switched myself off"

                );
    
            }
                
           // this.setKeyInstanceScale(this._isOffScale);

            if(!this._muted){
              //  this.setKeyColour(this.colours.offColour);
            }

        }

    }

    ////////////////////////////////////////////////////////////////
    
    private _note: AjhNamedNote;
    private _id: number

    private _positionInKeyboardArray: number;

    private _filter: Filter
    private _body: Object3D
    private _frequency: number
    private _voice: any

    private _rowId: number;
    public get rowId(): number {
        return this._rowId;
    }
    public set rowId(value: number) {
        this._rowId = value;
    }

    private _colId: number;
    public get colId(): number {
        return this._colId;
    }
    public set colId(value: number) {
        this._colId = value;
    }

    private _muted: boolean;
    public get muted(): boolean {
        return this._muted;
    }
    public set muted(value: boolean) {
        this._muted = value;
        this.setKeyColour(this.KeyState.View.Colours.inactiveColour)
    }

    ////////////////////////////////////////////////////////////////
    
    private _modelInstance: AjhModel = AjhModel.Instance ;

    private _colours: AjhKeyColours;
  
    ////////////////////////////////////////////////////////////////
    
    private _keyWidth: number; 
    public get keyWidth(): number {
        return this._keyWidth;
    }
    public set keyWidth(value: number) {
        this._keyWidth = value;
    }

    private _keyHeight: number; 
    public get keyHeight(): number {
        return this._keyHeight;
    }
    public set keyHeight(value: number) {
        this._keyHeight = value;
    }

    private _keyLength: number; 
    public get keyLength(): number {
        return this._keyLength;
    }
    public set keyLength(value: number) {
        this._keyLength = value;
    }

    ////////////////////////////////////////////////////////////////
    
    public set colours(value: AjhKeyColours) {
        this.KeyState.View.Colours = value;
    }

    public set touched(value: boolean) {
        this.KeyState.State.IsRayTouched = value;
    }
   
    ////////////////////////////////////////////////////////////////

}


