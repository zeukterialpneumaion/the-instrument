
import { Color, Mesh, MeshPhongMaterial, MeshStandardMaterial, Object3D, WebGLRenderer } from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry";
import { Filter } from "tone";
import AjhKeyColours from "../colours/AjhKeyColours";
import AjhModel from "../datamodels/AjhModel";
import AjhNamedNote from "../sonics/AjhNamedNote";
import AjhKeys from "./AjhKeys";

export default class AjhKey {

//////////////////////////////////////////////////////////////////////
    private _noteName: string;
    public get noteName(): string {
        return this._noteName;
    }
    public set noteName(value: string) {
        this._noteName = value;
    }

    private _octave: number;
    public get octave(): number {
        return this._octave;
    }
    public set octave(value: number) {
        this._octave = value;
    }
//////////////////////////////////////////////////////////////////////
    private _keyboardInstance: AjhKeys;
    public get keyboardInstance(): AjhKeys {
        return this._keyboardInstance;
    }
    public set keyboardInstance(value: AjhKeys) {
        this._keyboardInstance = value;
    }
//////////////////////////////////////////////////////////////////////

    constructor(

        id: number,
        rowId:number,
        colId:number,
        keyWidth:number,
        keyHeight:number, 
        keyLength:number,
        isBlackKey:boolean,
        noteName:string,
        octave:number,
        keyboardInstance: AjhKeys
        
    ) {

        this._id = id;
        this._rowId = rowId;
        this._colId = colId;

        this.noteName = noteName;
        this._octave = octave;
        
        this._colours = new AjhKeyColours();

        this._keyboardInstance = keyboardInstance;

        this.keyWidth = keyWidth;
        this.keyHeight = keyHeight;
        this.keyLength = keyLength;

        this.isBlackKey =  isBlackKey;

        // generate random note :

        let noteRefId = 
            Math.round(
                Math.random()
                *
                (this.modelInstance.scales.noteNamesWithOctaveRegister.length-1)
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

        //this._frequency = frequency
        //this._voice = voice
        //this._frequency = frequency
        //this._voice = voice
        
        this.addListeners();

      }

//////////////////////////////////////////////////////////////////////
   
 public createKeyBody() {
      //  throw new Error("Method not implemented.");
        
       

      //  (this.modelInstance.geometries.cubeGeometry as BoxGeometry).needsUpdate = true;
        
        if( this.isBlackKey ){    
            
            this.body
            = 
            new Mesh(
                this.modelInstance.geometries.keyGeometry, 
                this.darkMaterial
            );

            if(this.modelInstance.useSpectrumColours){
            
                // (this.body as Mesh).material
                // = this.lightMaterial;

                ((this.body as Mesh).material as MeshStandardMaterial).color 
                =
                this.modelInstance.colours.spectrumArray[this.colId%12];
    
            }
        
        } else{
            
            this.body 
            = 
            new Mesh(
                this.modelInstance.geometries.keyGeometry, 
                this.lightMaterial
            );

            if(this.modelInstance.useSpectrumColours){
                
                ((this.body as Mesh).material as MeshStandardMaterial).color 
                =
                this.modelInstance.colours.spectrumArray[this.colId%12];

            }

        }

        this.body.castShadow = true;
        ((this.body as Mesh).material as MeshStandardMaterial).needsUpdate = true;
        this.body.position.y = 0.5;
        //((this.body as Mesh).material as MeshPhongMaterial).needsUpdate = true;

        
    }

    disposeOfKeyBody(){
        (this.body as Mesh).geometry.dispose();
        ((this.body as Mesh).material as MeshStandardMaterial).dispose();
        
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

        this._keyLength 
        =  
        (newScreenHeight / this._keyboardInstance.numberOfRows);
        
        // (( this.body as Mesh ).geometry as BoxGeometry )
        
        // ( this.body as Mesh ).scale.set( 
            
        //     this.keyWidth, 
        //     this.keyHeight, 
        //     this.keyLength
            
        // );

        ( this.body as Mesh ).geometry.dispose();
        
        ( this.body as Mesh ).geometry = 
        new RoundedBoxGeometry(
            this.keyWidth, 
            this.keyHeight, 
            this.keyLength,
            7,
            0.05
        );


    }

    changeKeyWidthToFitScreenWidth(newScreenWidth){
        
        this.keyWidth = 
        (newScreenWidth
        / 
        this._keyboardInstance.numberOfColumns);

        // ( this.body as Mesh ).scale.set( 
            
        //     this.keyWidth, 
        //     this.keyHeight, 
        //     this.keyLength
            
        // )

        ( this.body as Mesh ).geometry.dispose();
        
        ( this.body as Mesh ).geometry = 
        new RoundedBoxGeometry(
            this.keyWidth, 
            this.keyHeight, 
            this.keyLength,
            7,
            0.05
        );

    }

//////////////////////////////////////////////////////////////////////

    private addListeners(){
        
        // this._modelInstance.keyEventEmitter
        // .on("off",this.offListener.bind(this));

        this._modelInstance.musicalKeyEventEmitter
        .on("on_off",this.onListener.bind(this));

        // this._modelInstance.keyEventEmitter
        // .on(
        //     "repaint",
        //     this.repaintListener.bind(this)
        // );
        
        this._modelInstance.musicalKeyEventEmitter
        .on(
            "touched",
            this.touchedListener.bind(this)
        );
    
        this._modelInstance.musicalKeyEventEmitter
        .on(
            "no longer touched",
            this.noLongerTouchedListener.bind(this)
        );
        
        this._modelInstance.musicalKeyEventEmitter
        .on(
            "selected",
            this.selectedListener.bind(this)
        );
        this._modelInstance.musicalKeyEventEmitter
        .on(
            "onPointerDown",
            this.onPointerDownListener.bind(this)
            );

            this._modelInstance.musicalKeyEventEmitter
            .on(
                "onPointerUp",
                this.onPointerUpListener.bind(this)
                );
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
            (this._body as Mesh)
            .material as MeshPhongMaterial
        )
        .color 
        = 
        colour;

        //.emissive = colour;
        
    }

//////////////////////////////////////////////////////////////////////
    
    public highlightKey(toggle:boolean){

        const mesh = this.body as Mesh
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
                this._id,
                0,
                0,
                0
            )

            

        }

    }

//////////////////////////////////////////////////////////////////////
    
    private repaintListener(receivedId){

        if(this._id == receivedId){

            if(this.modelInstance.showMusicalKeyMessages){

                console.log(

                   "Key " + this._id + " received a REPAINT message.."
                
                );
            }
                    
        }

    }

//////////////////////////////////////////////////////////////////////

private onPointerDownListener(name: string, id:number, uuid: string){


    console.log( this.modelInstance.instruments.currentInstrument+ "I am  key number " 
    + this._id
    + ", with a pitch of "
    + this.noteName
    + " and i heard that my identifier: " + this.body.uuid + "was compared to:" 
    + uuid +
    " hmmm.." )

    if(this.modelInstance.instruments){

        if(
            ( (this.body as Mesh).uuid == uuid )
           // ( isTrue )
        ){

        this.modelInstance.instruments
        .playANote(this.noteName + this.octave.toString());

        }
    
    }


}


private onPointerUpListener(name: string, id:number, uuid: string){


    console.log( "I am  key number " 
    + this._id
    + ", with a pitch of "
    + this.noteName
    + " and i heard that my identifier: " + this.body.uuid + "was compared to:" 
    + uuid +
    " and i am trigging a NOTE RELEASE" )

    if(this.modelInstance.instruments){

        if(
            ( (this.body as Mesh).uuid == uuid )
           // ( isTrue )
        ){

        this.modelInstance.instruments
        .stopToPlayANote(this.noteName + this.octave.toString());

        }
    
    }


}
  
    private touchedListener(
        touched: boolean, name: string, id:number, uuid: string
    ){

           
            if(
                ( (this.body as Mesh).uuid == uuid )
               // ( isTrue )
            ){

            if(this.modelInstance.showMusicalKeyMessages){
                
                console.log(
                    this.body.id+":"
                    +
                    id
                    +
                    " :: musical note message::"

                    + (this.body as Mesh).uuid
                );

            }


            if(touched){

            this._touched = true;
          
                 if(this.modelInstance.instruments){

                   console.log( this.id + " PLAYING A NOTE" );

                    this.modelInstance.instruments
                    .playANote(this.noteName + this.octave.toString());
                
                }
                
                // this.modelInstance.isTouchingSomething = true;
                
            }
            else{

                this._touched = false;

                if(this.modelInstance.instruments){

                    this.modelInstance.instruments.stopANote(this.noteName);
                
                }

                //  this.modelInstance.isTouchingSomething = true;

            }

            this.checkIfOnAndRepaint();

          
           // this.setKeyInstanceScale(this._touchedScale);
            
            if(!this._muted){
               // this.setKeyColour(this.colours.baseColour)
            }
            
        } else {
            
        }

    }

//////////////////////////////////////////////////////////////////////
    
    private noLongerTouchedListener( 
        touched: boolean, 
        id : number
     ){

        if(
            ( this._id == id )
           
            // &&
            // ( this._inheritance.pearlId == pearlId )
        ){

            if(this.modelInstance.showMusicalKeyMessages){

                console.log(

                    "I am  key number " 
                    + this._id
                    + ", at position "
                    + this._colId
                    + " and i heard that it is "
                    + touched +
                    " that i am no longer touched!"
                
                );

            }

            this.checkIfOnAndRepaint();
            
            this.modelInstance.isTouchingSomething = false;
            
        } 

        else{

            if( this._touched == true ){

                this.touched = false;
                this.selected = false; 
                
                this.checkIfOnAndRepaint();

            }
        }


    }

//////////////////////////////////////////////////////////////////////

    private onTickListener(positionId,noteName){

        if(
           
            (this._positionInKeyboardArray == positionId)
        ){
            if(this.modelInstance.showMusicalKeyMessages){

                console.log(

                    "Bija " 
                    + positionId 
                    + " heard that it was Passed over on Cycle "
                    + ". Note: "
                    + noteName

                )

            } 
            
          

            if(this._playing && !this.muted){

                console.log(

                    "Bija " 
                    + positionId 

                );
            }

        }

    }


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

//////////////////////////////////////////////////////////////////////

    public selectedListener( 
        selected: boolean, 
        keyMeshInstance: number
     ){

        if(
            (this._touched)
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
            
            this._selected = true;

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

//////////////////////////////////////////////////////////////////////

    private checkIfOnAndRepaint(){

        if( this._isOn == false ){

            if(this.modelInstance.showMusicalKeyMessages){

                console.log(

                    "Key : "
                    + this._id
                    + ": It is " 
                    + this._isOn
                    + " that I am On , ie. I am Off."

                )

            }

            
            
            if(this.isBlackKey){

                this.darkMaterial.needsUpdate = true;
               // (this.body as Mesh).material = this.darkMaterial;
           
            }
            else {


                this.lightMaterial.needsUpdate = true;
               // (this.body as Mesh).material = this.lightMaterial;

            }

           // this.setKeyInstanceScale( this._isOffScale );
            
            if(!this._muted){

               // this.setKeyColour(this.colours.offColour);

            }

        }
        
        if( this._isOn == true ){

            if(this.modelInstance.showMusicalKeyMessages){
         
                console.log(

                    "I am On : " 
                    + this._isOn

                )

            }

            if(this.touched){

                console.log(

                    "I was touched : " 
                    + this.touched

                )

                this.highlightKey(true);

                if(this.isBlackKey){

                    //this.darkOnMaterial.needsUpdate = true;
                   // (this.body as Mesh).material = this.darkOnMaterial;
               
                }
                else {
                    
                    //this.lighOntMaterial.needsUpdate = true;
                  //  (this.body as Mesh).material = this.lighOntMaterial;
    
                }
            
            }
            else{

                console.log(

                    "I was touched : " 
                    + this.touched

                )

               this.highlightKey(false);

                if(this.isBlackKey){

                  //  (this.body as Mesh).material = this.darkMaterial;
                    //this.darkMaterial.needsUpdate = true;

                }
                else {
    
                    //this.lightMaterial.needsUpdate = true;
                    //(this.body as Mesh).material = this.lightMaterial;
    
                }

            }
            
            if(this.isBlackKey){

               // this.darkOnMaterial.needsUpdate = true;
               // (this.body as Mesh).material = this.darkOnMaterial;
           
            }
            else {

               // this.lighOntMaterial.needsUpdate = true;
               // (this.body as Mesh).material = this.lighOntMaterial;

            }

            // this.setKeyInstanceScale( this._isOnScale );

            if(!this._muted){

                //this.setKeyColour(this.colours.onColour);

            }

        }

    }

/////////////////////////////////////////////////////////////////

public repaintBody(){

       console.log("REPAINTING MY BODY : "+ this.id)
    if( this.isBlackKey ){    
            
        // this.body
        // = 
        // new Mesh(
        //     this.modelInstance.geometries.keyGeometry, 
        //     this.darkMaterial
        // );

        if(this.modelInstance.useSpectrumColours){
        
            // (this.body as Mesh).material
            // = this.lightMaterial;
         //   let material =  ((this.body as Mesh).material as MeshStandardMaterial).clone();
          // let colour =  ((this.body as Mesh).material as MeshStandardMaterial).color.clone(); 
          // material.color =
           // this.modelInstance.colours.spectrumArray[this.colId%12];

           ((this.body as Mesh).material as MeshStandardMaterial).color 
           = 
           this.modelInstance.colours.spectrumArray[this.colId%12];

        }
        else{

            ((this.body as Mesh).material as MeshStandardMaterial).color 
            = 
            new Color('#462C07');

        }
    
    } else{
        
        // this.body 
        // = 
        // new Mesh(
        //     this.modelInstance.geometries.keyGeometry, 
        //     this.lightMaterial
        // );

        if(this.modelInstance.useSpectrumColours){
            
            ((this.body as Mesh).material as MeshStandardMaterial).color 
            =
            this.modelInstance.colours.spectrumArray[this.colId%12];

        }
        else{

            ((this.body as Mesh).material as MeshStandardMaterial).color 
            = 
            new Color('#f69f1f');

        }

    }
}
    

////////////////////////////////////////////////////////////////

public darkMaterial 
= new MeshStandardMaterial({
    color: '#462C07',
    metalness: 0.5,
    roughness: 0.7,
    // emissive:
    });

public lightMaterial 
= new MeshStandardMaterial({
    color: '#f69f1f',
    metalness: 0.5,
    roughness: 0.7,
    });

    public darkOnMaterial 
= new MeshStandardMaterial({
    color: '#E6D4BA',
    metalness: 0.5,
    roughness: 0.7,
    });

public lighOntMaterial 
= new MeshStandardMaterial({
    color: '#F4E193',
    metalness: 0.5,
    roughness: 0.7,
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

    public get isOnScale() {
        return this._isOnScale;
    }

    public get colours(): AjhKeyColours {
        return this._colours;
    }
   
     public get playing(): Boolean {
        return this._playing;
    }
   
    public get touched(): Boolean {
        return this._touched;
    }
    
    public get isOn(): Boolean {
        return this._isOn;
    }
    
    public get selected(): Boolean {
        return this._selected;
    }
    
    public get isOffScale() {
        return this._isOffScale;
    }

    public get note(): AjhNamedNote {
        return this._note;
    }
    
//////////////////////////////////////////////////////////////////////

    public set note(value: AjhNamedNote) {
        this._note = value;
    }

    public set isOffScale(value) {
        this._isOffScale = value;
    }
    
    public set playing(value: Boolean) {
        this._playing = value;
        if(value){

            if(!this._muted){

           // this.setKeyColour(this._colours.playingColour);

            }
            else{

               // this.setKeyColour(this._colours.seedColours[0]);

            }

        }
        else{

            if(!this._muted){

               // this.setKeyColour(this._colours.highlightColour);

            }
            else{

              //  this.setKeyColour(this._colours.inactiveColour);

            }
        }
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


    public set isOn(value: Boolean) {

        this._isOn = value;

        if(this._isOn){


            if(this.modelInstance.showMusicalKeyMessages){

                console.log(

                    "I am  key number " 
                    + this._id
                    + ", and it is now "
                    + this._isOn 
                    + " that I am on,"
                    + "so I switched myself on"

                );
    
            }

           // this.setKeyInstanceScale(this._isOnScale);
            
            if(!this._muted){
              //  this.setKeyColour(this.colours.onColour);
            }

        }
         
        if(!this._isOn){

            if(this.modelInstance.showMusicalKeyMessages){

                console.log(

                    "I am  key number " 
                    + this._id
                    + " of Euclidean Ring "
                    
                    + " and it is now "
                    + this._isOn 
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
        this.setKeyColour(this._colours.inactiveColour)
    }

    private _modelInstance: AjhModel = AjhModel.Instance ;

    private _touched: Boolean = false;
    private _playing: Boolean = false;
    private _selected: Boolean = false;
    private _isOn: Boolean = true;

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
    
    public set isOnScale(value) {
        this._isOnScale = value;
    }

    public set colours(value: AjhKeyColours) {
        this._colours = value;
    }

    public set touched(value: Boolean) {
        this._touched = value;
    }
   
    public set selected(value: Boolean) {
        this._selected = value;
    }

////////////////////////////////////////////////////////////////

}


