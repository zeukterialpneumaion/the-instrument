import "../../assets/css/AjhFonts.css";
import AjhModel from "../datamodels/AjhModel";

export default class AjhInformationWindow {

    private modelInstance:AjhModel = AjhModel.Instance;

    private _titleField;
    public get titleField() {
        return this._titleField;
    }
    public set titleField(value) {
        this._titleField = value;
    }

    private _dataField;
    public get dataField() {
        return this._dataField;
    }
    public set dataField(value) {
        this._dataField = value;
    }

    private _infoField;
    public get infoField() {
        return this._infoField;
    }
    public set infoField(value) {
        this._infoField = value;
    }

    private _contentField;
    public get contentField() {
        return this._contentField;
    }
    public set contentField(value) {
        this._contentField = value;
    }

    private _statusField;
    public get statusField() {
        return this._statusField;
    }
    public set statusField(value) {
        this._statusField = value;
    }

    private _nameField;
    public get nameField() {
        return this._nameField;
    }
    public set nameField(value) {
        this._nameField = value;
    }

    private _messageField;
    public get messageField() {
        return this._messageField;
    }
    public set messageField(value) {
        this._messageField = value;
    }

    private _repetitionsField;
    public get repetitionsField() {
        return this._repetitionsField;
    }
    public set repetitionsField(value) {
        this._repetitionsField = value;
    }

    private _onField;
    public get onField() {
        return this._onField;
    }
    public set onField(value) {
        this._onField = value;
    }

    private _InformationWindowInstance: HTMLDivElement;
    public get InformationWindowInstance(): any {
        return this._InformationWindowInstance;
    }
    public set InformationWindowInstance(value: any) {
        this._InformationWindowInstance = value;
    }

    private _width: number = 250;
    public get width(): number {
        return this._width;
    }
    public set width(value: number) {
        this._width = value;
    }
    
    private _height: number = 170;
    public get height(): number {
        return this._height;
    }
    public set height(value: number) {
        this._height = value;
    }

    constructor() {

        document.body.style.margin = "0px";
        document.body.style.boxSizing = "border-box";
       
        this._InformationWindowInstance 
        = document.createElement('div');
        this._InformationWindowInstance.style.userSelect =  "none";//.disable();
        this._InformationWindowInstance.style.pointerEvents =  "none";
        

        this._titleField 
        = document.createElement('div');
        this._InformationWindowInstance
        .appendChild(this._titleField);
        this._titleField.style.color = "#ECA130";

        this._onField 
        = document.createElement('div');
        this._InformationWindowInstance
        .appendChild(this._onField);
        this._onField.style.color = "#F1DA55";

        this._messageField 
        = document.createElement('div');
        this._InformationWindowInstance
        .appendChild(this._messageField);
        this._messageField.style.color = "#58E281";

        this._contentField 
        = document.createElement('div');
        this._InformationWindowInstance
        .appendChild(this._contentField);
        this._contentField.style.color = "#62CDFF";

        this._dataField 
        = document.createElement('div');
        this._InformationWindowInstance
        .appendChild(this._dataField);
        this._dataField.style.color = "#58FF61";

        this._statusField 
        = document.createElement('div');
        this._InformationWindowInstance
        .appendChild(this._statusField);
        this._statusField.style.color = "#FFA396";
        
        this._nameField 
        = document.createElement('div');
        this._InformationWindowInstance
        .appendChild(this._nameField);
        this._nameField.style.color = "#FCBE38";

        this._infoField 
        = document.createElement('div');
        this._InformationWindowInstance
        .appendChild(this._infoField);
        this._infoField.style.color = "#61C8F1";



        this._repetitionsField 
        = document.createElement('div');
        this._InformationWindowInstance
        .appendChild(this._repetitionsField);
        this._repetitionsField.style.color = "#E08B8B";


        
        this._InformationWindowInstance.style.fontFamily 
        = "Consolas";
        //Arial";
        //"Lucida Console";
        //"Minecraftia"

        this._InformationWindowInstance.style.fontSize = "12px";
        
        this._InformationWindowInstance.style.color = "#ff9800";

        this._InformationWindowInstance.style.padding = "0.5em";


        this._InformationWindowInstance.style.maxWidth 
        = 
        //this._width
        200
        + "px";

        this._InformationWindowInstance.style.maxHeight 
        = 30 + this._height+"px";

        this._InformationWindowInstance
        .style.backgroundColor
        = 
        "rgba( 44, 44, 44, 0.70 )";

        this._InformationWindowInstance.style.position = "absolute";

        this._InformationWindowInstance.style.opacity = "1.0";

        this.updateAllFields();


        this.hide();
        // this.show();

      //  this.addListeners();

    }

    // addListeners(){

    //     this.modelInstance.noteEventEmitter
    //     .on(
    //         "touched",
    //         this.touchListener.bind(this)
    //     );
        
    //     // this.modelInstance.noteEventEmitter
    //     // .on(
    //     //     "no longer touched",
    //     //     this.noLongerTouchedListener.bind(this)
    //     // );

    // }

    // touchListener(){

    //         this.show();

    // }


    // noLongerTouchedListener(){

    //     this.hide();

    // }

    setPosition(){

        this._InformationWindowInstance.style.left 
        = "5px";

        this._InformationWindowInstance.style.top 
        = 0
       // ( window.innerHeight - this.height )
        + "px";

        this._InformationWindowInstance.style.maxWidth 
        =
        this._InformationWindowInstance.style.width
        =
        ((window.innerWidth/2)-46) + "px";

    }

    moveToMouseCoords(x,y){

        if( ( this.width + 40 ) < window.innerWidth ){

            this.width 
            = window.innerWidth-75;
            
            this._InformationWindowInstance.style.maxWidth 
            = this._width+"px";

        }

        // if x is less than the window width - tooltip  width
        console.log(
            window.innerWidth 
            + ":" 
            + this._width
        );
        
        if(
            x < ( window.innerWidth - ( 40 + this._width) ) 
        ){
        
            this._InformationWindowInstance.style.left 
            = (x + 15) + "px";

        }
        else 
        {

           
            if(x < ( ( 30 + this._width) ) ){
        
                this._InformationWindowInstance.style.left 
                = (15) + "px";
    
            }
            else{

                this._InformationWindowInstance.style.left 
                = (x -( 35 + this._width)) + "px";

            }

        }
        
         // if y is less than the window width - tooltip  width
        if(
            y < (window.innerHeight - (30 + this._height ) )
        ){
        
            this._InformationWindowInstance.style.top 
            = (y + 15) + "px";

        }
        else 
        {

            this._InformationWindowInstance.style.top 
            = ( y - ( 30 + this._height ) ) + "px";

        }

        // this._InformationWindowInstance.style.maxHeight 
        // = 500+"px";
       
    }

    show(): void {

        console.log(
            "InformationWindow show():"
            + this.modelInstance.mouseCoordinates.x
            + " :: "
            + this.modelInstance.mouseCoordinates.y
        );

        this.setPosition();

        // this.moveToMouseCoords(

        //     this.modelInstance.mouseCoordinates.x,
        //     this.modelInstance.mouseCoordinates.y
            
        // );
        //

        if (!this._InformationWindowInstance.parentNode){

            document.body.appendChild(

                this._InformationWindowInstance

            );
        
        }

        

    }

    hide(): void {

        console.log("InformationWindow hide()");

        if (this._InformationWindowInstance.parentNode){

            document.body.removeChild(
                this._InformationWindowInstance
            );
        
        }
    }

    updateAllFields(

        title:string = "title",
        data:string = "data",
        status:string = "status",
        content:string = "content",
        info:string = "info",
        message:string = "message",
        on:string = "on",
        name:string = "name"

    ){

        this._titleField.innerText = title;
        this._messageField.innerText = message;
        this._contentField.innerText = content;
        this._dataField.innerText = data;
        this._statusField.innerText = status;
        this._nameField.innerText = "name id";
        this._infoField.innerText = info;
        this._onField.innerText = on;
        this._nameField.innerText = name;
    }

    updateContentField(
        content:string = "content"
    ){

        this._contentField.innerText 
        = content;

    }

    updateInfoField(
        info:string = "info"
    ){
        
        this._infoField.innerText 
        = info;

    }

    updateMessageField(
        message:string = "message"
    ){

        this._messageField.innerText 
        = message;

    }

    updateStatusField(
        status:string = "status"
    ){

        this._statusField.innerText 
        = status;
    }

    updateDataField(
        data:string = "data"
    ){

        this._dataField.innerText 
        = data;

    }

    updateTitleField(
        title:string = "title"
    ){

        this._titleField.innerText 
        = title;
        
    }

    updateOnStatusField(
        onString:string = "Off"
    ){

        this._onField.innerText 
        = onString;
        
    }

    updatenameField(
        nameString:string = "name"
    ){

        this._nameField.innerText 
        = nameString;
        
    }

    updateRepetitionsField(
        repetitionsString:string = "name"
    ){

        this._repetitionsField.innerText 
        = repetitionsString;
        
    }

}