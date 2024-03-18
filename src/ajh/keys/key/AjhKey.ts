
import { Color, Mesh, MeshStandardMaterial, Object3D, Vector2, Vector3, WebGLRenderer } from "three";
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

//////////////////////////////////////////////////////////////////////

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
       
//////////////////////////////////////////////////////////////////////


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
            positionInKeyboard, // PositionInKeyBoard

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
        // generate random note :

        let noteRefId = 
            Math.round(
                Math.random()
                *
                (
                    this.modelInstance.scales.
                    noteNamesWithOctaveRegister.length-1
                )
            );

        this._note = 
            new AjhNamedNote(
                this.modelInstance.scales.noteNamesWithOctaveRegister[
                noteRefId
                ],
                noteRefId
            );

            this.createKeyBody();

            this.changeKeySizeToFitScreenSize();

        
        this.addListeners();

      }

//////////////////////////////////////////////////////////////////////
   
 public createKeyBody() {
 
        if( this.KeyState.Sonics.IsSharpOrFlat ){    
            
            this.KeyState.View.Body
            = 
            new Mesh(
                this.modelInstance.geometries.keyGeometry, 
                this.darkMaterial
            );

            this.baseColor = this.darkMaterial.color;
        
        } else{
            
            this.KeyState.View.Body
            = 
            new Mesh(
                this.modelInstance.geometries.keyGeometry, 
                this.lightMaterial
            );

            this.baseColor = this.lightMaterial.color;

        }

        this.KeyState.View.Body.castShadow = true;

        /////////////////////////////////////////////////////
        // set colour //
        /////////////////////////////////////////////////////
        
        // this.darkMaterial.needsUpdate = true;
        if(this.modelInstance.useSpectrumColours){
            
            (
                (
                    this.KeyState.View.Body as Mesh
                )
                .material as MeshStandardMaterial
            )
            .color 
            =
            this.modelInstance.colours.spectrumArray[this.KeyState.View.ColId%12];

            this.lightMaterial.needsUpdate = true;
            (
                (
                    this.KeyState.View.Body as Mesh
                )
                .material as MeshStandardMaterial
            ).needsUpdate = true;

            this.baseColor = this.modelInstance.colours.spectrumArray[this.KeyState.View.ColId%12];


        }

        ////////////////////////////////////////////////////////

        (

            (this.KeyState.View.Body as Mesh)
            .material as MeshStandardMaterial

        ).needsUpdate = true;

        this.KeyState.View.Body.position.y = 0.5;

    }

//////////////////////////////////////////////////////////////////////

    disposeOfKeyBody(){
       
        deepDispose(this.KeyState.View.Body);
        
       (this._modelInstance.renderer as WebGLRenderer)
       .renderLists.dispose();

    }

//////////////////////////////////////////////////////////////////////

    changeKeySizeToFitScreenSize(){
        
        let screenSize = this.modelInstance.getCameraViewSizeXY();

        this.changeKeyLengthToFitScreenHeight(screenSize.y);
        this.changeKeyWidthToFitScreenWidth(screenSize.x);
        
    }

    changeKeyLengthToFitScreenHeight(newScreenHeight){

        this.KeyState.View.Length 
        =  
        (newScreenHeight / this.KeyState.KeyboardInstance.numberOfRows);
        
        // (( this.State.View.Body as Mesh ).geometry as BoxGeometry )
        
        // ( this.State.View.Body as Mesh ).scale.set( 
            
        //     this.keyWidth, 
        //     this.keyHeight, 
        //     this.keyLength
            
        // );

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
            0.05
        );

    }

//////////////////////////////////////////////////////////////////////

    private addListeners(){
        
        // this._modelInstance.keyEventEmitter
        // .on("off",this.offListener.bind(this));

        // this._modelInstance.musicalKeyEventEmitter
        // .on("on_off",this.onListener.bind(this));

        // this._modelInstance.keyEventEmitter
        // .on(
        //     "repaint",
        //     this.repaintListener.bind(this)
        // );
        
        this._modelInstance.musicalKeyEventEmitter
        .on(
            "touchedByRay",
            this.KeyHandlers.isRayTouchedListener.bind(this.KeyHandlers)
        );
    
        // this._modelInstance.musicalKeyEventEmitter
        // .on(
        //     "no longer touched",
        //     this.noLongerTouchedListener.bind(this)
        // );
        
        // this._modelInstance.musicalKeyEventEmitter
        // .on(
        //     "selected",
        //     this.selectedListener.bind(this)
        // );
        
        this._modelInstance.musicalKeyEventEmitter
        .on(
            "onPointerUp",
            this.KeyHandlers.onPointerUpListener.bind(this.KeyHandlers)
        );

        this._modelInstance.musicalKeyEventEmitter
        .on(
            "onPointerDown",
            this.KeyHandlers.onPointerDownListener.bind(this.KeyHandlers)
        );

        this._modelInstance.musicalKeyEventEmitter
        .on(
            "onPointerLeave",
            this.KeyHandlers.onPointerLeaveListener.bind(this.KeyHandlers)
        );

        // this._modelInstance.musicalKeyEventEmitter
        // .on(
        //     "onPointerOut",
        //     this.onPointerOutListener.bind(this)
        //     );

        //     this._modelInstance.musicalKeyEventEmitter
        // .on(
        //     "onPointerLeave",
        //     this.onPointerLeaveListener.bind(this)
        //     );

        // this._modelInstance.noteEventEmitter
        // .on(
        //     "on_off",
        //     this.noteOnListener.bind(this)
        // );
        
    }

//////////////////////////////////////////////////////////////////////

    public setKeyInstanceScale(size){

        // this._body.scale.x =
        // this._body.scale.y =
        // this._body.scale.z = size;

    }

//////////////////////////////////////////////////////////////////////

    public setKeyColour(colour){

        (
            (this.KeyState.View.Body as Mesh)
            .material as MeshStandardMaterial
        )
        .color 
        = 
        colour;

        //.emissive = colour;
        
    }

//////////////////////////////////////////////////////////////////////
    
    public highlightKey(toggle:boolean){

        const mesh = this.KeyState.View.Body as Mesh
        const material = mesh.material as MeshStandardMaterial

        if(toggle == true){
    
            material.needsUpdate = true;
            material.emissive.set("white")
            material.emissiveIntensity = 0.25;
     
        } else{
            material.needsUpdate = true;    
            material.emissive.set('black')
            material.emissiveIntensity = 0.05;
        }

    }

//////////////////////////////////////////////////////////////////////
    
        private noteOnListener(on_off, positionId,noteName){

        if(
           
            (
                this._positionInKeyboardArray == positionId 
                && 
                on_off == true 
            )

        ){

            if(this.modelInstance.showMusicalKeyMessages){

                console.log(
                    "Key " 
                    + positionId 
                    + " heard that it was playing a " 
                    + noteName
                )

            }

            this.modelInstance.musicalKeyEventEmitter.emit(

                "playing",
                this._positionInKeyboardArray,
                this.KeyState.Id,
                0,
                0,
                0

            )

        }

    }

//////////////////////////////////////////////////////////////////////
    
    private repaintListener(receivedId){

        if(this.KeyState.Id == receivedId){

            if(this.modelInstance.showMusicalKeyMessages){

                console.log(

                   "Key " + this._id + " received a REPAINT message.."
                
                );
            }
                    
        }

    }

//////////////////////////////////////////////////////////////////////////////

private onPointerOutListener(pointerid : number, id:number, uuid: string){

   
    if(this.modelInstance.instruments){

        if(
            ( (this.KeyState.View.Body as Mesh).uuid == uuid )
        ){

            console.log( 
                "Pointer out :: I am  key number " 
                + this.KeyState.Id
                + ", with a pitch of "
                + this.KeyState.Sonics.NoteName
                + " and i heard that my identifier: " 
                + this.KeyState.View.Body.uuid 
                + "was compared to:" 
                + uuid +
                " and i am trigging a NOTE RELEASE" 
            );

            this.KeyState.State.setIsPointerOut(true);

                if(this.KeyState.Sonics.IsPlaying){

                    if(this.modelInstance.instruments){

                        this.modelInstance.instruments
                        .stopToPlayANote(
                            this.KeyState.Sonics.NoteName 
                            + 
                            this.KeyState.Sonics.Octave.toString()
                        );
    
                    }
    
                    this.KeyState.Sonics.IsPlaying = false; 
    
                } else {
    
    
                }
        
            }

        
        };

    }
    
/////////////////////////////////////////////////////////////////////////////////
  
//////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////
  


    private onListener( isTrue ){

        if(this.modelInstance.showMusicalKeyMessages){

            console.log( "I heard that i should turn on!" )

        }

        this.isOn = true;

    }

    private offListener( isTrue ){

        if(this.modelInstance.showMusicalKeyMessages){

            console.log( "I heard that i should turn off!" )

        }
        
        this.isOn = false;

    }

/////////////////////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////////////////

    private checkIfOnAndRepaint(){

        if( this.KeyState.State.IsActive == false ){

            if(this.modelInstance.showMusicalKeyMessages){

                console.log(

                    "Key : "
                    + this._id
                    + ": It is " 
                    + this.KeyState.State.IsActive
                    + " that I am On , ie. I am Off."

                )

            }

            
            
            if(this.KeyState.Sonics.IsSharpOrFlat){

                this.darkMaterial.needsUpdate = true;
               // (this.State.View.Body as Mesh).material = this.darkMaterial;
           
            }
            else {


                this.lightMaterial.needsUpdate = true;
               // (this.State.View.Body as Mesh).material = this.lightMaterial;

            }

           // this.setKeyInstanceScale( this._isOffScale );
            
            if(!this._muted){

               // this.setKeyColour(this.colours.offColour);

            }

        }
        
        if( this.KeyState.State.IsActive == true ){

            if(this.modelInstance.showMusicalKeyMessages){
         
                console.log(

                    "I am On : " 
                    + this.KeyState.State.IsActive

                )

            }

            if(this.KeyState.State.IsRayTouched){

                console.log(

                    "I was raytouched : " 
                    + this.KeyState.State.IsRayTouched

                )

                this.highlightKey(true);

                if(this.KeyState.Sonics.IsSharpOrFlat){

                    //this.darkOnMaterial.needsUpdate = true;
                   // (this.State.View.Body as Mesh).material = this.darkOnMaterial;
               
                }
                else {
                    
                    //this.lighOntMaterial.needsUpdate = true;
                  //  (this.State.View.Body as Mesh).material = this.lighOntMaterial;
    
                }
            
            }
            else{

                console.log(

                    "I was raytouched : " 
                    + this.KeyState.State.IsRayTouched

                )

               this.highlightKey(false);

                if(this.KeyState.Sonics.IsSharpOrFlat){

                  //  (this.State.View.Body as Mesh).material = this.darkMaterial;
                    //this.darkMaterial.needsUpdate = true;

                }
                else {
    
                    //this.lightMaterial.needsUpdate = true;
                    //(this.State.View.Body as Mesh).material = this.lightMaterial;
    
                }

            }
            
            if(this.KeyState.Sonics.IsSharpOrFlat){

               // this.darkOnMaterial.needsUpdate = true;
               // (this.State.View.Body as Mesh).material = this.darkOnMaterial;
           
            }
            else {

               // this.lighOntMaterial.needsUpdate = true;
               // (this.State.View.Body as Mesh).material = this.lighOntMaterial;

            }

            // this.setKeyInstanceScale( this.State.State.IsActiveScale );

            if(!this._muted){

                //this.setKeyColour(this.colours.onColour);

            }

        }

    }

/////////////////////////////////////////////////////////////////////////////////  

public repaintBody(){

    console.log("REPAINTING MY BODY : "+ this.KeyState.Id);

    if( this.KeyState.Sonics.IsSharpOrFlat ){    
            
        // this.State.View.Body
        // = 
        // new Mesh(
        //     this.modelInstance.geometries.keyGeometry, 
        //     this.darkMaterial
        // );

        if(this.modelInstance.useSpectrumColours){
        
            // (this.State.View.Body as Mesh).material
            // = this.lightMaterial;
         //   let material =  ((this.State.View.Body as Mesh).material as MeshStandardMaterial).clone();
          // let colour =  ((this.State.View.Body as Mesh).material as MeshStandardMaterial).color.clone(); 
          // material.color =
           // this.modelInstance.colours.spectrumArray[this.colId%12];

           ((this.KeyState.View.Body as Mesh)
            .material as MeshStandardMaterial).color 
           = 
           this.modelInstance.colours.spectrumArray[this.colId%12];

           ( 
                (this.KeyState.View.Body as Mesh)
                .material as MeshStandardMaterial

            ).needsUpdate = true;

        } else {

            ((this.KeyState.View.Body as Mesh).material as MeshStandardMaterial).color 
            = 
            new Color('#462C07');

        }
    
    } else {
        
        // this.State.View.Body 
        // = 
        // new Mesh(
        //     this.modelInstance.geometries.keyGeometry, 
        //     this.lightMaterial
        // );
        
        let mat 
        =  
        ((this.KeyState.View.Body as Mesh).material as MeshStandardMaterial);

        if(this.modelInstance.useSpectrumColours){
            
            mat.color 
            =
            this.modelInstance.colours.spectrumArray[this.colId%12];

            
            mat.needsUpdate = true;


        }
        else{

            (
                (this.KeyState.View.Body as Mesh)
                .material as MeshStandardMaterial
            ).color 
            = 
            new Color('#f69f1f');

        }

    }
}
    

/////////////////////////////////////////////////////////////////////////////////

public darkMaterial 
= new MeshStandardMaterial({
    color: '#462C07',
    metalness: 0.35,
    roughness: 0.41,
    // emissive:
    });

public lightMaterial 
= new MeshStandardMaterial({
    color: '#f69f1f',
    metalness: 0.35,
    roughness: 0.41,
    });

    public darkOnMaterial 
= new MeshStandardMaterial({
    color: '#DDA960',
    metalness: 0.35,
    roughness: 0.1,
    });

public lighOntMaterial 
= new MeshStandardMaterial({
    color: '#F4DA93',
    metalness: 0.35,
    roughness: 0.1,
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


    
    // public set playing(value: boolean) {
    //     this._playing = value;
    //     if(value){

    //         if(!this._muted){

    //        // this.setKeyColour(this.State.View.Colours.playingColour);

    //         }
    //         else{

    //            // this.setKeyColour(this.State.View.Colours.seedColours[0]);

    //         }

    //     }
    //     else{

    //         if(!this._muted){

    //            // this.setKeyColour(this.State.View.Colours.highlightColour);

    //         }
    //         else{

    //           //  this.setKeyColour(this.State.View.Colours.inactiveColour);

    //         }
    //     }
    // }

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

    private _defaultScale = 0.8;
    private _touchedScale = 1.8;
    private _selectedScale = 2.0;

    private _isOnScale = 1.6;
    private _isOffScale = 0.8;

    private _note: AjhNamedNote;
    private _id: number
    private _keyMeshInstance: Mesh

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

    private _modelInstance: AjhModel = AjhModel.Instance ;



    // private _touched: boolean = false;
    // private _playing: boolean = false;
    // private _selected: boolean = false;
    // private _isOn: boolean = true;

    private _colours: AjhKeyColours;
  

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
   
    // public set selected(value: boolean) {
    //     this._selected = value;
    // }

////////////////////////////////////////////////////////////////

}


