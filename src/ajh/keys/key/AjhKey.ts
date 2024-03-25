
import { Color, MathUtils, Mesh, MeshMatcapMaterial, Vector2, Vector3, WebGLRenderer } from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry";
import { Filter } from "tone";
import AjhEventMemoryCache from "../../AjhMultiTouch/AjhEventMemoryCache";
import AjhModel from "../../datamodels/AjhModel";
import { deepDispose } from "../../helpers/scene/ajhThreeDisposal";
import AjhNamedNote from "../../sonics/AjhNamedNote";
import AjhKeys from "../keyboards/AjhKeyBoard";
import AjhIntersectionInstances from "./AjhIntersectionInstances";
import AjhKeyColours from "./AjhKeyColours";
import AjhKeyDataModel from "./AjhKeyDataModel";

export default class AjhKey {

    // =================================================== //
        /**  
        * Create A Key Instance Mesh and Responds To Events  
        *   noteName:string,
        *   octave:number,
        *   keyboardInstance: AjhKeys,
        *   positionInKeyboard: number
        * @param {AjhKeyDataModel} State  
        * @param {AjhEventMemoryCache} EventMemoryCache 
        * ^ store of perceived events  
        * @param {String} noteName i.e. F# 
        * @return {void} returns void  
        */ 
    // =================================================== //


 
    // =================================================== //
    /** 
     * :: KeyState :: 
     * :: Data Model :: 
     * */
    // =================================================== //
        
        private _State: AjhKeyDataModel 
        = new AjhKeyDataModel();
        public get KeyState(): AjhKeyDataModel {
            return this._State;
        }
        public set KeyState(value: AjhKeyDataModel) {
            this._State = value;
        }

       // private KeyHandlers:AjhKeyHandlerFunctions

        private _baseColor: Color;
        public get baseColor(): Color {
            return this._baseColor;
        }
        public set baseColor(value: Color) {
            this._baseColor = value;
        }

    // =================================================== //

 
    // =================================================== //
    /** 
     * checkIfIntersectsWith :: function 
     * */
    // =================================================== //  
  
        // EventMemoryCache : AjhEventMemoryCache 
        // = 
        // new AjhEventMemoryCache();

        name : string;

        // private _intersected: boolean;
        // public get intersected(): boolean {
        //     return this._intersected;
        // }
        // public set intersected(value: boolean) {

        //     this._intersected = value;
        //     this.changeIntersectedColour();
        // }



        private _intersectedInstances: AjhIntersectionInstances;
        public get intersectedInstances(): AjhIntersectionInstances {
            return this._intersectedInstances;
        }
        public set intersectedInstances(value: AjhIntersectionInstances ) {
            this._intersectedInstances = value;
        }

       // intersectPoint : Vector3;
       wasIntersectedByRayId : number;

        distance : number;

    // =================================================== //

 
    // =================================================== //
    /** 
     * checkIfIntersectsWith :: function 
     * */
    // =================================================== //   
    
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


        // this.KeyHandlers = new AjhKeyHandlerFunctions(this);

            this.name = rowId + "_" + colId;

           // this._intersected = false;
            //this.intersectPoint = new Vector3();
            this.intersectedInstances = new AjhIntersectionInstances();

            this.distance = 0;

            this.createKeyBody();

            this.changeKeySizeToFitScreenSize();
            
        // this.addListeners();

        }

    // =================================================== //

 
    // =================================================== //
    /** 
     * checkIfIntersectsWith :: function 
     * */
    // =================================================== //   
  
        public createKeyBody() {

            // this.darkMaterial.matcap 
            // =  
            // this.modelInstance.textureLoader
            // .load("./ajhporcelain.jpg");
            

            this.KeyState.View.Body
            = 
            new Mesh(
                this.modelInstance.geometries.keyGeometry, 
                this.darkMaterial
            );
            
            this.KeyState.View.Body.name 
            = 
            MathUtils.randInt(0, 0xffffff).toString();

            
            this.KeyState.View.Body.layers.enable( 3 );


            this.repaintBody();


            this.KeyState.View.Body.position.y = 0.5;

        }

    // =================================================== //
 
    // =================================================== //
    /** 
     * checkIfIntersectsWith :: function 
     * */
    // =================================================== //
  
        disposeOfKeyBody(){
        
            deepDispose(this.KeyState.View.Body);
            
        (this._modelInstance.renderer as WebGLRenderer)
        .renderLists.dispose();

        }

    // =================================================== //
 
    // =================================================== //
    /** 
     * changeKeySizeToFitScreenSize :: function 
     * */
    // =================================================== // 
   
        changeKeySizeToFitScreenSize(){
            
            let screenSize 
            = 
            this.modelInstance.getCameraViewSizeXY();

            this.changeKeyLengthToFitScreenHeight(screenSize.y);
            this.changeKeyWidthToFitScreenWidth(screenSize.x);
            
        }

    // =================================================== //

    /////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////
 
    // =================================================== //
    /** 
     * changeKeyLengthToFitScreenHeight :: function 
     * */
    // =================================================== //   

    /////////////////////////////////////////////////////////
 
    // =================================================== //
  
        changeKeyLengthToFitScreenHeight(newScreenHeight){

            this.KeyState.View.Length 
            =  
            (
                newScreenHeight 
                / 
                this.KeyState.KeyboardInstance.numberOfRows
            );
            
            this.disposeOfKeyBody();
           // deepDispose(( this.KeyState.View.Body as Mesh ));
            //( this.KeyState.View.Body as Mesh ).geometry.dispose();
            
            ( this.KeyState.View.Body as Mesh ).geometry 
            =
            
            // new BoxGeometry(
            //     this.KeyState.View.Width, 
            //     this.KeyState.View.Height, 
            //     this.KeyState.View.Length,
            //     // 7,
            //     // 0.05
            // );

            new RoundedBoxGeometry(
                this.KeyState.View.Width, 
                this.KeyState.View.Height, 
                this.KeyState.View.Length,
                7,
                0.05
            );


        }

 
    // =================================================== //

 
    // =================================================== //
    /** 
     * changeKeyWidthToFitScreenWidth :: function 
     * */
    // =================================================== //  
     
        changeKeyWidthToFitScreenWidth(newScreenWidth){

            let amountOfWidthToUseAsAGap = 0.002;
            let kwgap = this.KeyState.View.Width * amountOfWidthToUseAsAGap;

            let amountOfHeightToUseAsAGap = 0.02;
            let klgap = this.KeyState.View.Length * amountOfHeightToUseAsAGap ;
            
            this.KeyState.View.Width 
            = 
            (newScreenWidth
            / 
            this.KeyState.KeyboardInstance.numberOfColumns);

            // ( this.KeyState.View.Body as Mesh ).geometry.dispose();
            // deepDispose(( this.KeyState.View.Body as Mesh ));
            this.disposeOfKeyBody();

            let smallerDimension 
            = 
            Math.min(
                this.KeyState.View.Width-kwgap,
                this.KeyState.View.Length-klgap
            );

            ( this.KeyState.View.Body as Mesh ).geometry 
            = 

            // new CapsuleGeometry(
            //     ( this.KeyState.View.Width-kwgap )/2, 
            //     // this.KeyState.View.Height, 
            //     this.KeyState.View.Length-klgap - (( this.KeyState.View.Width-kwgap )),
            //     2,
            //     5
            //     // 7,
            //     // 0.05
            // );

           // ( this.KeyState.View.Body as Mesh ).rotateX(Math.PI /2 );

            // new BoxGeometry(
            //     this.KeyState.View.Width-kwgap, 
            //     this.KeyState.View.Height, 
            //     this.KeyState.View.Length-klgap,
            //     // 7,
            //     // 0.05
            // );
            

            // new SphereGeometry(
            //    smallerDimension/2, 
            //     // this.KeyState.View.Height, 
            //     // this.KeyState.View.Length-klgap,
            //     // 7,
            //     // 0.05
            // );

            // new CylinderGeometry(
            //     smallerDimension/8,
            //     smallerDimension/2,
            //     0.25,
            //     7,
            //      // this.KeyState.View.Height, 
            //      // this.KeyState.View.Length-klgap,
            //      // 7,
            //      // 0.05
            //  );

            //  new TetrahedronGeometry(
            //     smallerDimension/2,
            //     1,
            //      // this.KeyState.View.Height, 
            //      // this.KeyState.View.Length-klgap,
            //      // 7,
            //      // 0.05
            //  );


            // new OctahedronGeometry(
            //     smallerDimension/2,
            //     1,
            //      // this.KeyState.View.Height, 
            //      // this.KeyState.View.Length-klgap,
            //      // 7,
            //      // 0.05
            //  );

            new RoundedBoxGeometry(
                this.KeyState.View.Width-kwgap, 
                this.KeyState.View.Height, 
                this.KeyState.View.Length-klgap,
                7,
                0.05
            );

        }

  
    // =================================================== //
    
 
    // =================================================== //
    /** 
     * checkIfIntersectsWith :: function 
     * */
    // =================================================== //  
    
  
    // private addListeners(){
  
    //     this._modelInstance.musicalKeyEventEmitter
    //     .on(
    //         "touchedByRay",
    //         this.KeyHandlers
    //         .isRayTouchedListener.bind(this.KeyHandlers)
    //     );
   
    //     this._modelInstance.musicalKeyEventEmitter
    //     .on(
    //         "onPointerUp",
    //         this.KeyHandlers
    //         .onPointerUpListener.bind(this.KeyHandlers)
    //     );

    //     this._modelInstance.musicalKeyEventEmitter
    //     .on(
    //         "onPointerDown",
    //         this.KeyHandlers
    //         .onPointerDownListener.bind(this.KeyHandlers)
    //     );

    //     this._modelInstance.musicalKeyEventEmitter
    //     .on(
    //         "onPointerLeave",
    //         this.KeyHandlers
    //         .onPointerLeaveListener.bind(this.KeyHandlers)
    //     );

    // }

  
    // =================================================== //
    
 
    // =================================================== //
    /** 
     * setKeyInstanceScale :: function 
     * */
    // =================================================== // 
    
    
        public setKeyInstanceScale(size){

            // this._body.scale.x =
            // this._body.scale.y =
            // this._body.scale.z = size;

        }

 
    // =================================================== //
    
 
    // =================================================== //
    /** 
     * setKeyColour :: function 
     * */
    // =================================================== // 
    
   
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

  
    // =================================================== //
    
 
    // =================================================== //
    /** 
     * highlightKey :: function 
     * */
    // =================================================== //  
    
      
        public highlightKey(toggle:boolean){

            const mesh 
            = 
            this.KeyState.View.Body as Mesh;

            const material 
            = 
            mesh.material as MeshMatcapMaterial;

            if(toggle == true){

                if(this.modelInstance.showColourMessages){

                    console.log( 
                        "HIGHLIGHT : KEY : " 
                        + 
                        this.KeyState.Id 
                    )

                };

                material.color 
                = 
                this.KeyState.View.Colours.highlightColour;

                material.needsUpdate = true;
        
            } else{

                material.color 
                = 
                this.KeyState.View.Colours.baseColour;

                material.needsUpdate = true;    

            }

        }

    // =================================================== //

    // =================================================== //
    /** 
     * setItemIsIntersected :: function 
     * */
    // =================================================== //  
    
   
        // setItemIsIntersected(
        //     isIntersected:boolean
        // ) {

        //    // this.intersected = isIntersected;

        // }

    // =================================================== //
    
 
    // =================================================== //
    /** 
     * checkIfIntersectsWith :: function 
     * */
    // =================================================== //
  
        changeIntersectedColour() {

            if( this.intersectedInstances.instances.length == 0 ){
                
                    
                // ((this.KeyState.View.Body as Mesh).material as MeshMatcapMaterial).color 
                // = 
                // new Color( + this.name );

               // this.stopNote();
                
                (
                    (this.KeyState.View.Body as Mesh)
                        .material as MeshMatcapMaterial
                ).color 
                = 
                this.KeyState.View.Colours.baseColour;
                (this.KeyState.View.Body as Mesh).position.y = 0.5;

               

            }

            else {//|| this.intersected != undefined  ){

                ((this.KeyState.View.Body as Mesh).material as MeshMatcapMaterial).color 
                = 
                new Color( 
                    + MathUtils.randInt(
                        0, 
                        0xffffff
                        ).toString() 
                );

                (this.KeyState.View.Body as Mesh).position.y = 0.3;

            }
               // this.startNote();

            // } else {

            //     // ((this.KeyState.View.Body as Mesh).material as MeshMatcapMaterial).color 
            //     // = 
            //     // new Color( + this.name );
                
            //    // this.stopNote();

            //     ((this.KeyState.View.Body as Mesh).material as MeshMatcapMaterial).color 
            //     = 
            //     this.KeyState.View.Colours.baseColour;

            //     (this.KeyState.View.Body as Mesh).position.y = 0.5;

            // }

        }

// =================================================== //

    startNote(){

        if( this.modelInstance.instruments != undefined){
                    
            
            if(
                !this.KeyState.Sonics.IsPlaying
            ){
                // PLAY A NOTE ::
                this.modelInstance.instruments
                .startToPlayANote(

                    this.KeyState.Sonics.NoteName 
                    + 
                    this.KeyState.Sonics.Octave.toString()

                ); 
                
                this.KeyState.Sonics.IsPlaying = true; 
                
                console.log(
                    " KEY :: " 
                    + 
                    this.KeyState.Id 
                    + 
                    " STARTING NOTE ::"
                    +
                    this.KeyState.Sonics.NoteName 
                    + 
                    this.KeyState.Sonics.Octave.toString()
                );
                //this.KeyState.State.setIsPointerDown(true);

            }

        }

    }

// =================================================== //

    stopNote(){


        
        if( this.modelInstance.instruments != undefined){
                
            //if(this.KeyState.Sonics.IsPlaying){

                console.log(
                    " KEY :: " 
                    + 
                    this.KeyState.Id 
                    + 
                    " STOPPING NOTE ::"
                    +
                    this.KeyState.Sonics.NoteName 
                    + 
                    this.KeyState.Sonics.Octave.toString()
                );
            
                // STOP A NOTE ::
                this.modelInstance.instruments
                .stopToPlayANote(

                    this.KeyState.Sonics.NoteName 
                    + 
                    this.KeyState.Sonics.Octave.toString()

                );

                this.KeyState.Sonics.IsPlaying = false;

        // }

        }
    }

    checkForRayIdInIntersectedRayIds(id: number) : boolean {
        
        let foundItem = false;
        
        for (
            let index = 0; 
            index < this.intersectedInstances.instances.length; 
            index++
        ) {
            
            const element = this.intersectedInstances.instances[index];
            
            if( element.id == id){
            
                foundItem = true;
            
            }
            
        }

        if(foundItem){
        
            console.log(
                "Ray "
                + 
                id 
                +
                " FOUND IN KEY " 
                + 
                this.KeyState.Id 
                + 
                " INTERSECTIONS." 
            );

        }
        else {

            console.log(
                "NO Ray ID FOUND IN KEY " 
                + 
                this.KeyState.Id 
                + 
                " INTERSECTIONS."
            );

        }

        return foundItem;

    }

    
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
            (
                this.KeyState.View.Body.id 
                ==
                keyMeshInstance
            )
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


