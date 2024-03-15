import { Frequency } from "tone/build/esm/core/type/Units";

export default class AjhNamedNote {

    private _name: Frequency;
    public get name(): Frequency {
        return this._name;
    }
    public set name(value: Frequency) {
        this._name = value;
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    constructor(name: Frequency, id: number) {
        this._name = name
        this._id = id
    }


}