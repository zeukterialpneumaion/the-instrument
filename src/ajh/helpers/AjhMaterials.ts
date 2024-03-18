import {
    AdditiveBlending,
    BackSide,
    Color,
    DoubleSide,
    MeshLambertMaterial,
    MeshLambertMaterialParameters,
    MeshMatcapMaterial,
    MeshPhongMaterial,
    MeshPhongMaterialParameters,
    MeshPhysicalMaterial,
    MeshPhysicalMaterialParameters,
    MeshToonMaterial,
    MeshToonMaterialParameters,
    ShaderMaterial,
    UniformsUtils
} from "three";

  
export default class AjhMaterials {

    private _avatarMaterial: MeshMatcapMaterial 
    = new MeshMatcapMaterial(
        {
            flatShading: true,
            color: 0xff9800,
        //    emissive: 0xff9800,
            polygonOffset: true,
            polygonOffsetUnits: 1,
            polygonOffsetFactor: 1
        }
    );
    public get avatarMaterial(): MeshMatcapMaterial {
        return this._avatarMaterial;
    }
    public set avatarMaterial(value: MeshMatcapMaterial) {
        this._avatarMaterial = value;
    }

    private _glowMaterial: ShaderMaterial;
    public get glowMaterial(): ShaderMaterial {
        return this._glowMaterial;
    }
    public set glowMaterial(value: ShaderMaterial) {
        this._glowMaterial = value;
    }

    private _lambertMaterial
    : MeshLambertMaterial;
    private _lambertParams
    : MeshLambertMaterialParameters
                = new Object();
                
    private _phongMaterial
    : MeshPhongMaterial;
    private _phongParams
    : MeshPhongMaterialParameters
                = new Object();
   
    private _physicalMaterial
    : MeshPhysicalMaterial;
    private _physicalMaterialParams
    : MeshPhysicalMaterialParameters
    = new Object();
    
    private _toonMaterial: MeshToonMaterial;
    private _toonMaterialParameters: MeshToonMaterialParameters
    = new Object();
  
    /////////////////////////////////////////////////////////////////

    constructor() {
        
        this.lambertParams.color = new Color(0xFFFF00);
        this._lambertMaterial 
            = new MeshLambertMaterial(this.lambertParams);
        this._lambertMaterial .needsUpdate = true;

       // this._phongParams = new PhongParams();
        this._phongParams.color = new Color(0xFFFF00);
        this._phongMaterial 
            = new MeshPhongMaterial(this.phongParams);
        this._phongMaterial .needsUpdate = true;
        
        this._physicalMaterialParams.color = new Color(0xFFFF00);
        this._physicalMaterial 
            = new MeshPhysicalMaterial(
                this.physicalMaterialParams
            );
        this._physicalMaterial .needsUpdate = true;

        this._toonMaterialParameters.color = new Color(0xFFFF00);
        this._toonMaterialParameters.side = DoubleSide;
        this._toonMaterial 
            = new MeshToonMaterial();
        this._toonMaterial.needsUpdate = true;

                
        var vertexShader = [
            'varying vec3 vNormal;',
            'void main() {',
            'vNormal = normalize( normalMatrix * normal );',
            'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
            '}'
        ].join('\n')
        
        var fragmentShader = [
            'varying vec3 vNormal;',
            'void main() {',
            'float intensity = pow( 0.8 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 12.0 );',
            'gl_FragColor = vec4( 1, 1.0, 1.0, 1.0 ) * intensity;',
            '}'
        ].join('\n')
        
        var uniforms = UniformsUtils.clone({});
        this.glowMaterial = new ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            side: BackSide,
            blending: AdditiveBlending,
            transparent: true
        });

        this.enterButtonMaterial = new MeshMatcapMaterial({
            color: '#C08715',
        //    metalness: 0.5,
        //    roughness: 0.7,
            })

        this.backgroundMaterial
        = 
        new MeshMatcapMaterial(
            {
                color: '#5CF61F',
            //    metalness: 0.5,
            //    roughness: 0.7,
            }
        );

        
    }

    /////////////////////////////////////////////////////////////////

    private _backgroundMaterial: MeshMatcapMaterial;
    public get backgroundMaterial(): MeshMatcapMaterial {
        return this._backgroundMaterial;
    }
    public set backgroundMaterial(value: MeshMatcapMaterial) {
        this._backgroundMaterial = value;
    }

    private _enterButtonMaterial: MeshMatcapMaterial;
    public get enterButtonMaterial(): MeshMatcapMaterial {
        return this._enterButtonMaterial;
    }
    public set enterButtonMaterial(value: MeshMatcapMaterial) {
        this._enterButtonMaterial = value;
    }

    public get lambertMaterial()
    : MeshLambertMaterial {
        return this._lambertMaterial;
    }

    public get phongMaterial()
    : MeshPhongMaterial {
        return this._phongMaterial;
    }

    public get physicalMaterial()
    : MeshPhysicalMaterial {
        return this._physicalMaterial;
    }

    public get lambertParams()
    : MeshLambertMaterialParameters {
        return this._lambertParams;
    }

    public get phongParams()
    : MeshPhongMaterialParameters {
        return this._phongParams;
    }

    public get physicalMaterialParams()
    : MeshPhysicalMaterialParameters {
        return this._physicalMaterialParams;
    }

    public get toonMaterial(): MeshToonMaterial {
        return this._toonMaterial;
    }

    public get toonMaterialParameters()
    : MeshToonMaterialParameters {
        return this._toonMaterialParameters;
    }

    /////////////////////////////////////////////////////////////////

    public set lambertMaterial(
        value: MeshLambertMaterial
    ) {
        this._lambertMaterial = value;
    }

    public set phongMaterial(
        value: MeshPhongMaterial
    ) {
        this._phongMaterial = value;
    }

    public set physicalMaterial(
        value: MeshPhysicalMaterial
    ) {
        this._physicalMaterial = value;
    }

    public set lambertParams(
        value: MeshLambertMaterialParameters
    ) {
        this._lambertParams = value;
    }
    
    public set phongParams(
        value: MeshPhongMaterialParameters
    ) {
        this._phongParams = value;
    }
    
    public set physicalMaterialParams(
        value: MeshPhysicalMaterialParameters
    ) {
        this._physicalMaterialParams = value;
    }
    
    public set toonMaterial(
        value: MeshToonMaterial
    ) {
        this._toonMaterial = value;
    }

    public set toonMaterialParameters(
        value: MeshToonMaterialParameters
    ) {
        this._toonMaterialParameters = value;
    }
    
    ///////////////////////////////////////////////////////////

}

///////////////////////////////////////////////////////////////