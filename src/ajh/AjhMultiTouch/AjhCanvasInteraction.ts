import { Vector2 } from "three";
import AjhModel from "../datamodels/AjhModel";
import AjhMultiTouchManager from "./AjhMultiTouchManager";

export default class AjhCanvasInteraction {


   

    ////////////////////////////////////////////////////////////////
    
        private _modelInstance: AjhModel;
  
    ////////////////////////////////////////////////////////////////
  
    // =================================================== //

        multitouchManager : AjhMultiTouchManager 
        = 
        new AjhMultiTouchManager();

    // =================================================== //
    /** 
     * onPointerMoveListener :: function 
     * */
    // =================================================== // 
    
        constructor (){

            this._modelInstance 
            = 
            AjhModel.Instance;

            this.addListeners();

        }

    // =================================================== //

    

    // =================================================== //
    /** 
     * onPointerMoveListener :: function 
     * */
    // =================================================== //

        updateMultiTouch() {

            // stats.update();


            // if (resizeRendererToDisplaySize(renderer)) {

            //     const canvas = renderer.domElement;
            //     camera.aspect = canvas.clientWidth / canvas.clientHeight;
            //     camera.updateProjectionMatrix();

            // }

            // cameraControls.update();

            if(
                this.multitouchManager
                .getRaycasterWithPointById(0)
                != 
                undefined
            ){

                if(
                    this.multitouchManager
                    .findCurrentlyIntersectedItems().length
                    > 0
                    
                ){
                    let intersectPoint 
                    =  
                    this.multitouchManager
                    .findCurrentlyIntersectedItems()[0].intersectPoint;

                    // circle.position.x = intersectPoint.x;
                    // circle.position.z = intersectPoint.z;

                }

            }


            // renderer.render(scene, camera);

            // requestAnimationFrame(animate);

        }

    // =================================================== //

    

    // =================================================== //
    /** 
     * onPointerMoveListener :: function 
     * */
    // =================================================== //

        private addListeners(){

            
            this._modelInstance.canvas.addEventListener
            (
                "pointermove", 
                this.onPointerMoveListener.bind(this) 
            );

            this._modelInstance.canvas.addEventListener
            (
                "pointerdown", 
                this.onPointerDownListener.bind(this)
            );

            this._modelInstance.canvas.addEventListener
            (
                "pointerup", 
                this.onPointerUpListener.bind(this)
            );

            // this._modelInstance.musicalKeyEventEmitter
            // .on(
            //     "touchedByRay",
            //     this.KeyHandlers
            //     .isRayTouchedListener.bind(this.KeyHandlers)
            // );

            // this._modelInstance.musicalKeyEventEmitter
            // .on(
            //     "onPointerUp",
            //     this.KeyHandlers
            //     .onPointerUpListener.bind(this.KeyHandlers)
            // );

            // this._modelInstance.musicalKeyEventEmitter
            // .on(
            //     "onPointerDown",
            //     this.KeyHandlers
            //     .onPointerDownListener.bind(this.KeyHandlers)
            // );

            // this._modelInstance.musicalKeyEventEmitter
            // .on(
            //     "onPointerLeave",
            //     this.KeyHandlers
            //     .onPointerLeaveListener.bind(this.KeyHandlers)
            // );

        }

    // =================================================== //



    // =================================================== //
    /** 
     * onPointerMoveListener :: function 
     * */
    // =================================================== //

        onPointerMoveListener( 
            pointerEvt : PointerEvent 
        ){

            let id =  (pointerEvt as PointerEvent).pointerId;
            
            let pX =  (pointerEvt as PointerEvent).clientX;
            let pY =  (pointerEvt as PointerEvent).clientY;

            let raycaster 
            =  
            this.multitouchManager
            .getRaycasterWithPointById(id);

            if(raycaster != null || raycaster != undefined ){

                raycaster.updatePointCoords(
                    new Vector2(pX,pY)
                );

                raycaster.updateRaycaster(this._modelInstance.camera);

                this.multitouchManager.checkAllItemsForIntersection();

            }

            let rX 
            = 
            this.multitouchManager
            .getRaycasterWithPointById(id)?.screenPoint.x;

            let rY 
            = 
            this.multitouchManager
            .getRaycasterWithPointById(id)?.screenPoint.y;

        

            let raypoint 
            = 
            this.multitouchManager
            .getRaycasterWithPointById( id )?.screenPoint;
            
            let numberOfCachedEvents 
            =  
            this.multitouchManager.EventMemoryCacheManager
            .EventMemoryCache.length;
            
            this.addLogging(
                "pointer move",
                id, // : number,
                pX, // : number,
                pY, // : number,
                rX, // : number,
                rY, // : number,
                numberOfCachedEvents,// : number
            )

        }

    // =================================================== //



    // =================================================== //
    /** 
    * onPointerDownListener :: function 
    * */
    // =================================================== //

        onPointerDownListener( 
            pointerEvt : PointerEvent 
        ){

            //touch events to behave like mouse,  
            // works for div but meshes are different... ::
            // if ( 
            //     pointerEvt
            //     .target?.hasPointerCapture(pointerEvt.pointerId)
            // ) {
            //     pointerEvt
            //     .target?.releasePointerCapture(pointerEvt.pointerId);
            // }


            this.multitouchManager.findCurrentlyIntersectedItems().forEach(
                (foundKey,index) => {
                        //foundKey.startNote();
                        //foundKey.changeIntersectedColour();
                }
            );

            let pointerid 
            = 
            (pointerEvt as PointerEvent).pointerId;

            console.log( 
                "PointerDown:: event id ::" 
                +
                pointerid 
            );

            this.multitouchManager.addRaycasterWithPoint(pointerid);
            
            this.multitouchManager.EventMemoryCacheManager
            .pushEventIntoCache(pointerEvt);

            let id =  (pointerEvt as PointerEvent).pointerId;
            let pX =  (pointerEvt as PointerEvent).clientX;
            let pY =  (pointerEvt as PointerEvent).clientY;

            let raycaster 
            =  
            this.multitouchManager
            .getRaycasterWithPointById(id);

            raycaster?.updatePointCoords(
                new Vector2(pX,pY)
            );

            raycaster?.updateRaycaster(this._modelInstance.camera);

            let rX 
            = 
            this.multitouchManager
            .getRaycasterWithPointById(id)?.screenPoint.x;

            let rY 
            = 
            this.multitouchManager
            .getRaycasterWithPointById(id)?.screenPoint.y;

            this.multitouchManager.checkAllItemsForIntersection();

            let raypoint 
            = 
            this.multitouchManager
            .getRaycasterWithPointById( id )?.screenPoint;
            
            let numberOfCachedEvents 
            =  
            this.multitouchManager.EventMemoryCacheManager
            .EventMemoryCache.length;

            this.addLogging(
                "pointer down",
                id, // : number,
                pX, // : number,
                pY, // : number,
                rX, // : number,
                rY, // : number,
                numberOfCachedEvents,// : number
            )

            //circle.visible = true;

        }

    // =================================================== //



    // =================================================== //
    /** 
    * onPointerUpListener :: function 
    * */
    // =================================================== // 

    onPointerUpListener( 
        pointerEvt : PointerEvent 
    ){

        let id =  (pointerEvt as PointerEvent).pointerId;
        let pX =  (pointerEvt as PointerEvent).clientX;
        let pY =  (pointerEvt as PointerEvent).clientY;




        this.multitouchManager.findCurrentlyIntersectedItems().forEach(
            (foundKey,index) => {
                    foundKey.stopNote();
            }
        );

        this.multitouchManager.getRaycasterWithPointById(pointerEvt.pointerId)

        this.multitouchManager.removeRaycasterWithPointById(id);
    // this.multitouchManager.re
        this.multitouchManager.EventMemoryCacheManager
        .removeEventFromCache(pointerEvt);

        let rX 
        = 
        this.multitouchManager
        .getRaycasterWithPointById(id)?.screenPoint.x;

        let rY 
        = 
        this.multitouchManager
        .getRaycasterWithPointById(id)?.screenPoint.y;

        this.multitouchManager.checkAllItemsForIntersection();

        let raypoint 
        = 
        this.multitouchManager
        .getRaycasterWithPointById( id )?.screenPoint;
        
        let numberOfCachedEvents 
        =  
        this.multitouchManager.EventMemoryCacheManager
        .EventMemoryCache.length;

        this.addLogging(
            "pointer up",
            id, // : number,
            pX, // : number,
            pY, // : number,
            rX, // : number,
            rY, // : number,
            numberOfCachedEvents,// : number
        )

    // circle.visible = false;

    }

    // =================================================== //



    // =================================================== //
    /** 
    * onPointerUpListener :: function 
    * */
    // =================================================== // 

        addLogging(
            eventType : string,
            id : number,
            pX : number,
            pY : number,
            rX : number | undefined,
            rY : number | undefined,
            numberOfCachedEvents : number
        ){

            //check for undefined field and set to 0
            if(rX == undefined){
                rX = 0;
            }
            
            if(rY == undefined){
                rY = 0;
            }

            console.log(

                eventType
                +
                " id: " 
                +
                id 
                +
                " CurrentlyIntersectedItems: "
                +
                this.multitouchManager.findCurrentlyIntersectedItems()

            );
            
            this._modelInstance.informationWindow.updateAllFields(

                // title
                eventType
                +
                " id:" 
                +
                id,

                // data
                " Pointer x: " 
                +  
                pX.toFixed(2) // raypoint?.x
                +
                ", y: " 
                +  
                pY.toFixed(2), //raypoint?.y,

                //status
                " Raycast x: " 
                +  
                rX?.toFixed(2) // raypoint?.x
                +
                ", y: " 
                +  
                rY?.toFixed(2), //raypoint?.y

                // content
                "numberOfCachedEvents : "
                + 
                numberOfCachedEvents,
                
                //info
                "info ajh.",

                // message
                this._modelInstance.currentKeyBoard.scaleType.name+ " message",
                
                //on
                " CurrentlySelectedItems: "
                +
                this.multitouchManager
                .findCurrentlyIntersectedItems().length,

                 //name
                 " Amount of Raycasters: "
                 +
                 this.multitouchManager
                 .raycastersWithPoints.length,
                
            );


        }
        
    // =================================================== //

}



