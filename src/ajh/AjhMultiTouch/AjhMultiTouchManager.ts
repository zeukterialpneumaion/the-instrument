import { Camera, Mesh, Vector2 } from "three";
import AjhIntersectionInstance from "../keys/key/AjhIntersectionInstance";
import AjhIntersectionInstances from "../keys/key/AjhIntersectionInstances";
import AjhKey from "../keys/key/AjhKey";
import AjhEventMemoryCache from "./AjhEventMemoryCache";
import AjhRaycasterWithPoint from "./AjhRaycasterWithPoint";

export default class AjhMultiTouchManager {

  // ======================================================== //
  
    EventMemoryCacheManager : AjhEventMemoryCache
    = 
    new AjhEventMemoryCache();


    interactiveItems: Array<AjhKey> 
    =
    new Array<AjhKey>();


    raycastersWithPoints : Array<AjhRaycasterWithPoint>
    =
    new Array<AjhRaycasterWithPoint>();


  // ======================================================== //
  
    constructor(){
        
    }

  // ======================================================== //
  

  // ======================================================== //
  
    addRaycasterWithPoint( id : number ) {

        try {

            // add raycaster if does not exist
            if(this.getRaycasterWithPointById(id) == null ){

                this.raycastersWithPoints.push( 
                    new AjhRaycasterWithPoint(id)
                );

            }

        } 
        catch (e) {

            //  this.logEvents.enableLog(true);
            // this.logEvents.log("Error with cache handling", e);

        }

    }

  // ======================================================== //
  
    removeRaycasterWithPointById( id : number ) {

        try {

            // Remove this event from the target's cache

            const index = this.raycastersWithPoints.findIndex(

                (foundRayPoint) => foundRayPoint.id === id,

            );

            this.raycastersWithPoints.splice(index, 1);

        } 
        catch (e) {

          //  this.logEvents.enableLog(true);

           // this.logEvents.log("Error with cache handling", e);

        }

    }


  // ======================================================== //

    getRaycasterWithPointById( 
        itemId : any
    ) : AjhRaycasterWithPoint  | null {

        // Return the cache for this event's target element

        let foundRaycasterWithPoint = null;

        for (
            let index = 0; 
            index < this.raycastersWithPoints.length; 
            index++
        ) {

            const element = this.raycastersWithPoints[index];

            if( itemId == element.id ){

                foundRaycasterWithPoint =  element
            
            } 
            
        }

        if(foundRaycasterWithPoint == null){
            
        // this.logEvents.log("Error with cache handling", itemId);
        
        }

        return foundRaycasterWithPoint;

    }

  // ======================================================== //

  updateAllRayCasters(camera : Camera){

    this.raycastersWithPoints.forEach( 

        ( element ) => {
        
            let evt 
            = 
            this.EventMemoryCacheManager
            .getPointerEventById(element.id);
            
            element.updatePointCoords(

                new Vector2(
                    evt?.clientX,
                    evt?.clientY
                )

            );

            // console.log( 
            //     " updateAllRayCasters :: x:" 
            //     + 
            //     element.screenPoint.x
            //     +
            //     ", y:"
            //     +
            //     element.screenPoint.y
            //     +
            //     "." 
            // );
            
            element
            .updateRaycaster(
                camera,
                element.screenPoint
            );

        }

    );

  }

  // ======================================================== //
  
    // removeItemFromCurrentlyIntersectedByI()
    // : Array<AjhDisplayItem> {


    // }
  
  
  // ======================================================== //

    findCurrentlyIntersectedItems()
    : Array<AjhKey> {

        // Return the cache for this event's target element

        let foundIntersectedItems : Array<AjhKey> 
        = 
        new Array<AjhKey>();

        for (
            let index = 0; 
            index < this.interactiveItems.length; 
            index++
        ) {

            const element = this.interactiveItems[index];

            if( element.intersectedInstances.instances.length > 0 ){

                foundIntersectedItems.push( element );
            
            } 
            
        }

        if( foundIntersectedItems.length == 0 ){
            
            // console.log( 
            //     " No intersected items found from array of " 
            //     + 
            //     this.interactiveItems.length
            //     +
            //     " items" 
            // );

        // this.logEvents.log("Error with cache handling", itemId);
        
        } else {

            // console.log(

            //     " SUCCESS :: "
            //     +
            //     foundIntersectedItems.length  
            //     +
            //     " intersected items found"
                
            // );

        }

        return foundIntersectedItems;

    }

// ======================================================== //

    checkAllItemsForIntersection(){

        for (
            let index = 0; 
            index < this.raycastersWithPoints.length; 
            index++
        ) {

            const raycasterElement 
            = 
            this.raycastersWithPoints[index];
            
            this.interactiveItems.forEach(
    
                ( element ) => {

                //     console.log(
                //         "CHECKING INTERSECTIONS FOR RAY :: "
                //         +
                //         raycasterElement.id
                //     );
            
                    this.checkIfIntersectsWith( element,
                        raycasterElement
                    );
        
                }

            );

        }
        
    }


// ======================================================== //

    
 
    // =================================================== //
    /** 
     * checkIfIntersectsWith :: function 
     * */
    // =================================================== //  
  
    checkIfIntersectsWith(itemToCheck:AjhKey,
        raycasterWithPoint : AjhRaycasterWithPoint,
        //rayId : number
    ) : AjhIntersectionInstances {

        let raycaster = raycasterWithPoint.raycaster;

       // let isIntersected = false;
    
        const intersects 
        = 
        raycaster.intersectObjects(
            [itemToCheck.KeyState.View.Body as Mesh], 
            true
        );
    
        itemToCheck.wasIntersectedByRayId =  raycasterWithPoint.id;
       
        //this.intersectedRays[this.intersectedRays.length - 1];

        //this.intersected = false;
    
        if (intersects.length > 0) {
    
            let distance = intersects[0].distance;
        
            intersects.forEach(

                (i) => {

                    if (i.distance < distance) {

                        distance = i.distance;

                    }

                }

            );


           
               // this.startNote();
            //}
            

            itemToCheck.intersectedInstances.addIntersectionPoint(

                new AjhIntersectionInstance(
                    raycasterWithPoint.id,
                    intersects[0].point,
                    raycasterWithPoint.id
                )

            );

            console.log(

                "intersected = true " 
                + 
                itemToCheck.name
                +
                " x: "
                +
                itemToCheck.intersectedInstances.getIntersectionPointById(raycasterWithPoint.id).point.x
                +
                " z : "
                +
                itemToCheck.intersectedInstances.getIntersectionPointById(raycasterWithPoint.id).point.z

            );

            itemToCheck.distance = distance;
    
        } else {

            //if(this.intersectPoints.getIntersectionPointById(rayId) != null){

          
            
            itemToCheck.intersectedInstances
            .removeIntersectionPointById(

                itemToCheck.wasIntersectedByRayId

            );

                //this.stopNote();
            //}

            // console.log(
            //     "no longer intersected "
            //     + 
            //     itemToCheck.name
            //     +
            //     " by ray : "
            //     +
            //     raycasterWithPoint.id
            // );
    
        }

        itemToCheck.changeIntersectedColour();

        return itemToCheck.intersectedInstances
    
    };



}