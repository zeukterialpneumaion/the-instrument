
// =============================================================== //
/** 
 * InteractiveEvent :: class 
 * */
// =============================================================== //

import { Vector2 } from "three";

export class AjhInteractiveEvent {

    type: string;
    cancelBubble: boolean;
    originalEvent: Event | null;
  
    // Dummy default values
    coords: Vector2 = new Vector2(0, 0);
    distance: number = 0;
    intersected: boolean = false;
    id : number = 0;
  
    constructor(
        id: number, 
        type: string, 
        originalEvent: Event | null = null
    ) {
  
      this.cancelBubble = false;
      this.type = type;
      this.originalEvent = originalEvent;
      this.id = id;
  
    }
  
    stopPropagation() {
  
      this.cancelBubble = true;
  
    }
  
  }
  