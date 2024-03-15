import { Mesh, MeshStandardMaterial, Scene, WebGLRenderer } from 'three';
import AjhModel from '../datamodels/AjhModel';
import AjhKey from './AjhKey';


export default class AjhKeys {

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

    private _keyRows: Array<Array<AjhKey>> = new Array<Array<AjhKey>>();
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

    constructor(
        rows:number = 1,
        cols:number = 12,
        keysType : String,
        musicalscale : String,
        octaveToStartFrom : number
    ){


        
       this._modelInstance = AjhModel.Instance;
        this.numberOfRows = rows;
        this.numberOfColumns = cols;

        this.octaveToStartFrom = octaveToStartFrom;

        this.spaceBetweenKeys = 0;//0.025;
        this.spaceBetweenRows = 0.5;

        this.divisor = 100;

        this.createKeys();
       // this.positionKeys();

    }

    
    setToCurrentKeyboard(){
        this.modelInstance.currentKeyBoard =
        this;
    }

    createKeys(){


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
                

                let octave = this.octaveToStartFrom +rowIndex+ Math.floor(colIndex/12);
                this._keys.push( 

                    new AjhKey(

                        ((rowIndex)*this.numberOfColumns)+colIndex,
                        rowIndex,
                        colIndex,
                        (window.innerWidth/this.numberOfColumns) / this.modelInstance.camera.position.y,
                        0.5,
                        (window.innerHeight/this.numberOfRows) / this.modelInstance.camera.position.y,
                        isBlackKey,
                        this.modelInstance.scales.noteNamesOneOctave[colIndex%12],
                        octave,
                        this

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

    positionKeys(){

        let screenXY = this.modelInstance.getCameraViewSizeXY();


        let xOffset = screenXY.x / 2; 

        for (
            let keyIndex = 0; 
            keyIndex < this.keys.length; 
            keyIndex++
        ) {
            
            const keyElement = this.keys[keyIndex];

                keyElement.body.position.x 
                = 
                (
                    ( 
                    
                        (keyElement.colId) 
                    
                        * 
                    
                        (keyElement.keyWidth +this.spaceBetweenKeys) 
                
                    ) 
                
                    - (xOffset)
                
                )
                
                + 
                
                ( keyElement.keyWidth / 2 );

                //now the z position
                //let zOffset =  -( keyElement.keyHeight / 2 );//0;//screenXY.y/2; //(window.innerHeight/this.numberOfRows) / this.modelInstance.camera.position.y;
                //let zOffset = window.innerHeight/this.numberOfRows;//screenXY.y / this._numberOfRows; 
                let zOffset = -screenXY.y/this.numberOfRows;// window.innerHeight/2;//0;//-screenXY.y / this._numberOfRows; 
                keyElement.body.position.z 
                =  0;//
               - (
                    ( 
                        (keyElement.rowId) 
                   
                        * 

                        ( (keyElement.keyHeight* ((this.numberOfRows))))

                        // (window.innerHeight/this.numberOfRows) 
                        // ( keyElement.keyHeight * this.numberOfRows ) ) + ( keyElement.keyHeight ) 
                        //this.spaceBetweenRows)
                        //-( ( (window.innerHeight/this.numberOfRows) / this.modelInstance.camera.position.y )/2 ) 
                    )

                  // - (zOffset)

                )

                +
                
                ( keyElement.keyHeight * ((this.numberOfRows/2)))
                - (zOffset);
            
        }

    }

    addKeysToScene(scene:Scene){

        for (let index = 0; index < this.getKeyBodies().length; index++) {
            const element = this.getKeyBodies()[index];
            scene.add(element);
        }

    }

    changeKeyWidthsAndLengthsToFitScreenSize(){

        for (let index = 0; index < this.keys.length; index++) {
            const element = this.keys[index];
            element.changeKeySizeToFitScreenSize();
           }
    
           this.positionKeys();

    }

    repaintKeyBodies(){
        
        for (let index = 0; index < this.keys.length; index++) {
            const element = this.keys[index];
            element.repaintBody()
        }
    }

    getKeyBodies(){

        let bodies: Array<Mesh> = new Array<Mesh>();

        for (let index = 0; index < this.keys.length; index++) {
            const element = this.keys[index].body;
            bodies.push(element as Mesh);
        }
        return bodies;
    
    }

    public getKeyBodyByUUID(uuid:String) : Mesh | null
    {

        let body: Mesh = null;

        for (let index = 0; index < this.keys.length; index++) {
            
            const element = this.keys[index].body;
           
           if ((element as Mesh).uuid == uuid) {
                body = element as Mesh;//
            }
        
        }

        return body;
    
    }

    public getKeyByBodyUUID(uuid:String) : AjhKey | null
    {

        let foundKey: AjhKey = null;

        for (let index = 0; index < this.keys.length; index++) {
            
            const element = this.keys[index];
           
           if ((element.body as Mesh).uuid == uuid) {

                foundKey = element as AjhKey;//}

           } 
        
        }

        return foundKey;
    
    }



    

    public getKeyBodyByID(ID:number) : Mesh | null
    {

        let body: Mesh = null;

        for (let index = 0; index < this.keys.length; index++) {
            
            const element = this.keys[index].body;
           
           if ((element as Mesh).id == ID) body = element as Mesh;//}
        
        }

        return body;
    
    }


    destroyKeys(){

        for (let index = 0; index < this._keys.length; index++) {
            const element = this._keys[index];
            (element.body as Mesh).removeFromParent();
            this.dispose( (element.body as Mesh) );
        }

        this.keys == null;



    }

    public dispose(mesh:Mesh){
        if(mesh != null){

            mesh.geometry.dispose();
            (mesh.material as MeshStandardMaterial).dispose();
            
           (this._modelInstance.renderer as WebGLRenderer)
           .renderLists.dispose();

        }
    }

}