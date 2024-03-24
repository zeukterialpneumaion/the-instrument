import AjhModel from "../datamodels/AjhModel";
import AjhRayCaster from "../raycasters/AjhRayCaster";
import AjhRayPointer from "../raycasters/AjhRayPointer";



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

        this.ontouchendcaptureHandler
        = new AjhHandlerObject( "touchend",  this.onTouchEndHandler);

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
    

// ======================================================================== //
// DOWN:: AJH //
// ======================================================================== //
 
    private onPointerDownHandler(evt){

        // if (evt.target.hasPointerCapture(evt.pointerId)) {
        //     evt.target.releasePointerCapture(evt.pointerId);
        // }

        this._modelInstance.pointerDown = true;

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

        ){

            //set coords
            // this._modelInstance.mouseCoordinates.x
            // =
            // evt.clientX;
            
            // this._modelInstance.mouseCoordinates.y
            // =
            // evt.clientY;
            
        try{

                this._modelInstance.musicalKeyEventEmitter.emit(
                    "onPointerDown", 
                    this._modelInstance.selectedKeys.selectedKeys[evt.pointerId].bodyName,
                    this._modelInstance.selectedKeys.selectedKeys[evt.pointerId].bodyId,
                    this._modelInstance.selectedKeys.selectedKeys[evt.pointerId].bodyUUID,
                    evt
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

// ======================================================================== //
// MOVE:: AJH //
// ======================================================================== //

    public onPointerMoveHandler(evt : PointerEvent){

                
        evt.stopPropagation();
        evt.preventDefault();

        
        // if (evt.target.hasPointerCapture(evt.pointerId)) {
        //     evt.target.releasePointerCapture(evt.pointerId);
        // }

        // console.log( 
        //     "pointermoving x:" 
        //     +
        //     evt.clientX
        //     +
        //     " y:"
        //     +
        //     evt.clientY

        // );

        let selfReference 
        = 
        this._modelInstance.pointerEventsInstance.ajhPointerEventHandlers;
       
        if(selfReference.getPointerEventById(evt.pointerId) == null){
            selfReference.addPointerEvent(evt.pointerId);
        }
        else{
            
        }

        // update pointer from the evt id
        // = 
        let pointerToUpdate:AjhRayPointer 
        = 
        this._modelInstance
        .raycasterPointers.getRayPointerByID(evt.pointerId);

          // update raycaster from the evt id
        let raycasterToUpdate:AjhRayCaster 
        = 
        this._modelInstance
        .raycasters.getRayCasterByID(evt.pointerId);

        if(
            pointerToUpdate 
            != 
            null
        ){

        // console.log("UPDATING POINTER:" + evt.pointerId + ":" +  this._modelInstance.raycasterPointers.getRayPointerByID(evt.pointerId).id );
            pointerToUpdate.rayPointer.x 
            = 
            ( evt.clientX / window.innerWidth ) * 2 - 1;

            pointerToUpdate.rayPointer.y
            = 
            - ( evt.clientY / window.innerHeight ) * 2 - 1;

         //   console.log("UPDATING POINTER: x " +pointerToUpdate.rayPointer.x+" y: "+pointerToUpdate.rayPointer.y);
    
        } else {

            this._modelInstance.raycasterPointers.addRayPointer(
                evt.pointerId,
                ( evt.clientX / window.innerWidth ) * 2 - 1,
                - ( evt.clientY / window.innerHeight ) * 2 - 1
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
      
        this._modelInstance.raycasters.getRayCasterByID(evt.pointerId)
        .findInstrumentKeysFromRaycast();
     
    };

// ======================================================================== //
// UP:: AJH //
// ======================================================================== //
    
    private onPointerUpHandler(evt : any){

        if (evt.target.hasPointerCapture(evt.pointerId)) {
            evt.target.releasePointerCapture(evt.pointerId);
        }

        this._modelInstance.pointerDown = false;
     
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

            // //set coords
            // this._modelInstance.mouseCoordinates.x
            // =
            // evt.clientX;
            
            // this._modelInstance.mouseCoordinates.y
            // =
            // evt.clientY;
            
        try{

                this._modelInstance.musicalKeyEventEmitter.emit(
                    "onPointerUp", 
                    evt.pointerId,
                    this._modelInstance.selectedKeys.selectedKeys[evt.pointerId].bodyId,
                    this._modelInstance.selectedKeys.selectedKeys[evt.pointerId].bodyUUID,
                    evt
                )

                console.log("pointerup  >> id: " + evt.pointerId)

            }
            catch(e){

                console.log(e);

            }

        }
        else{

        }


    };

// ======================================================================== //
// CANCEL:: Pointer AJH //
// ======================================================================== //

    private onPointerCancelHandler(evt : PointerEvent){

        console.log("Pointer cancelled"+(evt as PointerEvent).pointerId);
        try{

            this._modelInstance.musicalKeyEventEmitter.emit(
                "onPointerCancel", 
                evt.pointerId,
                this._modelInstance.selectedKeys.selectedKeys[evt.pointerId].bodyId,
                this._modelInstance.selectedKeys.selectedKeys[evt.pointerId].bodyUUID,
            )

        console.log("pointercancel  >> id: " + evt.pointerId)

        }
        catch(e){

            console.log(e);

        }
    };

// ======================================================================== //
// OVER :: AJH //
// ======================================================================== //

    private onPointerOverHandler(evt : PointerEvent){

        console.log("Pointer Over"+(evt as PointerEvent).pointerId);
        try{

            this._modelInstance.musicalKeyEventEmitter.emit(
                "onPointerOver", 
                evt.pointerId,
                this._modelInstance.selectedKeys.selectedKeys[evt.pointerId].bodyId,
                this._modelInstance.selectedKeys.selectedKeys[evt.pointerId].bodyUUID,
                evt.pointerId,
            )

        console.log("pointerout  >> id: " + evt.pointerId)

        }
        catch(e){

            console.log(e);

        }
    };

    private onPointerOutHandler(evt : any){

       // this._modelInstance.pointerDown = false;

        console.log("Pointer out"+(evt as PointerEvent).pointerId);
        try{

            this._modelInstance.musicalKeyEventEmitter.emit(

                "onPointerOut",

                evt.pointerId,

                this._modelInstance.selectedKeys.
                selectedKeys[evt.pointerId].bodyId,

                this._modelInstance.selectedKeys
                .selectedKeys[evt.pointerId].bodyUUID,

            )

       console.log("pointerout  >> id: " + evt.pointerId)

    }
    catch(e){

        console.log(e);

    }

    };
    
    private onPointerEnterHandler(evt : PointerEvent){

        console.log("Pointer Enter"+(evt as PointerEvent).pointerId);
        
        try{

            this._modelInstance.musicalKeyEventEmitter.emit(
                "onPointerEnter", 
                evt.pointerId,
                this._modelInstance.selectedKeys.selectedKeys[evt.pointerId].bodyId,
                this._modelInstance.selectedKeys.selectedKeys[evt.pointerId].bodyUUID,
            )

        console.log("pointerleave  >> id: " + evt.pointerId)

        }
        catch(e){

            console.log(e);

        }
    };

    private onPointerLeaveHandler(evt : any){

        this._modelInstance.pointerDown = false;

        console.log("Pointer left"+(evt as PointerEvent).pointerId);
        try{

            this._modelInstance.musicalKeyEventEmitter.emit(
                "onPointerLeave", 
                evt.pointerId,
                this._modelInstance.selectedKeys.selectedKeys[evt.pointerId].bodyId,
                this._modelInstance.selectedKeys.selectedKeys[evt.pointerId].bodyUUID,
            )

        console.log("pointerleave  >> id: " + evt.pointerId)

        }
        catch(e){

            console.log(e);

        }
    };

    // ================================================================= //

    private onTouchEndHandler(evt : any){

        console.log("onTouchEndHandler  >> id: " + evt.id)
        try{

            this._modelInstance.musicalKeyEventEmitter.emit(
                "onTouchEnd", 
                evt.pointerId,
                this._modelInstance.selectedKeys.selectedKeys[evt.pointerId].bodyId,
                this._modelInstance.selectedKeys.selectedKeys[evt.pointerId].bodyUUID,
            )

            console.log("onTouchEnd  >> id: " + evt.id)

        }
        catch(e){
            
        }

    }



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
        ontouchendcaptureHandler: AjhHandlerObject


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
    lostpointercaptureHandler: AjhHandlerObject,
    ontouchendcaptureHandler: AjhHandlerObject

    handlersArray : Array<AjhHandlerObject>;


}