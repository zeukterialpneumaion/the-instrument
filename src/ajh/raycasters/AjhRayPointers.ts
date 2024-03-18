import AjhRayPointer from "./AjhRayPointer";

export default class AjhRayPointers {

    private _raypointers: Array<AjhRayPointer> = new Array<AjhRayPointer>();
    public get raypointers(): Array<AjhRayPointer> {
        return this._raypointers;
    }
    public set raypointers(value: Array<AjhRayPointer>) {
        this._raypointers = value;
    }

    constructor(){};

    getRayPointerByID(id) : AjhRayPointer | null {

        let foundRay = null;
        //console.log( "getting rayPointer: " + id + " : " + this.raypointers.length );
          
        
        for (let index = 0; index < this.raypointers.length; index++) {

            const element = this.raypointers[index];


          //  console.log("rayPointer:id"+element.id)

            if(element.id == id){

                foundRay = element;
               // console.log( "found in raypointers, id: " + element.id + ", pos: " + element.rayPointer.x + "," + element.rayPointer.y );
            }
                    
        }
       // console.log( "rayPointer: " +foundRay );
         
        return foundRay;
    }

    addRayPointer(id: number, x: number, y: number){

        this.raypointers.push(new AjhRayPointer(id,x,y));
        
        console.log( "added 1 item to raypointers, id: " + id + ", pos: " + x + "," + y );

    }

    
    removeRayPointer(id: number){

        let foundRayPosition = null;

        for (let index = 0; index < this.raypointers.length; index++) {

            const element = this.raypointers[index];

            if(element.id == id){

                foundRayPosition = index;

            }
                    
        }

        if(foundRayPosition != null){

            this.raypointers.splice(foundRayPosition,1);
            console.log("removed 1 item from raypointers")
        }

    }


}