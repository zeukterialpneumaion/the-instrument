import { Vector3 } from "three";
import AjhKeys from "./AjhKeyBoard";

export default class AjhCircleKeys extends AjhKeys{

    // rows: number = 10;
    // cols: number = 10; 
    // keysType: AjhKeyboardTypes;

    // constructor( rows: number = 10, cols: number = 10, keysType: AjhKeyboardTypes){
    //     super(rows, cols, keysType);
    //     this.rows = rows;
    // }

    // override createKeys(){};
    // override positionKeys(){};
    //////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////

    degrees_to_radians(degrees) {

        return degrees * (Math.PI / 180); 

    }

//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////

        createPositionsOnCircle(
            amount: number,
            radius: number,
            centrePoint = new Vector3()
        ): any {
    
            centrePoint = new Vector3();
    
            // console.log("createPositionsOnCircle:amount::" + amount);
            let circlePositions: Array<Vector3> = [];
    
            let div = 360 / amount ;
    
            // var angle = 0,
            //     step = (2*Math.PI) / amount;
    
            for (var i = 0; i < amount; i++) {
    
                let aposition
                    = new Vector3();
    
                let angle = this.degrees_to_radians(div * i);
    
                var x =
                    centrePoint.x
                    + (radius * Math.cos(angle));
    
                var y =
                    centrePoint.y
                    + (radius * Math.sin(angle));
    
                aposition.x = (x * 1);
                aposition.y = (y * 1);
                aposition.z = 0;//(i * 2);
    
                circlePositions.push(aposition);
    
                // angle += step;
    
            }
    
            return circlePositions;
    
        }
    
        //////////////////////////////////////////////////////////////
    
}