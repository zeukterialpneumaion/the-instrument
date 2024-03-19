import {
    BoxGeometry,
    BufferGeometry,
    OctahedronGeometry,
    SphereGeometry,
    TorusGeometry,
} from "three";


import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';


export default class AjhGeometries {

    ///////////////////////////////////////////////////////////

    private _avatarGeometry: BufferGeometry; 
    private _boxGeometry: BoxGeometry; 
    private _sphereGeometry: SphereGeometry;
    private _geometriesArray: Array<BufferGeometry>;
    private _torusGeometry: TorusGeometry;
    private _bijaGeometry: SphereGeometry;
    
    private _cubeGeometry: BoxGeometry;
    public get cubeGeometry(): BoxGeometry {
        return this._cubeGeometry;
    }
    public set cubeGeometry(value: BoxGeometry) {
        this._cubeGeometry = value;
    }

    private _keyGeometry: RoundedBoxGeometry;
    public get keyGeometry(): RoundedBoxGeometry {
        return this._keyGeometry;
    }
    public set keyGeometry(value: RoundedBoxGeometry) {
        this._keyGeometry = value;
    }

    private _roundedCubeGeometry: RoundedBoxGeometry;
    public get roundedCubeGeometry(): RoundedBoxGeometry {
        return this._roundedCubeGeometry;
    }
    public set roundedCubeGeometry(value: RoundedBoxGeometry) {
        this._roundedCubeGeometry = value;
    }


    private _octalSphereGeometry: SphereGeometry;
    public get octalSphereGeometry(): SphereGeometry {
        return this._octalSphereGeometry;
    }
    public set octalSphereGeometry(value: SphereGeometry) {
        this._octalSphereGeometry = value;
    }

    private _smoothSphereGeometry: SphereGeometry;
    public get smoothSphereGeometry(): SphereGeometry {
        return this._smoothSphereGeometry;
    }
    public set smoothSphereGeometry(value: SphereGeometry) {
        this._smoothSphereGeometry = value;
    }
    
   
    ///////////////////////////////////////////////////////////

    constructor() {

        this._roundedCubeGeometry
        =
        new RoundedBoxGeometry(
            1, 
            1, 
            1,
            7,
            0.2
        );

        this._keyGeometry
        =
        new RoundedBoxGeometry(
            1, 
            1, 
            1,
            7,
            0.82
        );

        this.cubeGeometry 
        = 
        new BoxGeometry(
           1,
           1,
           1// sideLength*36
        );

        this._boxGeometry 
        =  
        new BoxGeometry(
            1,
            1,
            1,
            5,
            5,
            5
        );

        this._sphereGeometry 
        =  
        new SphereGeometry(
            1
        );

        this._octalSphereGeometry 
        =  
        new SphereGeometry(
            1,
            8,
            8
        );

        this._smoothSphereGeometry 
        =  
        new SphereGeometry(
            1,
            32,
            32
        );

        this._avatarGeometry 
        =  
        new OctahedronGeometry(
            0.3,
            1
        );

        this._geometriesArray 
        = new Array();

        this._bijaGeometry 
        = 
        new SphereGeometry(
            0.12,
            32,
            16
        )

    }
   
    ///////////////////////////////////////////////////////////

    public get boxGeometry(): BoxGeometry {
        return this._boxGeometry;
    }

    public get sphereGeometry(): SphereGeometry {
        return this._sphereGeometry;
    }

    public get torusGeometry(): TorusGeometry {
        return this._torusGeometry;
    }

    public get geometriesArray(): Array<BufferGeometry> {
        return this._geometriesArray;
    }

    public get bijaGeometry(): SphereGeometry {
        return this._bijaGeometry;
    }

    public get avatarGeometry(): BufferGeometry {
        return this._avatarGeometry;
    }

    ///////////////////////////////////////////////////////////
 
    public set avatarGeometry(value: BufferGeometry) {
        this._avatarGeometry = value;
    }

    public set boxGeometry(value: BoxGeometry) {
        this._boxGeometry = value;
    }
    
    public set sphereGeometry(value: SphereGeometry) {
        this._sphereGeometry = value;
    }
    
    public set torusGeometry(value: TorusGeometry) {
        this._torusGeometry = value;
    }

    public set geometriesArray(value: Array<BufferGeometry>) {
        this._geometriesArray = value;
    }
    
    public set bijaGeometry(value: SphereGeometry) {
        this._bijaGeometry = value;
    }

    ///////////////////////////////////////////////////////////
    
}