import { BoxGeometry, Color, Material, Mesh, MeshStandardMaterial, WebGLRenderer } from "three";
import AjhModel from "../../datamodels/AjhModel";

export default class AjhFullScreenObject {


    constructor ( 
        screenwidth : number, 
        screenheight : number
    ){


        this._modelInstance = AjhModel.Instance;

        this._screenHeight = screenheight;
        this._screenWidth = screenwidth;

        this.divisor = 100;

        this.createBody();

        //

    }

    repaint(colour:Color){
        (this._body.material as MeshStandardMaterial).color = colour;
    }

    remake(){

        if( this._body != null){

            this._body.geometry.dispose();
            (this._body.material as Material).dispose();
            
           (this._modelInstance.renderer as WebGLRenderer)
           .renderLists.dispose();

        }

        const sideLength = 1;

        const cubeGeometry 
        = 
        new BoxGeometry(
            1,
            0.1,
           1
           );
        
        const cubeMaterial 
        = 
        new MeshStandardMaterial(
            {
                color: '#5CF61F',
                metalness: 0.5,
                roughness: 0.7,
            }
        );

            //cubeMaterial.needsUpdate = true;

        this.body = new Mesh(cubeGeometry, cubeMaterial);
        this.body.castShadow = true;
        
    }

    createBody(){

        if( this._body != null){

            this._body.geometry.dispose();
            (this._body.material as Material).dispose();
            
           (this._modelInstance.renderer as WebGLRenderer)
           .renderLists.dispose();

        }

        const sideLength = 1;

        const cubeGeometry 
        = 
        new BoxGeometry(
            1,
            0.2,
            1
        );
        
        const cubeMaterial 
        = 
        new MeshStandardMaterial(
            {
                color: '#309608',
                metalness: 0.5,
                roughness: 0.7,
            }
        );
        
        
        this.body = new Mesh(cubeGeometry, this.modelInstance.materials.backgroundMaterial);
        this.body.castShadow = true;

        this.body.scale.set(
            Math.round( this.screenWidth / this.modelInstance.camera.position.y ),
            1,
            Math.round( this.screenHeight / this.modelInstance.camera.position.y )
        );

        (this.body as Mesh).position.y = 0.4

            //cubeMaterial.needsUpdate = true;

            console.log("FULLSCREENOBJECT CREATED");

        
        
    }

    public dispose(){
        if( this._body != null){

            this._body.geometry.dispose();
            (this._body.material as Material).dispose();
            
           (this._modelInstance.renderer as WebGLRenderer)
           .renderLists.dispose();

        }
    }

    public resizeToScreenSize(){

        let screenXY = this.modelInstance.getCameraViewSizeXY();

        this.body.scale.set(

            screenXY.x,
            1,
            screenXY.y

        );

    }

    private _divisor: number; 
    public get divisor(): number {
        return this._divisor;
    }
    public set divisor(value: number) {
        this._divisor = value;
    }


    private _modelInstance: AjhModel;
    public get modelInstance(): AjhModel {
        return this._modelInstance;
    }
    public set modelInstance(value: AjhModel) {
        this._modelInstance = value;
    }
    
    private _screenWidth: number;
    public get screenWidth(): number {
        return this._screenWidth;
    }
    public set screenWidth(value: number) {
        this._screenWidth = value;
    }

    private _screenHeight: number;
    public get screenHeight(): number {
        return this._screenHeight;
    }
    public set screenHeight(value: number) {
        this._screenHeight = value;
    }

    private _body: Mesh;
    public get body(): Mesh {
        return this._body;
    }
    public set body(value: Mesh) {
        this._body = value;
    }
}