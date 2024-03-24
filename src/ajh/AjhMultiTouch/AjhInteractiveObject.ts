
// =============================================================== //
/** 
 * InteractiveObject :: class 
 * */
// =============================================================== //

import { Mesh, Object3D, Raycaster } from "three";

export default class AjhInteractiveObject {

    target: Object3D;       
    name: string;
    intersected: boolean;
    wasIntersected: boolean = false;
    distance: number;
  
    constructor(target: Mesh, name: string) {
  
      this.target = target;
      this.name = name;
      this.intersected = false;
      this.distance = 0;
  
    }
    
    // =================================================== //
    /** 
     * checkIntersection :: function 
     * */
    // =================================================== //   

    checkIfIntersectsWith(
        raycaster : Raycaster
      ){
    
        const intersects 
        = 
        raycaster.intersectObjects([this.target], true);
    
        this.wasIntersected = this.intersected;
    
        if (intersects.length > 0) {
    
          let distance = intersects[0].distance;
    
          intersects.forEach(
              (i) => {
              if (i.distance < distance) {
                distance = i.distance;
              }
            }
          );
    
          this.intersected = true;
          this.distance = distance;
    
        } else {
    
            this.intersected = false;
    
        }
    
      };

    }

// =============================================================== //
// =============================================================== //