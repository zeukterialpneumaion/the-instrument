import { Mesh, Scene, Vector3, WebGLRenderer } from 'three';
import AjhModel from '../../datamodels/AjhModel';
import { deepDispose } from '../../helpers/scene/ajhThreeDisposal';
import AjhKey from '../key/AjhKey';
import AjhKeyboardTypes from './AJhKeyBoardTypes';


export default class AjhKeyBoard {

    
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////

    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    private _modelInstance: AjhModel;
    public get modelInstance(): AjhModel {
        return this._modelInstance;
    }
    public set modelInstance(value: AjhModel) {
        this._modelInstance = value;
    }

    private _spaceBetweenRows: number = 3;
    public get spaceBetweenRows(): number {
        return this._spaceBetweenRows;
    }
    public set spaceBetweenRows(value: number) {
        this._spaceBetweenRows = value;
    }

    private _spaceBetweenKeys: number;
    public get spaceBetweenKeys(): number {
        return this._spaceBetweenKeys;
    }
    public set spaceBetweenKeys(value: number) {
        this._spaceBetweenKeys = value;
    }

    private _keys: Array<AjhKey> = new Array<AjhKey>();
 
    public get keys(): Array<AjhKey> {
        return this._keys
    }
    public set keys(value: Array<AjhKey>) {
        this._keys = value
    }

    private _keyRows: Array<Array<AjhKey>> 
    = new Array<Array<AjhKey>>();
    public get keyRows(): Array<Array<AjhKey>> {
        return this._keyRows;
    }
    public set keyRows(value: Array<Array<AjhKey>>) {
        this._keyRows = value;
    }

    private _numberOfRows: number;
    public get numberOfRows(): number {
        return this._numberOfRows;
    }
    public set numberOfRows(value: number) {
        this._numberOfRows = value;
    }

    private _numberOfColumns: number;
    public get numberOfColumns(): number {
        return this._numberOfColumns;
    }
    public set numberOfColumns(value: number) {
        this._numberOfColumns = value;
    }

    private _divisor: number;
    public get divisor(): number {
        return this._divisor;
    }
    public set divisor(value: number) {
        this._divisor = value;
    }

    private _voice: any;
    public get voice(): any {
        return this._voice;
    }
    public set voice(value: any) {
        this._voice = value;
    }
    
    private _octaveToStartFrom: number;
    public get octaveToStartFrom(): number {
        return this._octaveToStartFrom;
    }
    public set octaveToStartFrom(value: number) {
        this._octaveToStartFrom = value;
    }

    public KeysetTypeDefinitions :AjhKeyboardTypes = new AjhKeyboardTypes();

    private _keysetTypeInstance: String;
    public get KeyBoardTypeInstance(): String {
        return this._keysetTypeInstance;
    }
    public set KeyBoardTypeInstance(value: String) {
        this._keysetTypeInstance = value;
    }

//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////

    constructor(
        rows:number = 1,
        cols:number = 12,
        keysType : String = "pianogrid",
        musicalscale : String = "chromatic",
        octaveToStartFrom : number = 3
    ){


        
        this._modelInstance = AjhModel.Instance;

        this.numberOfRows = rows;
        this.numberOfColumns = cols;

        this.octaveToStartFrom = octaveToStartFrom;

        this.spaceBetweenKeys = 0;//0.025;
        this.spaceBetweenRows = 0.5;

        this.divisor = 100;

        this.KeyBoardTypeInstance = keysType
        
        this.routeToCorrectFunctionsForKeySetType();
       // this.positionKeys();

    }

//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
    
    setToCurrentKeyboard(){
        this.modelInstance.currentKeyBoard =
        this;
    }

//////////////////////////////////////////////////////////////
routeToCorrectFunctionsForKeySetType(){

    switch (this.KeyBoardTypeInstance) {

            case this.KeysetTypeDefinitions.HorizontalKeys:
            
            this.createKeys(this.KeysetTypeDefinitions.HorizontalKeys);

            break;

            case this.KeysetTypeDefinitions.VerticalKeys:
            
            this.createKeys(this.KeysetTypeDefinitions.VerticalKeys);

            break;


            case this.KeysetTypeDefinitions.CirclesOfKeys:
            
            break;


            case this.KeysetTypeDefinitions.RandomlyPlacedKeys:
            
            break;


            case this.KeysetTypeDefinitions.Voronoi:
            
            break;


            case this.KeysetTypeDefinitions.EffectsXY:
            
            break;
    
        default:
            break;
    }

}
//////////////////////////////////////////////////////////////

    createKeys(keyboardType){


        console.log("CREATING KEYS::CURRENT KEYBOARD");
       // this.setToCurrentKeyboard()

       if(this._keys){
            this.destroyKeys();
       }

        this._keys = new Array< AjhKey>();

        for (
            let rowIndex = 0; 
            rowIndex < this.numberOfRows; 
            rowIndex++
        ) {
            
            const rowElement = this._keyRows[rowIndex];

            for (
                let colIndex = 0; 
                colIndex < this.numberOfColumns; 
                colIndex++
            ) {
                
                let colElement = this._keys[colIndex];

                // colElement 
                // = rowElement[colIndex]
                let isBlackKey = false;

                if( 
                    colIndex%12 == 1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                    || colIndex%12 == 3 
                    || colIndex%12 == 6 
                    || colIndex%12 == 8                                                                         
                    || colIndex%12 == 10 
                ){
                    isBlackKey = true;
                }
                

                let octave 
                    = 
                    this.octaveToStartFrom 
                    +
                    rowIndex
                    + Math.floor(colIndex/12);

                    let keywidth =
                    (window.innerWidth/this.numberOfColumns)
                    -
                    ((window.innerWidth/this.numberOfColumns)
                    /this.numberOfColumns)

                this._keys.push( 

                    new AjhKey(

                        ((rowIndex)*this.numberOfColumns)+colIndex,
                        rowIndex,
                        colIndex,
                        (window.innerWidth/this.numberOfColumns) / this.modelInstance.camera.position.y,
                        0.5,
                        keywidth / this.modelInstance.camera.position.y,
                        isBlackKey,
                        this.modelInstance.scales.noteNamesOneOctave[colIndex%12],
                        octave,
                        this,
                        this.keys.length-1
                    )

                );
                
                console.log(

                    "KEY NOTE:: " 
                    + 
                    this.modelInstance.scales.noteNamesOneOctave[colIndex%12] 
                    + 
                    Math.round(octave + colIndex/12).toString()

                );

            }
            
        }

        this.modelInstance.keyBodies =
        this.getKeyBodies();

        this.positionKeys();

        this.addKeysToScene(this.modelInstance.scene)

    }

//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////

    positionKeys(){

        let screenXY = this.modelInstance.getCameraViewSizeXY();

        let xOffset = screenXY.x / 2; 

        for (
            let keyIndex = 0; 
            keyIndex < this.keys.length; 
            keyIndex++
        ) {
            
            const keyElement = this.keys[keyIndex];

                keyElement.KeyState.View.Body.position.x 
                = 
                (
                    ( 
                    
                        (keyElement.KeyState.View.ColId) 
                    
                        * 
                    
                        (keyElement.KeyState.View.Width +this.spaceBetweenKeys) 
                
                    ) 
                
                    - (xOffset)
                
                )
                
                + 
                
                ( keyElement.KeyState.View.Width / 2 );

                //now the z position
                //let zOffset =  -( keyElement.keyHeight / 2 );//0;//screenXY.y/2; //(window.innerHeight/this.numberOfRows) / this.modelInstance.camera.position.y;
                //let zOffset = window.innerHeight/this.numberOfRows;//screenXY.y / this._numberOfRows; 
                let zOffset = -screenXY.y/this.numberOfRows;// window.innerHeight/2;//0;//-screenXY.y / this._numberOfRows; 
                
                keyElement.KeyState.View.Body.position.z 
                =  0;//
                
               - (
                    ( 
                        (keyElement.KeyState.View.RowId) 
                   
                        * 

                        ( (keyElement.KeyState.View.Height* ((this.numberOfRows))))

                        // (window.innerHeight/this.numberOfRows) 
                        // ( keyElement.keyHeight * this.numberOfRows ) ) + ( keyElement.keyHeight ) 
                        //this.spaceBetweenRows)
                        //-( ( (window.innerHeight/this.numberOfRows) / this.modelInstance.camera.position.y )/2 ) 
                    )

                  // - (zOffset)

                )

                +
                
                ( keyElement.KeyState.View.Height * ((this.numberOfRows/2)))
                - (zOffset);
            
        }

    }

//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////

    addKeysToScene(scene:Scene){

        for (
            let index = 0; 
            index < this.getKeyBodies().length; 
            index++
        ) {

            const element = this.getKeyBodies()[index];

            scene.add(element);

        }

    }

//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////

    changeKeyWidthsAndLengthsToFitScreenSize(){

        for (
            let index = 0; 
            index < this.keys.length; 
            index++
        ) {

            const element = this.keys[index];

            element.changeKeySizeToFitScreenSize();

        }
    
        this.positionKeys();

    }

//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////

    repaintKeyBodies(){
        
        for (
            let index = 0; 
            index < this.keys.length; 
            index++
        ) {

            const element = this.keys[index];

            element.repaintBody();

        }
    }

//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////

    getKeyBodies(){

        let bodies: Array<Mesh> = new Array<Mesh>();

        for (
            let index = 0; 
            index < this.keys.length; 
            index++
        ) {

            const element = this.keys[index].KeyState.View.Body;

            bodies.push(element as Mesh);

        }

        return bodies;
    
    }

//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////

    public getKeyBodyByUUID(uuid:String) : Mesh | null
    {

        let body: Mesh = null;

        for (
            let index = 0; 
            index < this.keys.length; 
            index++
        ) {
            
            const element = this.keys[index].KeyState.View.Body;
           
           if ((element as Mesh).uuid == uuid) {

                body = element as Mesh;//

            }
        
        }

        return body;
    
    }

//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////

    public getKeyByBodyUUID(uuid:String) : AjhKey | null
    {

        let foundKey: AjhKey = null;

        for (let index = 0; index < this.keys.length; index++) {
            
            const element = this.keys[index];
           
           if ((element.KeyState.View.Body as Mesh).uuid == uuid) {

                foundKey = element as AjhKey;//}

           } 
        
        }

        return foundKey;
    
    }
  
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////  

    public getKeyBodyByID(ID:number) : Mesh | null
    {

        let body: Mesh = null;

        for (let index = 0; index < this.keys.length; index++) {
            
            const element = this.keys[index].KeyState.View.Body;
           
           if ((element as Mesh).id == ID) body = element as Mesh;//}
        
        }

        return body;
    
    }


//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////

    destroyKeys(){

        for (let index = 0; index < this._keys.length; index++) {
            const element = this._keys[index];
            (element.KeyState.View.Body as Mesh).removeFromParent();
           deepDispose( (element.KeyState.View.Body as Mesh) );
        }

        this.keys = new Array<AjhKey>();

    }

//////////////////////////////////////////////////////////////

    degrees_to_radians(degrees) {

        return degrees * (Math.PI / 180); 

    }

//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////

    createPositionsOnCircle(
        amount: number,
        radius: number,
        centrePoint = new Vector3()
    ): any {

        centrePoint = new Vector3();

        // console.log("createPositionsOnCircle:amount::" + amount);
        let circlePositions: Array<Vector3> = [];

        let div = 360 / amount ;

        // var angle = 0,
        //     step = (2*Math.PI) / amount;

        for (var i = 0; i < amount; i++) {

            let aposition
                = new Vector3();

            let angle = this.degrees_to_radians(div * i);

            var x =
                centrePoint.x
                + (radius * Math.cos(angle));

            var y =
                centrePoint.y
                + (radius * Math.sin(angle));

            aposition.x = (x * 1);
            aposition.y = (y * 1);
            aposition.z = 0;//(i * 2);

            circlePositions.push(aposition);

            // angle += step;

        }

        return circlePositions;

    }
    
//////////////////////////////////////////////////////////////

    public dispose(mesh:Mesh){
        if(mesh != null){
            deepDispose(mesh);
            // mesh.geometry.dispose();
            // (mesh.material as MeshStandardMaterial).dispose();
            
           (this._modelInstance.renderer as WebGLRenderer)
           .renderLists.dispose();

        }
    }

}