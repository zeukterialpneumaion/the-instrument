import { BoxGeometry, Color, MathUtils, Mesh, MeshBasicMaterial, MeshMatcapMaterial, MeshStandardMaterial, Raycaster, Vector3 } from "three";
import AjhEventMemoryCache from "./AjhEventMemoryCache";

export default class AjhInteractiveItem {

   // =================================================== //

        body  : Mesh;

        EventMemoryCache : AjhEventMemoryCache 
        = 
        new AjhEventMemoryCache();

        name : string;

        private _intersected: boolean;
        public get intersected(): boolean {
            return this._intersected;
        }
        public set intersected(value: boolean) {
            this._intersected = value;
            this.changeIntersectedColour();
        }

        intersectPoint : Vector3;
        wasIntersected : boolean = false;

        distance : number;

   // =================================================== //
    /** 
     * constructor :: function 
     * */
    // =================================================== // 

        constructor(name: string) {
    
            this.name = name;

            this._intersected = false;
            this.intersectPoint = new Vector3();

            this.distance = 0;

            this.body = this.createBody();
    
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
            raycaster.intersectObjects([this.body], true);
        
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

                this.intersectPoint = intersects[0].point;

                console.log(

                    "intersected = true " 
                    + 
                    this.name
                    +
                    " x: "
                    +
                    this.intersectPoint.x
                    +
                    " z : "
                    +
                    this.intersectPoint.z

                );

                this.distance = distance;
        
            } else {

                if(this.intersected){
                    this.intersected = false;
                }
                 console.log(
                    "intersected = false" 
                    + 
                    this.name
                );
        
            }
        
        };

    // =================================================== //
    /** 
     * createBody :: function 
     * */
    // =================================================== //

        createBody(): Mesh {

            let mesh 
            = 
            new Mesh(
                this.cubeGeometry.clone(), 
                this.matcapMaterial.clone()
            );

            (mesh as Mesh).name 
            = 
            MathUtils.randInt(0, 0xffffff).toString();

            (mesh.material as MeshMatcapMaterial).color 
            = 
            new Color( + mesh.name );

            mesh.castShadow = true;
            
            mesh.position.y = 0.5;

            mesh.layers.enable( 3 );

            return mesh

        }

     // =================================================== //
    /** 
     * onPointerMoveListener :: function 
     * */
    // =================================================== //

        onPointerMoveListener( pointerEvt : any ){

            console.log(
                "PointerMoved:: event id ::" 
                +
                (pointerEvt as PointerEvent).pointerId 
            );

        };

   // =================================================== //

        sideLength = 1;

        cubeGeometry 
        = 
        new BoxGeometry(
            this.sideLength, 
            this.sideLength, 
            this.sideLength
        );

        cubeMaterial 
        = 
        new MeshStandardMaterial({
            color: "#f69f1f",
            metalness: 0.5,
            roughness: 0.7,
        });

        basicMaterial 
        = 
        new MeshBasicMaterial({
            color: "#f69f1f",
            //metalness: 0.5,
            // roughness: 0.7,
        });

        matcapMaterial 
        = 
        new MeshMatcapMaterial({
            color: "#f69f1f",
        });

   // =================================================== //
   
        setItemIsIntersected(
            isIntersected:boolean
        ) {

            this.intersected = isIntersected;

        }

   // =================================================== //

    changeIntersectedColour() {

        if( this.intersected != undefined ){
            
                
            (this.body.material as MeshMatcapMaterial).color 
            = 
            new Color( + this.name );

        }

       if(this.intersected || this.intersected != undefined ){

            (this.body.material as MeshMatcapMaterial).color 
            = 
            new Color( 
                + MathUtils.randInt(
                    0, 
                    0xffffff
                    ).toString() 
            );

       } else {

            (this.body.material as MeshMatcapMaterial).color 
            = 
            new Color( + this.name );

       }

    }

   // =================================================== //

}

