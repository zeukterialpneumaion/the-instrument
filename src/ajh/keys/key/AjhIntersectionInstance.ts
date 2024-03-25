import { Vector3 } from "three";

export default class AjhIntersectionInstance
{

    id: number;
    point : Vector3;
    raycasterWithPointId: number

    constructor( 
        id: number,
        point: Vector3,
        raycasterWithPointId : number
    ){

        this.id = id;
        this.point = point;
        this.raycasterWithPointId = raycasterWithPointId;

    }

} 