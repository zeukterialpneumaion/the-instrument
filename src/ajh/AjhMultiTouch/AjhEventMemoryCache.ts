import AjhLog from "../AjhLogging/AjhLog";

export default class AjhEventMemoryCache {

    // ================================================================== //
    
        // an array of the object to be checked for event interaions
        // containing ::
        // an array of memory events registered by id
        EventMemoryCache : Array<PointerEvent> = new Array<PointerEvent>();

        logEvents : AjhLog = new AjhLog();


    // ================================================================== //
    
        constructor(){

        }

    // ================================================================== //
    
        pushEventIntoCache(ev : PointerEvent) {

            // Save this event in the target's cache
            if(this.getPointerEventById(ev.pointerId) == null){
                 this.EventMemoryCache.push(ev);
            }
           
        
        }

    // ================================================================== //
    
        removeEventFromCache(ev : PointerEvent) {

            try {

                // Remove this event from the target's cache

                const index = this.EventMemoryCache.findIndex(

                    (cachedEv) => cachedEv.pointerId === ev.pointerId,

                );

                this.EventMemoryCache.splice(index, 1);

            } 
            catch (e) {

                this.logEvents.enableLog(true);

                this.logEvents.log("Error with cache handling:: remove event", e);

            }

        }

    // ================================================================== //
    
        getPointerEventById( 
            itemId : any
        ): PointerEvent  | null {

        // Return the cache for this event's target element
    
            let foundEventMemoryCache = null;
        
            for (
                let index = 0; 
                index < this.EventMemoryCache.length; 
                index++
            ) {
        
                const element = this.EventMemoryCache[index];
        
                if( itemId == element.pointerId ){
        
                    foundEventMemoryCache =  element
                
                } 
                
            }
        
            if(foundEventMemoryCache == null){
                
                this.logEvents.log("cache handling :: found event == null", itemId);
            }
        
            return foundEventMemoryCache;
        
        }

    // ================================================================== //



}