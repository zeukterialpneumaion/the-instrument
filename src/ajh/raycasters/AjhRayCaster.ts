import { Intersection, Raycaster } from "three";
import AjhModel from "../datamodels/AjhModel";

export default class AjhRayCaster {

    
    private modelInstance:AjhModel;

    private INTERSECTED;

    private _rayCaster: Raycaster = new Raycaster();
    public get rayCaster(): Raycaster {
        return this._rayCaster;
    }
    public set rayCaster( value: Raycaster) {
        this._rayCaster = value;
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    constructor(

        id: number
       

    ){

        this.id = id;
        this.modelInstance = AjhModel.Instance;

    };

    setRaycasterToCamera(){
      //  console.log("UPDATING POINTER and setting raycaster")
      this.rayCaster
            .setFromCamera( 
                this.modelInstance.raycasterPointers
                .getRayPointerByID(
                    this.id
                ).rayPointer,
                this.modelInstance.camera
            );
            
    }

    findInstrumentKeysFromRaycast() {

        let intersects : Intersection[] ;

        try{

            intersects 
            = this.rayCaster
            .intersectObjects( 
                this.modelInstance.currentKeyBoard.getKeyBodies(), // scene.children, 
                false 
            );//

            
            //console.log( " this.modelInstance.scene.children " +  this.modelInstance.scene.children );

            if ( intersects.length > 0 ) {


                if ( this.INTERSECTED != intersects[ 0 ].object ) {

                    if ( this.INTERSECTED ) {

                       //  this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
                     //  touched: boolean,  rayid:number, id:number, uuid: string 
                        //  this.modelInstance.musicalKeyEventEmitter.emit(
                        //     "touchedByRay", 
                        //     false,
                        //     this.id,
                        //     this.modelInstance.selectedKeys.getSelectedKeyByRayCasterId(this.id).bodyId ,
                        //     this.modelInstance.selectedKeys.getSelectedKeyByRayCasterId(this.id).bodyUUID
                        // )
                        console.log("INTERSECTED????");
                    }

                    

                    if(this.INTERSECTED != intersects[ 0 ].object){

                       // console.log("Not touching last touched"};//+this.modelInstance.selectedKeys.getSelectedKeyByRayCasterId(this.id).bodyUUID);
                        // this.modelInstance.musicalKeyEventEmitter.emit(
                        //     "touched", 
                        //     false,
                        //     this.modelInstance.selectedKeys.getSelectedKeyByRayCasterId(this.id).bodyName,
                        //     this.modelInstance.selectedKeys.getSelectedKeyByRayCasterId(this.id).bodyId ,
                        //     this.modelInstance.selectedKeys.getSelectedKeyByRayCasterId(this.id).bodyUUID
                        // )

                     //   this.modelInstance.selectedKeys.removeSelectedKeyByRayCasterId(this.id);
                    
                    }

                    this.INTERSECTED = intersects[ 0 ].object;

                    //this.INTERSECTED.material.emissive.setHex( 0xFFFFFF);

                    // this.modelInstance.selectedKeys
                    // .removeSelectedKeyByRayCasterId( this.id );
                 
                        console.log("RAY IS NOW TOUCHING " + this.INTERSECTED.uuid+" : "+ this.modelInstance
                        .currentKeyBoard.getKeyByBodyUUID( this.INTERSECTED.uuid).KeyState.Id);
                        this.modelInstance.selectedKeys.checkIfExistsAndUpdateOrCreateNewSelectedKey(

                            this.INTERSECTED.id, // bodyId: any, 
                            this.INTERSECTED.name, // bodyName: any, 
                            this.INTERSECTED.uuid, //bodyUUID: any, 
                            this.modelInstance
                            .currentKeyBoard.getKeyByBodyUUID( this.INTERSECTED.uuid).KeyState.Id, // this.INTERSECTED., // keyId: any, 
                            this.modelInstance.currentKeyBoard.id, // this.INTERSECTED.id, //keyboardId: any, 
                            this.id, // touchId: any, 
                            this.modelInstance.currentKeyBoard.getKeyByBodyUUID( this.INTERSECTED.uuid) // selectedKey: any

                        )


                    this.modelInstance.musicalKeyEventEmitter.emit(
                        "touchedByRay", 
                        true,
                        this.id,
                        this.modelInstance.selectedKeys.getSelectedKeyByRayCasterId(this.id).bodyId ,
                        this.modelInstance.selectedKeys.getSelectedKeyByRayCasterId(this.id).bodyUUID
             
                    )

                    this.modelInstance.infoScreen
                    .setDataFieldText( 
                        this.modelInstance.selectedKeys
                        .getSelectedKeyByRayCasterId(this.id)
                        .selectedKey.KeyState.Sonics.NoteName
                    );
                    this.modelInstance.infoScreen
                    .setMessageFieldText( 
                        "" + this.modelInstance.currentKeyBoard.scaleType.name
                    );
                    this.modelInstance.infoScreen
                    .setTitleFieldText( 
                        this.modelInstance.instruments.currentInstrument.name
                    );
                    //ended

                  //  console.log(" NO SELECTED KEY EXISTED SO A NEW ONE WAS ADDED but RAY IS NOW TOUCHING " + this.INTERSECTED.uuid + " " );
                    console.log( 
                        "INTERSECTED" 
                        + intersects.length
                        + " : " 
                        + this.INTERSECTED.id );

                }

                this.modelInstance.pointLights[0].position.x 
                = intersects[0].point.x;
                
                this.modelInstance.pointLights[0].position.z 
                = -intersects[0].point.z;


            } else {

                if ( this.INTERSECTED ) {

                    // 
                    console.log("NOT TOUCHING ANYTHING");
                    console.log("Not touching last touched"+this.modelInstance.selectedKey.bodyUUID);
                    // this.modelInstance.musicalKeyEventEmitter.emit(
                    //     "touched", 
                    //     false,
                    //     this.modelInstance.selectedKeys.getSelectedKeyByRayCasterId(this.id).bodyName,
                    //     this.modelInstance.selectedKeys.getSelectedKeyByRayCasterId(this.id).bodyId ,
                    //     this.modelInstance.selectedKeys.getSelectedKeyByRayCasterId(this.id).bodyUUID
                    // )

                    // this.modelInstance.musicalKeyEventEmitter.emit(
                    //     "touched", 
                    //     false,
                    //     this.modelInstance.selectedKey.bodyName,
                    //     this.modelInstance.selectedKey.bodyId ,
                    //     this.modelInstance.selectedKey.bodyUUID
                    // )

                   // this.INTERSECTED.material.emissive.setHex( 0x000000);
                   
                    // this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
                    
                }

                this.INTERSECTED = null;

                

            }
        }
        catch(e){
            console.log(e)
        }

    }

}