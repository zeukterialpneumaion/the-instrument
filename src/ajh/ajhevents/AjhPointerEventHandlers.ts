import AjhModel from "../datamodels/AjhModel";
import AjhRayCaster from "../datamodels/AjhRayCaster";
import AjhRayPointer from "../datamodels/AjhRayPointer";



export default class AjhPointerEventHandlersObject 
implements AjhPointerEventHandlersInterface {

    constructor(){

        this.pointerdownHandler
        = new AjhHandlerObject( "pointerdown",  this.onPointerDownHandler);
        
        this.pointerupHandler
        = new AjhHandlerObject( "pointerup",  this.onPointerUpHandler);

        this.pointermoveHandler
        = new AjhHandlerObject( "pointermove",  this.onPointerMoveHandler);

        this.pointeroverHandler
        = new AjhHandlerObject( "pointerover",  this.onPointerOverHandler);

        this.pointeroutHandler
        = new AjhHandlerObject( "pointerout",  this.onPointerOutHandler);

        this.pointerenterHandler
        = new AjhHandlerObject( "pointerenter",  this.onPointerEnterHandler);        

        this.pointerleaveHandler
        = new AjhHandlerObject( "pointerleave",  this.onPointerLeaveHandler);

        this.pointercancelHandler
        = new AjhHandlerObject( "pointercancel",  this.onPointerCancelHandler);
        
        this.gotpointercaptureHandler 
        = new AjhHandlerObject( "gotpointercapture",  this.onGotPointerCaptureHandler);
    
        this.lostpointercaptureHandler
        = new AjhHandlerObject( "lostpointercapture",  this.onLostPointerCaptureHandler);

        this.handlersArray = 
        [
            this.pointerdownHandler,
            this.pointerupHandler,
            this.pointermoveHandler,
            this.pointeroverHandler,
            this.pointeroutHandler,
            this.pointerenterHandler,
            this.pointerleaveHandler,
            this.pointercancelHandler,
            this.gotpointercaptureHandler, 
            this.lostpointercaptureHandler
            

        ]
        
    }
 
// ======================================================================== //
// POINTER EVENT HANDLERS :: AJH //
// ======================================================================== //
    
    private onGotPointerCaptureHandler(evt : PointerEvent){

        console.log("got pointer capture")
    };
        
    private onLostPointerCaptureHandler(evt : PointerEvent){

        console.log("lost pointer capture")

    };
    
    private onPointerDownHandler(evt : PointerEvent){


        let selfReference = this._modelInstance.pointerEventsInstance.ajhPointerEventHandlers;
       
            
        evt.stopPropagation();
       // evt.preventDefault();
            // set my pointer id to that of the pointerId
            if(selfReference.getPointerEventById(evt.pointerId) == null){
                selfReference.addPointerEvent(evt.pointerId);
            }
            else{
                
            }
            

        //if the selectedkey is not undefined then setcoords of mouse
        if (
          this._modelInstance.selectedKeys.selectedKeys[evt.pointerId]
            != 
            undefined 
            // | 
           // null
        ){

            //set coords
            this._modelInstance.mouseCoordinates.x
            =
            evt.clientX;
            
            this._modelInstance.mouseCoordinates.y
            =
            evt.clientY;
            
        try{

                    this._modelInstance.musicalKeyEventEmitter.emit(
                        "onPointerDown", 
                        this._modelInstance.selectedKeys.selectedKeys[evt.pointerId].bodyName,
                        this._modelInstance.selectedKeys.selectedKeys[evt.pointerId].bodyId,
                        this._modelInstance.selectedKeys.selectedKeys[evt.pointerId].bodyUUID,
                    )

               console.log("pointerdown  >> id: " + evt.pointerId)

            }
            catch(e){

                console.log(e);

            }

        }
        else{

            console.log(

                "MouseClickOutside:: id: "
                + this._modelInstance.selectedKey.keyId
                + ", name: "
                + this._modelInstance.selectedKey.bodyName

            );

        }


    };


    public onPointerMoveHandler(evt : PointerEvent){

                
        evt.stopPropagation();
        evt.preventDefault();

      // console.log( test());//getPointerEventById(evt.pointerId) );
        let selfReference = this._modelInstance.pointerEventsInstance.ajhPointerEventHandlers;
       
        if(selfReference.getPointerEventById(evt.pointerId) == null){
            selfReference.addPointerEvent(evt.pointerId);
        }
        else{
            
        }

        // update pointer from the evt id
        // = 
        let pointerToUpdate:AjhRayPointer 
        = this._modelInstance.raycasterPointers.getRayPointerByID(evt.pointerId);

        let raycasterToUpdate:AjhRayCaster 
        = this._modelInstance.raycasters.getRayCasterByID(evt.pointerId);

        if(
            pointerToUpdate 
            != 
            null
        ){

        // console.log("UPDATING POINTER:" + evt.pointerId + ":" +  this._modelInstance.raycasterPointers.getRayPointerByID(evt.pointerId).id );
            pointerToUpdate.rayPointer.x 
            = ( evt.clientX / window.innerWidth ) * 2 - 1;

            pointerToUpdate.rayPointer.y
            = ( evt.clientY / window.innerHeight ) * 2 - 1;

         //   console.log("UPDATING POINTER: x " +pointerToUpdate.rayPointer.x+" y: "+pointerToUpdate.rayPointer.y);
    
        } else {

            this._modelInstance.raycasterPointers.addRayPointer(
                evt.pointerId,
                ( evt.clientX / window.innerWidth ) * 2 - 1,
                ( evt.clientY / window.innerHeight ) * 2 - 1
            )

        }

        // now update the raycaster :
        if(
            raycasterToUpdate 
            != 
            null
        ){

            raycasterToUpdate.setRaycasterToCamera();

        } else {


            this._modelInstance.raycasters.addRayCaster(evt.pointerId);

        }
      
        this._modelInstance.raycasters.getRayCasterByID(evt.pointerId).findInstrumentKeysFromRaycastFromMouseCoords();
     
    };

    
    private onPointerUpHandler(evt : PointerEvent){
     
        let selfReference = this._modelInstance.pointerEventsInstance.ajhPointerEventHandlers;
       
            
        evt.stopPropagation();
       // evt.preventDefault();
            // set my pointer id to that of the pointerId
            if(selfReference.getPointerEventById(evt.pointerId) == null){
                selfReference.addPointerEvent(evt.pointerId);
            }
            else{
                
            }
            

        //if the selectedkey is not undefined then setcoords of mouse
        if (
          this._modelInstance.selectedKeys.selectedKeys[evt.pointerId]
            != 
            undefined 
            // | 
           // null
        ){

            //set coords
            this._modelInstance.mouseCoordinates.x
            =
            evt.clientX;
            
            this._modelInstance.mouseCoordinates.y
            =
            evt.clientY;
            
        try{

                    this._modelInstance.musicalKeyEventEmitter.emit(
                        "onPointerUp", 
                        this._modelInstance.selectedKeys.selectedKeys[evt.pointerId].bodyName,
                        this._modelInstance.selectedKeys.selectedKeys[evt.pointerId].bodyId,
                        this._modelInstance.selectedKeys.selectedKeys[evt.pointerId].bodyUUID,
                    )

               console.log("pointerup  >> id: " + evt.pointerId)

            }
            catch(e){

                console.log(e);

            }

        }
        else{

            console.log(

                "MouseClickOutside:: id: "
                + this._modelInstance.selectedKey.keyId
                + ", name: "
                + this._modelInstance.selectedKey.bodyName

            );

        }


    };

    private onPointerCancelHandler(evt : PointerEvent){

    };

    private onPointerOverHandler(evt : PointerEvent){

    };

    private onPointerOutHandler(evt){

        console.log("Pointer out"+(evt as PointerEvent).pointerId);
        try{

            this._modelInstance.musicalKeyEventEmitter.emit(
                "onPointerUp", 
                this._modelInstance.selectedKeys.selectedKeys[evt.pointerId].bodyName,
                this._modelInstance.selectedKeys.selectedKeys[evt.pointerId].bodyId,
                this._modelInstance.selectedKeys.selectedKeys[evt.pointerId].bodyUUID,
            )

       console.log("pointerup  >> id: " + evt.pointerId)

    }
    catch(e){

        console.log(e);

    }

    };
    
    private onPointerEnterHandler(evt : PointerEvent){

        console.log("Pointer Enter"+(evt as PointerEvent).pointerId);

    };

    private onPointerLeaveHandler(evt){

        console.log("Pointer left"+(evt as PointerEvent).pointerId);

    };

    // ================================================================= //

    addPointerEvent(id){

        this.pointerEventsIds.push(new AjhPointerEventId(id));

    }

    removePointerEvent(id){

        let foundPointerIndex = null;
        for (let index = 0; index < this.pointerEventsIds.length; index++) {
            const element = this.pointerEventsIds[index];

            if(element.Id == id){
                foundPointerIndex = index
            }
            
        }
        if(foundPointerIndex != null){
            this.pointerEventsIds.splice(foundPointerIndex,1);
        }
    }

    public getPointerEventById(id) : AjhPointerEventId | null {

        let foundPointer = null;
        for (let index = 0; index < this.pointerEventsIds.length; index++) {
            const element = this.pointerEventsIds[index];

            if(element.Id == id){
                foundPointer = element
            }
            
        }
       
        return foundPointer;

    }

// ======================================================================== //


// ======================================================================== //
    
        private _modelInstance: AjhModel;
        // public get modelInstance(): AjhModel {
        //     return this._modelInstance;
        // }
        // public set modelInstance(value: AjhModel) {
        //     this._modelInstance = value;
        // }


// ======================================================================== //

        pointerdownHandler: AjhHandlerObject
        pointerupHandler: AjhHandlerObject
        pointermoveHandler: AjhHandlerObject
        pointeroverHandler: AjhHandlerObject
        pointeroutHandler: AjhHandlerObject
        pointerenterHandler: AjhHandlerObject
        pointerleaveHandler: AjhHandlerObject
        pointercancelHandler: AjhHandlerObject
        gotpointercaptureHandler: AjhHandlerObject
        lostpointercaptureHandler: AjhHandlerObject

// ======================================================================== //

     handlersArray : Array<AjhHandlerObject> = new Array<AjhHandlerObject>

// ======================================================================== //

    private _pointerEventsIds: Array<AjhPointerEventId> = new Array<AjhPointerEventId>;
    public get pointerEventsIds(): Array<AjhPointerEventId> {
        return this._pointerEventsIds;
    }
    public set pointerEventsIds(value: Array<AjhPointerEventId>) {
        this._pointerEventsIds = value;
    };

}

// ======================================================================== //

class AjhPointerEventId {

    Id:number;

    constructor(id:number){

        this.Id = id;
    }

}

// ======================================================================== //

class AjhHandlerObject {
    
    handlerType: string
    handlerFunction: any

    constructor(
        handlertype: string,
        handlerfunction : any
    ){

        this.handlerType = handlertype;
        this.handlerFunction = handlerfunction;

    }

}

interface AjhPointerEventHandlersInterface {

    pointerdownHandler: AjhHandlerObject,
    pointerupHandler: AjhHandlerObject,
    pointermoveHandler: AjhHandlerObject,
    pointeroverHandler: AjhHandlerObject,
    pointeroutHandler: AjhHandlerObject,
    pointerenterHandler: AjhHandlerObject,
    pointerleaveHandler: AjhHandlerObject,
    pointercancelHandler: AjhHandlerObject,
    gotpointercaptureHandler: AjhHandlerObject,
    lostpointercaptureHandler: AjhHandlerObject

    handlersArray : Array<AjhHandlerObject>;


}