import { Mesh, MeshStandardMaterial, Object3D, Raycaster, Vector2, WebGLRenderer } from "three";
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import "../../assets/css/AjhFonts.css";
import AjhModel from "../datamodels/AjhModel";
import AjhFullScreenObject from "../helpers/AjhFullScreenObject";

import * as Tone from "tone";
import AjhGUIControls from "../gui/AjhGUIControls";
import * as animations from '../helpers/AjhAnimations';
import AjhInstruments from "../sonics/AjhInstruments";

export default class AjhInitialScreen {

    private modelInstance:AjhModel = AjhModel.Instance;

    private enterButtonGeometry : RoundedBoxGeometry
    = 
    this.modelInstance.geometries.roundedCubeGeometry;

    private enterButtonMaterial : MeshStandardMaterial
    = this.modelInstance.materials.enterButtonMaterial;

    private _enterButton: Mesh;
    public get enterButton(): Mesh {
        return this._enterButton;
    }
    public set enterButton(value: Mesh) {
        this._enterButton = value;
    }

    private _titleField: HTMLDivElement;
    public get titleField() : HTMLDivElement{
        return this._titleField;
    }
    public set titleField(value: HTMLDivElement) {
        this._titleField = value;
    }

    private _InformationWindowInstance: HTMLDivElement;
    public get InformationWindowInstance(): HTMLDivElement {
        return this._InformationWindowInstance;
    }
    public set InformationWindowInstance(value: HTMLDivElement) {
        this._InformationWindowInstance = value;
    }

    private _fullscreenobject: AjhFullScreenObject;
    public get fullscreenobject(): AjhFullScreenObject {
        return this._fullscreenobject;
    }
    public set fullscreenobject(value: AjhFullScreenObject) {
        this._fullscreenobject = value;
    }

    private _dataField: HTMLDivElement;
    public get dataField() : HTMLDivElement{
        return this._dataField;
    }
    public set dataField(value: HTMLDivElement) {
        this._dataField = value;
    }

    private _messageField: HTMLDivElement;
    public get messageField() : HTMLDivElement{
        return this._messageField;
    }
    public set messageField(value: HTMLDivElement) {
        this._messageField = value;
    }

    private _width: number = 200;
    public get width(): number {
        return this._width;
    }
    public set width(value: number) {
        this._width = value;
    }
    
    private _height: number = 100;
    public get height(): number {
        return this._height;
    }
    public set height(value: number) {
        this._height = value;
    }

    private _body: Object3D = new Object3D();
    public get body(): Object3D {
        return this._body;
    }
    public set body(value: Object3D) {
        this._body = value;
    }

    selectableItems:Array<Mesh> = new Array<Mesh>();

    enterButtonIsTouched:boolean = false;
    private _enterButtonClicked: boolean = false;
    public get enterButtonClicked(): boolean {
        return this._enterButtonClicked;
    }
    public set enterButtonClicked(value: boolean) {
        this._enterButtonClicked = value;
         
      this.beginTheSound();
    }

    private pointermovelistener : any;
    private pointerdownlistener : any;
    private pointeruplistener : any;
    
    raycaster = new Raycaster();
    pointer = new Vector2();
    INTERSECTED;

    constructor (){

        this.pointermovelistener = this.onPointerMove.bind(this) ;
        this.pointerdownlistener = this.enterButtonOnPointerDownListener.bind(this);
        this.pointeruplistener =  this.enterButtonOnPointerUpListener.bind(this)

        this.raycaster.layers.set(2);

        this.modelInstance.infoScreen = this;

        this.modelInstance.gui.hide();

        this.createInformationWindow();

        this.updateAllFields();

        this.showInformationWindow();

        this.createEnterButton(this.body);

        this.createfullScreenBackground(this.body);

        this.modelInstance.scene.add( this.body );

        this.addListeners();

    }

    beginTheSound(){

        this.removeListeners();
        this.disposeOfEnterButton();
        this.modelInstance.pointLights[0].position.y = 2.5
        this.startAudio();
    }

    createfullScreenBackground(whereToAdd){

        this.fullscreenobject 
        = 
        new AjhFullScreenObject(
        this.modelInstance.canvas.clientWidth/1, 
        this.modelInstance.canvas.clientHeight/1, 
        );

        this.fullscreenobject.body.position.y = 4.8;
        this.fullscreenobject.resizeToScreenSize();
        whereToAdd.add( this.fullscreenobject.body );
        
    }

    createInformationWindow(){

        document.body.style.margin = "0px";
        document.body.style.boxSizing = "border-box";

        // ===================================================== //
               
        this._InformationWindowInstance 
        = document.createElement('div');
        this._InformationWindowInstance;//.disable();

        this._InformationWindowInstance.style.padding = "0px";
        this._InformationWindowInstance.style.height = "max-content";//"100" + "px";
        this._InformationWindowInstance.style.width = "max-content";
        
        // ===================================================== //
        
        this._titleField 
        = document.createElement('div');
        
       // this._titleField.style.maxHeight = "10" + "px";//..disable();
        this._titleField.style.height = "max-content";//"100" + "px";
        this._titleField.style.width = "max-content";
        this._titleField.style.lineHeight = "13" + "px";
        this._InformationWindowInstance
        .appendChild(this._titleField);

        this._titleField.style.color = "#ff9800";
        this._titleField.style.padding = "0px";
        this._titleField.style.top = "10px";

        // ===================================================== //
        
        this._messageField 
        = document.createElement('div');

        this._messageField.style.height = "max-content";//"100" + "px";
        this._messageField.style.width = "max-content";
       // this._messageField.style.maxHeight = "10" + "px";//..disable();
       //this._messageField.style.top = "15px"; 
       this._messageField.style.lineHeight = "13" + "px";
        this._InformationWindowInstance
        .appendChild(this._messageField);
        this._messageField.style.color = "#77D8FF";

        // ===================================================== //

        this._dataField 
        = document.createElement('div');
        this._dataField.style.height = "max-content";//"100" + "px";
        this._dataField.style.width = "max-content";
        this._dataField;//..disable();
        //this._dataField.style.maxHeight = "10" + "px";//..disable();
        this._dataField.style.lineHeight = "13" + "px";
        this._dataField.style.top = "5px"; 
        this._InformationWindowInstance
        .appendChild(this._dataField);
        this._dataField.style.color = "#91c91a";

        // ===================================================== //
        
        this._InformationWindowInstance.style.fontFamily 
        = "Consolas";
        //Arial";
        //"Lucida Console";
        //"Minecraftia"

        this._InformationWindowInstance.style.fontSize = "12px";
        
        this._InformationWindowInstance.style.color = "#ff9800";

        this._InformationWindowInstance.style.padding = "1.5em";


        this._InformationWindowInstance.style.maxWidth 
        = 
        //this._width
        250
        + "px";

        this._InformationWindowInstance.style.maxHeight 
        = this._height+"px";

        this._InformationWindowInstance
        .style.backgroundColor
        = 
        "rgba( 44, 44, 44, 0.70 )";

        this._InformationWindowInstance.style.position = "absolute";

        this._InformationWindowInstance.style.opacity = "1.0";

    }

    setInformationWindowPosition(){

        this._InformationWindowInstance.style.left 
        = "0px";

        this._InformationWindowInstance.style.top 
        =  
        ( window.innerHeight - this._height*0.75 )
        + "px";

    }

    showInformationWindow(): void {

        console.log(
            "InformationWindow show():"
        );

        this.setInformationWindowPosition();

        if (!this._InformationWindowInstance.parentNode){

            document.body.appendChild(

                this._InformationWindowInstance

            );
        
        }

    }

    hideInformationWindow(): void {

        console.log("InformationWindow hide()");

        if (this._InformationWindowInstance.parentNode){

            document.body.removeChild(
                this._InformationWindowInstance
            );
        
        }

    }

    updateAllFields(

        title:string = "THE INSTRUMENT",
        message:string = "touch the spinning cube to begin",
        data:string = "doubleclick for fullscreen",
        
    ){

        this._titleField.innerText = title;
        this._messageField.innerText = message;
        this._dataField.innerText = data;

    }

    // =========================================================== //

    public setDataFieldText(text:string){
            this._dataField.innerText = text;
    }

   createEnterButton(whereToAdd){

        const enterButtonGeometry 
        = 
        this.modelInstance.geometries.roundedCubeGeometry;
       // this.modelInstance.geometries.sphereGeometry;
    
        const enterButtonMaterial 
        = this.modelInstance.materials.enterButtonMaterial;

        this.enterButton 
        = 
        new Mesh(
            enterButtonGeometry, 
            enterButtonMaterial 
            // this.modelInstance.materials.glowMaterial
        );

        let scale = 0.5;
        this.enterButton.scale.set(
            scale,
            scale,
            scale
        );
      
        this.enterButton.position.y = 5;
     
        whereToAdd.add( this.enterButton );

      // this.enterButton.

        this.selectableItems.push(this.enterButton);

      

    }

    rotateButton(){

        animations.rotate( 
            this.enterButton, 
            this.modelInstance.clock, 
            Math.PI / 3
        );

    }

    addListeners(){
        
        this.modelInstance.canvas.addEventListener( 
            'pointermove', 
            this.pointermovelistener
        );
       
        // window.requestAnimationFrame(this.render);

       
       this.modelInstance.canvas.addEventListener( 
            "pointerdown",
            this.pointerdownlistener
        )

        
         this.modelInstance.canvas.addEventListener( 
            "pointerup",
            this.pointeruplistener
        )
        
    }

    removeListeners(){
       
        console.log("REMOVE ENTER LISTENERS");

        this.modelInstance.canvas.removeEventListener( 
            'pointermove', 
            this.pointermovelistener
        );
       
        // window.requestAnimationFrame(this.render);

        this.modelInstance.canvas.removeEventListener( 
            "pointerdown",
            this.pointerdownlistener
        )

        this.modelInstance.canvas.removeEventListener( 
            "pointerup",
            this.pointeruplistener
        )
        
    };

    enterButtonOnPointerDownListener(event:PointerEvent){

        console.log("BUTTON OUTSIDECLICKED!!!!")
        //if(this.enterButtonIsTouched){

                this.enterButtonIsTouched = true;

       // }

    }

    enterButtonOnPointerUpListener(event:PointerEvent){

        console.log("BUTTON OUTSIDECLICKED!!!!");
        //if(this.enterButtonIsTouched){

                console.log("BUTTON UP!!!!");
                
                this.enterButtonIsTouched = false;
                
                this.enterButtonClicked = true;
               
                this._fullscreenobject.body.removeFromParent();
               
                this.enterButton.removeFromParent();
               
                this.modelInstance.ajhGuiControls = new AjhGUIControls();
            
    }

    async startAudio() {

        await Tone.start()
        .then(() => {
            
            //Transport.start();
            
            console.log("starting Tone");
            
            this.modelInstance.instruments = new AjhInstruments();
            
            this.modelInstance.ajhGuiControls.populateGUI();
            
            this.modelInstance.instruments.playAChord(2);//.playAChord();
           
            this.modelInstance.gui.show();

        });

    }



    onPointerMove( event ) {

        // calculate pointer position in normalized device coordinates
        // (-1 to +1) for both components

        this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        console.log("BUTTON PARENT : " + this.enterButton.parent);

        if(! this.enterButtonClicked){

                if( this.enterButton.parent == null){

                    this.body.add( this.enterButton );

                    this.enterButton.layers.enable( 1 );

                } else 
                {

                    this.enterButton.layers.enable( 1 );

                }

            } else {this.enterButton.layers.disable( 1 );}

    }

    disposeOfEnterButton(){

        (this.enterButton as Mesh).geometry.dispose();

        ((this.enterButton as Mesh).material as MeshStandardMaterial).dispose();
        
       (this.modelInstance.renderer as WebGLRenderer)
       .renderLists.dispose();

    }

    // =========================================================== //

    zapBackground(){


      
       
   

        //     if ( this.animation.enabled && this.animation.play) {
    
        //         animations.rotate( this.cube, this.clock, Math.PI / 3);
        //         animations.bounce( this.cube, this.clock, 1, 0.5, 0.5);
        //          animations.minimize(
        //             this.fullscreenobject.body.scale,
        //             this.fullscreenobject.body, 
        //             this.clock, 1, 0.5, 0.5
        //         );
        //     }
    
        }

raycastingEnterButton() {

	// update the picking ray with the camera and pointer position
	this.raycaster.setFromCamera( this.pointer, this.modelInstance.camera );

	// calculate objects intersecting the picking ray
	// let intersects = this.raycaster.intersectObjects( this.selectableItems );
    // this.enterButtonIsTouched = false;
    // console.log("LOOKING FOR BUTTON!!!")
	// for ( let i = 0; i < intersects.length; i ++ ) {

    //     this.enterButtonIsTouched = true;
    //      console.log("FOUND BUTTON!!!");
    //      if(this.enterButtonIsTouched){
	// 	((intersects[ i ].object as Mesh).material as MeshStandardMaterial)
    //     .color.set( 0xff0000 );
    // }
    // else{
    //     ((intersects[ i ].object as Mesh).material as MeshStandardMaterial)
    //     .color.set( 0x0000ff );

    // }
	// }

    // =============================================================================== //

    let intersects 
    = this.raycaster
    .intersectObjects( 
        this.selectableItems, // scene.children, 
        false 
    );//
    
    //nothing selected yet but the function is cycling...::
 
    if ( this.INTERSECTED == null ) {

        //not touched
       // (this.enterButton.material as MeshStandardMaterial).color.setHex( 0x00FF00 );

       // (this.enterButton.material as MeshStandardMaterial).emissive.setHex( 0xFF0000 );

      //this.INTERSECTED.currentHex
        console.log("INTERSECTED????");
    }

    if ( intersects.length > 0 ) {


        if ( this.INTERSECTED != intersects[ 0 ].object ) {

            if ( this.INTERSECTED ) {

                //not touched

             
              //this.INTERSECTED.currentHex
                console.log("INTERSECTED????");
            }

          
           

            if(this.INTERSECTED != intersects[ 0 ].object){
                          // what is the state here??
              // --->> that there has been a new intersect or that no intersect is now the state
            }

            // setting the state to the current object found by the raycaster : 
            this.INTERSECTED = intersects[ 0 ].object;

          //  this.INTERSECTED.material.emissive.setHex( 0xFFFFFF);

          for ( let i = 0; i < intersects.length; i ++ ) {

              //  this.enterButtonIsTouched = true;
                 console.log("FOUND BUTTON!!!");
            if(this.enterButtonIsTouched){
            	((intersects[ i ].object as Mesh).material as MeshStandardMaterial)
                .color.set( 0xff0000 );
            }
            else{
                ((intersects[ i ].object as Mesh).material as MeshStandardMaterial)
                .color.set( 0x0000ff );
              //  (this.enterButton.material as MeshStandardMaterial).emissive.setHex( 0x00FF00 );
        
            }

        }

    } else {

        if ( this.INTERSECTED ) {

            // 
            console.log("STILL TOUCHING SOMETHING");
            
           // this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
            
        }

       
        //empty the intersections buffer
        this.INTERSECTED = null;

        

    }
}






    // =============================================================================== //

	//renderer.render( scene, camera );

}


}