import AjhIntersectionInstance from "./AjhIntersectionInstance";

export default class AjhIntersectionInstances {


    instances : Array<AjhIntersectionInstance>;


    constructor(){

        this.instances 
        = 
        new Array<AjhIntersectionInstance>();

    }

    
    addIntersectionPoint(
        newIntersectionPoint  : AjhIntersectionInstance
    ){

        
        let pointFound = null;
        
        for (
            let index = 0; 
            index < this.instances.length; 
            index++
        ) {
            
            const element = this.instances[index];
            
            if( element.id == newIntersectionPoint.id){
            
                element.point = newIntersectionPoint.point;
            
            }
            
        }

        if( pointFound != null ){

            // console.log(

            //     "Intersect Point "
            //     + 
            //     pointFound.id 
            //     +
            //     " Updated in Key " 
            //     + 
            //     this.KeyState.Id 

            // );

        }
        else {

            this.instances.push(newIntersectionPoint);

            // console.log(

            //     "Intersection Point" 
            //     + 
            //     newIntersectionPoint.id 
            //     + 
            //     " ADDED TO KEY "
            //     + 
            //     this.KeyState.Id

            // );

        }

    }

    removeIntersectionPointById(
        id : number
    ){

        
        let pointFound = null;
        
        for (
            let index = 0; 
            index < this.instances.length; 
            index++
        ) {
            
            const element = this.instances[index];
            
            if( element.id == id){
            
                pointFound = element; 

                this.instances
                    .splice(id,1);
            
            }
            
        }

        if( pointFound != null ){

        

            // console.log(

            //     "Intersect Point "
            //     + 
            //     pointFound.id 
            //     +
            //     " Updated in Key " 
            //     + 
            //     this.KeyState.Id 

            // );

        }
        else {

           // this.intersectionpoints.push(newIntersectionPoint);

            // console.log(

            //     "Intersection Point" 
            //     + 
            //     newIntersectionPoint.id 
            //     + 
            //     " ADDED TO KEY "
            //     + 
            //     this.KeyState.Id

            // );

        }

    }


    getIntersectionPointById(
        id : number
    ) : AjhIntersectionInstance | null {

        
        let foundPoint = null;
        
        for (
            let index = 0; 
            index < this.instances.length; 
            index++
        ) {
            
            const element = this.instances[index];
            
            if( element.id == id){
            
                foundPoint = element;
            
            }
            
        }

        if( foundPoint != null ){

            // console.log(

            //     "Intersect Point "
            //     + 
            //     pointFound.id 
            //     +
            //     " Updated in Key " 
            //     + 
            //     this.KeyState.Id 

            // );

        }
        else {

           // this.intersectionpoints.push(newIntersectionPoint);

            // console.log(

            //     "Intersection Point" 
            //     + 
            //     newIntersectionPoint.id 
            //     + 
            //     " ADDED TO KEY "
            //     + 
            //     this.KeyState.Id

            // );

        }

        return foundPoint;

    }




}