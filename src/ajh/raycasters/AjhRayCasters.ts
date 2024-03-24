// import AjhModel from "./AjhModel";
import AjhRayCaster from "./AjhRayCaster";

export default class AjhRayCasters {

   // private modelInstance:AjhModel;

    private _rayCasters: Array<AjhRayCaster> = new Array<AjhRayCaster>();
    public get rayCasters(): Array<AjhRayCaster> {
        return this._rayCasters;
    }
    public set rayCasters(value: Array<AjhRayCaster>) {
        this._rayCasters = value;
    }

    constructor(){

       // this.modelInstance = AjhModel.Instance;
    };

    getRayCasterByID(id) : AjhRayCaster | null {

        let foundRay = null;
        
        for (let index = 0; index < this.rayCasters.length; index++) {

            const element = this.rayCasters[index];
            if(element.id == id){

                foundRay = element;
              //  console.log( "found in RayCasters, id: " + element.id );
            }

        }
                    
         //   console.log( "TRYING to find in RayCasters, id: " + id + " RESULT: " + foundRay );

        return foundRay;
    }

    addRayCaster(id: number){

        this.rayCasters.push(new AjhRayCaster(id));
        
        console.log( "added 1 item to RayCasters, id: " + id );

    }

    
    removeRayCaster(id: number){

        let foundRayPosition = null;

        for (let index = 0; index < this.rayCasters.length; index++) {

            const element = this.rayCasters[index];

            if(element.id == id){

                foundRayPosition = index;

            }
                    
        }

        if(foundRayPosition != null){

            this.rayCasters.splice(foundRayPosition,1);
            console.log("removed 1 item from RayCasters")
        }

    }

    setAllRaycastersToCamera(){
        for (let index = 0; index < this.rayCasters.length; index++) {
            const element = this.rayCasters[index];
            element.setRaycasterToCamera();
        }
    }


}