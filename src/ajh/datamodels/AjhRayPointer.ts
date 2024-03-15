import { Vector2 } from "three";

export default class AjhRayPointer {

    private _rayPointer: Vector2 = new Vector2;
    public get rayPointer(): Vector2 {
        return this._rayPointer;
    }
    public set rayPointer( value: Vector2) {
        this._rayPointer = value;
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    constructor(

        id: number,
        x : number,
        y: number

    ){

        this.rayPointer.x = x;
        this.rayPointer.y = y;
        this.id = id;

    };

}