import { Camera, Raycaster, Vector2 } from "three";

export default class AjhRaycasterWithPoint {

    screenPoint : Vector2;

    raycaster;

    id : number;

    constructor( id : number ){

        this.id = id;
        this.screenPoint = new Vector2();
        this.raycaster = new Raycaster();
        this.raycaster.layers.set(3);

    };

    updatePointCoords( newXY : Vector2 ){
        
        this.screenPoint = newXY;

    }

    updateRaycaster( 
        camera: Camera, 
        newXY : Vector2 | null = null 
    ){
        
        if( newXY != null ){
        
            this.screenPoint = newXY;
        
        }

        this.screenPoint.x = ( this.screenPoint.x / window.innerWidth) * 2 - 1;
        this.screenPoint.y = - ( this.screenPoint.y / window.innerHeight) * 2 + 1;

        console.log( "RAYCASTER UPDATING x:" + this.screenPoint.x + "y:" + this.screenPoint.y)

        this.raycaster.setFromCamera( this.screenPoint, camera );
        
    }

}
