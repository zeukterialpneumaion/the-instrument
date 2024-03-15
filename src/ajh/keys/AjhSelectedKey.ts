import AjhModel from "../datamodels/AjhModel";
import AjhKey from "./AjhKey";

export default class AjhSelectedKey {


    private modelInstance : AjhModel;

    private _raycasterId: number;
    public get raycasterId(): number {
        return this._raycasterId;
    }
    public set raycasterId(value: number) {
        this._raycasterId = value;
    }

    private _bodyName: string;
    public get bodyName(): string {
        return this._bodyName;
    }
    public set bodyName(value: string) {
        this._bodyName = value;
        //this.populateDetails();
    }

    private _bodyId: any;
    public get bodyId(): any {
        return this._bodyId;
    }
    public set bodyId(value: any) {
        this._bodyId = value;
        this.selectedKey;
    }
   
    private _keyId: number;
    public get keyId(): number {
        return this._keyId;
    }
    public set keyId(value: number) {
        this._keyId = value;
    }

    private _keyboardId: number;
    public get keyboardId(): number {
        return this._keyboardId;
    }
    public set keyboardId(value: number) {
        this._keyboardId = value;
    }

    private _selectedKey: AjhKey;
    public get selectedKey(): AjhKey {
        return this._selectedKey;
    }
    public set selectedKey(value: AjhKey) {
        this._selectedKey = value;
    }

    private _bodyUUID: String;
    public get bodyUUID(): String {
        return this._bodyUUID;
    }
    public set bodyUUID(value: String) {
        this._bodyUUID = value;
    }

    constructor() {
       // this.modelInstance = AjhModel.Instance;
       // this.populateWithDummyDetails();
    }

    
// ============================================================ //
// =============== SELECTED KEY SINGLETON INSTANCE =================== //
// ============================================================ //
        
private static _instance: AjhSelectedKey | null = null;
    
public static get Instance(): AjhSelectedKey {

    if (!AjhSelectedKey._instance) {
        AjhSelectedKey._instance = new AjhSelectedKey();
    }

    return AjhSelectedKey._instance;

}

// ============================================================ //
  
    private populateWithDummyDetails() {

        this._keyId
            = 1001;
            // parseFloat(

            //     this._bodyName
            //         .split("_")[1]
            //         .split("p:")[0]

            // );
            //

        console.log(

            this._keyId

        );


        this._keyboardId
            = 1001;
            // parseFloat(

            //     this._bodyName
            //         .split("r:")[1]
            //         .split("b:")[0]

            // )+0;

        console.log(

            this._keyboardId

        );

        this._bodyName
            = "ajhInitialSelectedKey";
        console.log(

            this._bodyName

        );

    }
}