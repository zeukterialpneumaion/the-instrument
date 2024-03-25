
import {
    AmbientLight,
    AxesHelper,
    Box3,
    Clock,
    DirectionalLight,
    Light,
    LoadingManager,
    Mesh,
    MeshStandardMaterial,
    PCFSoftShadowMap,
    PerspectiveCamera,
    PointLight,
    PointLightHelper,
    Scene,
    Vector3,
    WebGLRenderer
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';



import { toggleFullScreen } from './AjhFullscreen';

import Stats from 'three/examples/jsm/libs/stats.module';

import '../../assets/css/style.css';



import { DragControls } from "three/examples/jsm/controls/DragControls";


import AjhCanvasInteraction from "../AjhMultiTouch/AjhCanvasInteraction";
import AjhModel from "../datamodels/AjhModel";
import AjhInformationWindow from "../displays/AjhInformationWindow";
import AjhInitialScreen from "../displays/AjhInitialScreen";
import AjhKeys from "../keys/keyboards/AjhKeyBoard";
import AjhFullScreenObject from "./AjhFullScreenObject";

// ============================================================ //

export default class AjhThreeInit{

    // instance variables //

    clock : Clock
    gu :any
   
    composer : EffectComposer
   
    INTERSECTED

    private _modelInstance: AjhModel = AjhModel.Instance;
    public get modelInstance(): AjhModel {
        return this._modelInstance;
    }
    public set modelInstance(value: AjhModel) {
        this._modelInstance = value;
    }

    width = window.innerWidth
    height = window.innerHeight


    pointLight : PointLight;
    ambientLight : AmbientLight;
    light : Light;
    directionalLight: DirectionalLight;

    //meshes
    ajhkeys : AjhKeys;
    fullscreenobject : AjhFullScreenObject;
    cube : Mesh;

    // helpers
    axesHelper : AxesHelper;
    pointLightHelper : PointLightHelper;

    animation = { enabled: true, play: true };

    stats: Stats;

// ============================================================ //
// ===== INITIALIZE ===== //
// ============================================================ //

    init(where){

       // localStorage.removeItem('guiState');

            this.addScene();

            this.addCamera();
            
            
            
            this.addRayCaster();
      
            this.addStatsAndClock();

            this.addLoadingManager();

            this.addLights();
           
           // this.addHelpers();

            this.addCanvasInteraction();
            
            this.addObjects();
            
            
            this.addControls();
            
            // this.addGui(); 

            // this._modelInstance.pointerEventsInstance 
            // = new AjhPointerEvents();
           
            // this.modelInstance.pointerEventsInstance
            //     .addAllListeners( this.modelInstance.canvas );

            this.addFullScreenAndResizeListeners();
          
            this.animate();
    
    }

// ============================================================ //
// ========= 📈 STATS & CLOCK ========== //
// ============================================================ //
  
    addStatsAndClock(){

            this.modelInstance.clock = new Clock();
            this.modelInstance.Stats = new Stats();

            this.modelInstance.Stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
            this.modelInstance.Stats.dom.style.left = 'auto';
            this.modelInstance.Stats.dom.style.right = '0';
            this.modelInstance.Stats.dom.style.top = 'auto';
            this.modelInstance.Stats.dom.style.bottom = '0';
           // document.body.appendChild(this.modelInstance.Stats.dom)
           // this.modelInstance.Stats.dom.
        

    }

// ============================================================ //
// ========= 📈 addScene ========== //
// ============================================================ //
  
    addScene(){

        this.modelInstance = AjhModel.Instance;
        //modelInstance.toneInstance = TONE;
  
        let canvas 
        = this.modelInstance.canvas;
  
        this.modelInstance.renderer 
        = 
        new WebGLRenderer(
          {
            canvas, 
            antialias: true, 
            alpha: true 
          }
        );
  
        (this.modelInstance.renderer as WebGLRenderer)
          .setPixelRatio(
            Math.min(
              window.devicePixelRatio, 
              2
            )
          );
  
        (this.modelInstance.renderer as WebGLRenderer)
          .shadowMap.enabled = true;
  
        (this.modelInstance.renderer as WebGLRenderer)
          .shadowMap.type = PCFSoftShadowMap;
  
        this.modelInstance.scene = new Scene();

    }

// ============================================================ //
     // ===== 🎥 ADD CAMERA ===== //
// ============================================================ //

     addCamera(){

        this.modelInstance.camera 
        = 
        new PerspectiveCamera(
          50, 
          this.modelInstance.canvas.clientWidth 
          / 
          this.modelInstance.canvas.clientHeight, 
          0.1, 
          10000
        );
  
        this.modelInstance.camera.position.set(0, 8, 0);
    
    }

// ============================================================ //
// ===== 🎥 ADD CANVAS INTERACTION ===== //
// ============================================================ //

    addCanvasInteraction(){

        this.modelInstance.canvasInteraction = new AjhCanvasInteraction();
       
    }

// ============================================================ //
// ========= addScene_Camera_Renderer_RayCaster ========== //
// ============================================================ //
                                                               
    addRayCaster(){
    
       //this.modelInstance.raycaster = new Raycaster();

    }

// ============================================================ //
// ========= addLights ========== //
// ============================================================ //
                                                               
    addLights(){

        // this.light = new DirectionalLight( 0xffffff, 4 );
        // this.light.position.set(0, -1, -1);
    
        // this.modelInstance.scene.add(
        //     this.light, 
        //     new AmbientLight(0xffffff, 0.5)
        // );
    
       // this.modelInstance.scene.add( new AmbientLight( 0xffeeee,0.3 ) );

            this.modelInstance.ambientLight = new AmbientLight('white', 1.8 );

            this.modelInstance.pointLights[0] = new PointLight('white', 40, 100);
            this.modelInstance.pointLights[0] .position.set(-2, 6, 2);
            this.modelInstance.pointLights[0] .castShadow = true;
            this.modelInstance.pointLights[0] .shadow.radius = 4;
            this.modelInstance.pointLights[0] .shadow.camera.near = 0.5;
            this.modelInstance.pointLights[0] .shadow.camera.far = 4000;
            this.modelInstance.pointLights[0] .shadow.mapSize.width = 2048;
            this.modelInstance.pointLights[0] .shadow.mapSize.height = 2048;

     
      
            this.modelInstance.scene.add(this.modelInstance.ambientLight);
      
            this.modelInstance.scene.add(this.modelInstance.pointLights[0]);

           // this.modelInstance.pointLight.position.set(-2, 3, 2);

    }

// ============================================================ //
// ========= addListeners ========== //
// ============================================================ //
                                                               
    addFullScreenAndResizeListeners(){

        window.addEventListener(

            "resize", 
            this.onWindowResizeHandler.bind(this)

        );

        this.addFullScreenToggleOnDoubleClick();

    }

// ============================================================ //
// ========= ANIMATE ========== //
// ============================================================ //                                                                                                

    public animate() {

    requestAnimationFrame( this.animate.bind(this) );
    
        this.modelInstance.Stats.update();

        //TWEEN.update();;

        if(!this.modelInstance.initialScreen.enterButtonClicked){

            this.modelInstance.initialScreen.raycastingEnterButton();

        }
       

       // this.modelInstance.raycasters.setAllRaycastersToCamera();
        // .setFromCamera( 
        //     this.modelInstance.pointer, 
        //     this.modelInstance.camera 
        // );

    
        if (
            this.resizeRendererToDisplaySize(

                this.modelInstance.renderer as WebGLRenderer

            )
        ) {
    
            // const canvas = this.modelInstance.renderer.domElement;
            
            (this.modelInstance.camera as PerspectiveCamera).aspect 
            = 
            this.modelInstance.canvas.clientWidth 
            / 
            this.modelInstance.canvas.clientHeight;
            
            (this.modelInstance.camera as PerspectiveCamera)
            .updateProjectionMatrix();
    
        }
       // console.log("raycasters length: "+ this.modelInstance.raycasters.rayCasters.length); 
        try {

          //  this.modelInstance.raycasters.rayCasters[0].setRaycasterToCamera();
           // this.modelInstance.pointLights[0].position.x 
           // = 11; //this.modelInstance.raycasterPointers[0].x*100 ;  
          // this.modelInstance.pointLights[0].position.z 
           // = -this.modelInstance.raycasterPointers[0].y*100 ;    
            

        } catch (error) {
            
        }
      //  console.log("position of pointLights[0] : " +  this.modelInstance.pointLights[0].position.z )
           
      this.modelInstance.initialScreen.rotateButton();
    
        this.modelInstance.cameraOrbitControls.update();

        // ============================================ //
    

        if(
            this.modelInstance.canvasInteraction.multitouchManager
            .getRaycasterWithPointById(0)
            != 
            undefined
        ){

            if(
                this.modelInstance.canvasInteraction.multitouchManager
                .findCurrentlyIntersectedItems().length
                > 0
                
            ){
                let intersectPoint 
                =  
                this.modelInstance.canvasInteraction.multitouchManager
                .findCurrentlyIntersectedItems()[0].intersectedInstances.instances[0].point;

            }

        }

     
        // ============================================ //
       

        this.modelInstance.renderer.render(

            this.modelInstance.scene, 
            this.modelInstance.camera

        );
    
    }

// ============================================================ //

// ============================================================ //
// ===== renderLoop ===== //
// ============================================================ //

    // startRenderLoop(){
                
    //     // start the loop
    //             (this.modelInstance.renderer as WebGLRenderer)
    //             .setAnimationLoop(

    //                 () => {
                    
    //                     this.renderLoop();

    //                 }

    //             );
                
    // }

    // renderLoop() {

    //     let t = this.clock.getElapsedTime();
    //     this.gu.time.value = t;

    //    // TWEEN.update();

    //     this.modelInstance.cameraOrbitControls.update();

    //     this.modelInstance.raycasters.setAllRaycastersToCamera();
          
        
	//    // this.renderComposition();

    //     this.modelInstance.Stats.update();
  
    //     //TWEEN.update();;
      
    //     if ( this.animation.enabled && this.animation.play) {

    //         // animations.rotate( this.cube, this.clock, Math.PI / 3);
    //         // animations.bounce( this.cube, this.clock, 1, 0.5, 0.5);

    //     }
      
    //     if (

    //             this.resizeRendererToDisplaySize(
    //                 this.modelInstance.renderer as WebGLRenderer
    //             )

    //     ) {
      
    //         //const canvas = this.modelInstance.renderer.domElement;

    //         (this.modelInstance.camera as PerspectiveCamera).aspect 
    //         =
    //         this.modelInstance.canvas.clientWidth / this.modelInstance.canvas.clientHeight;

    //          (this.modelInstance.camera as PerspectiveCamera).updateProjectionMatrix();
      
    //     }
      
    //     //cameraControls.update()
      
    //     this.modelInstance.renderer.render(
    //         this.modelInstance.scene, 
    //         this.modelInstance.camera
    //     );

    // };

// ============================================================ //

// ============================================================ //
// ===== onWindowResizeHandler ===== //
// ============================================================ //

    onWindowResizeHandler(event) {

        console.log(

            "WINDOW RESIZE::" + event 

        );

        const width = window.innerWidth;
        const height = window.innerHeight;

        this.modelInstance.renderer.setSize( width, height );

        this.modelInstance.initialScreen.setInformationWindowPosition();
        this.modelInstance.initialScreen.fullscreenobject.resizeToScreenSize();
        this.modelInstance.fullScreenObject.resizeToScreenSize();
        this.modelInstance.currentKeyBoard.changeKeyWidthsAndLengthsToFitScreenSize();
    
       

        (this.modelInstance.camera as PerspectiveCamera)
        .aspect 
        = width / height;

        (this.modelInstance.camera as PerspectiveCamera)
        .updateProjectionMatrix();

          // this.modelInstance.camera.lookAt(new Vector3(0,-4,0));

    }

// ============================================================ //


// ============================================================ //
// ===== ON POINTER MOVE ===== //
// ============================================================ //

// onPointerMove( event ) {

//     this.modelInstance.mouseCoordinates.x 
//     =
//     ( event.clientX / window.innerWidth ) * 2 - 1;

//     this.modelInstance.mouseCoordinates.y 
//     =
//     - ( event.clientY / window.innerHeight ) * 2 + 1;
//     //    = 
//     this.modelInstance.pointer.x 
//     = ( event.clientX / window.innerWidth ) * 2 - 1;

//     this.modelInstance.pointer.y 
//     = - ( event.clientY / window.innerHeight ) * 2 + 1;

    

// }

// ============================================================ //



// ============================================================ //
// ===== RESIZE TO DISPLAY SIZE ===== //
// ============================================================ //

    resizeRendererToDisplaySize(renderer) {

        const canvas = renderer.domElement;

        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        const needResize 
        = 
        canvas.width !== width 
        || 
        canvas.height !== height;


        if (needResize) {

        renderer.setSize(
            width, 
            height, 
            false
        );

        }
        return needResize;
        
    }

// ============================================================ //

// ============================================================ //
// ===== RENDER COMPOSITION ===== //
// ============================================================ //
    
    // renderComposition() {

    //     if (
    //         this.resizeRendererToDisplaySize(
    //             this.modelInstance.renderer
    //         )
    //     ) {
            
    //         const canvas = this.modelInstance.renderer.domElement;

    //         (this.modelInstance.camera as PerspectiveCamera).aspect 
    //         = 
    //         canvas.clientWidth / canvas.clientHeight;

    //         (this.modelInstance.camera as PerspectiveCamera)
    //         .updateProjectionMatrix();
            
    //     }

    //     const timer = performance.now();
            
    //    // this.findInstrumentKeysFromRaycastFromMouseCoords();
        
    //     this.modelInstance.composer.render();

    // }

// ============================================================ //


// ============================================================ //    
// ===== 👨🏻‍💼 LOADING MANAGER ===== //
// ============================================================ //    

    addLoadingManager(){

        this.modelInstance.loadingManager = new LoadingManager()

        this.modelInstance.loadingManager.onStart = () => {
          console.log('loading started')
        }

        this.modelInstance.loadingManager.onProgress = (url, loaded, total) => {
          console.log('loading in progress:')
          console.log(`${url} -> ${loaded} / ${total}`)
        }

        this.modelInstance.loadingManager.onLoad = () => {
          console.log('loaded!')
        }

        this.modelInstance.loadingManager.onError = () => {
          console.log('❌ error while loading')
        }
  
    }

// ============================================================ //

// ============================================================ //
// ====== Fit To Screen ===== //
// ============================================================ //

    fitToScreen(object){

        const box = new Box3();
  
        box.makeEmpty();
  
        var vFOV = (this.modelInstance.camera as PerspectiveCamera).fov * Math.PI / 180; 
  
        var ratio = 2 * Math.tan( vFOV / 2 );
        var screen = ratio * (window.innerWidth / window.innerHeight); 
        var size = box.setFromObject( object ).max.y;
        var dist = (size/screen) / 4; 
  
    }

// ============================================================ //

// ============================================================ //
// ===== 📦 FIT CAMERA TO SELECTION ===== //
// ============================================================ //

    fitCameraToSelection(
        camera, 
        controls, 
        selection, 
        fitOffset = 1.0
    ) {
  
        const size = new Vector3();
        const center = new Vector3();
        const box = new Box3();
  
        box.makeEmpty();
  
        for(const object of selection) {
    
            box.expandByObject(object);
    
        }
        
        box.getSize(size);
        box.getCenter(center );
        
        const maxSize = Math.max(size.x, size.y, size.z);
    
        const fitHeightDistance 
        = 
        maxSize / (2 * Math.atan(Math.PI * camera.fov / 360));
    
        const fitWidthDistance 
        = 
        fitHeightDistance / camera.aspect;
    
        const distance 
        = 
        fitOffset 
        * 
        Math.max(
        fitHeightDistance, 
        fitWidthDistance
        );
        
        const direction 
        = 
        controls.target.clone()
        .sub(camera.position)
        .normalize()
        .multiplyScalar(distance);
    
        //controls.maxDistance = distance * 10;
        controls.target.copy(center);
        
        camera.near = distance / 100;
        camera.far = distance * 100;
    
        camera.updateProjectionMatrix();
    
        camera.position.copy(controls.target).sub(direction);
        
        controls.update();
                           
    }
  
// ============================================================ //  
  
// ============================================================ //
// ===== 📦 ADD OBJECTS ===== //
// ============================================================ //

    addObjects(){

        
        
            this.ajhkeys 
            = new AjhKeys(
                3,
                4,
                this.modelInstance.keyboardTypes.HorizontalKeys,
                this.modelInstance.scaleTypes.HarmonicicMinor,
                0,
                3
            );

            this.modelInstance.informationWindow = new AjhInformationWindow();

            this.modelInstance.currentKeyBoard = this.ajhkeys;
        
            this.modelInstance.initialScreen 
            = 
            new AjhInitialScreen();

           this.modelInstance.scene.add( this.modelInstance.initialScreen .body );
        
            this.ajhkeys.addKeysToScene(this.modelInstance.scene);

            //this controls the full screen resizing of the keyboards
            this.modelInstance.fullScreenObject = new AjhFullScreenObject(1,1);
            this.modelInstance.fullScreenObject.resizeToScreenSize();
           //this.modelInstance.scene.add(this.modelInstance.fullScreenObject.body)
  
    }

// ============================================================ //

// ============================================================ //

// ============================================================ //
// ===== 🕹️ ADD CONTROLS ===== //
// ============================================================ //    

    addControls(){
    
        this.modelInstance.cameraOrbitControls 
        = new OrbitControls( 
            this.modelInstance.camera, 
            this.modelInstance.canvas
            );

        this.modelInstance.cameraOrbitControls.target = new Vector3();//this.ajhkeys..position.clone()
        this.modelInstance.cameraOrbitControls.enableDamping = true
        this.modelInstance.cameraOrbitControls.autoRotate = false
    
        this.modelInstance.cameraOrbitControls.update()
       // this.modelInstance.toggleOrbitCameraEnabled(false);
        this.modelInstance.toggleOrbitCameraEnabled(false);

        // addDragControls(drag:boolean = true);
    
    }

// ============================================================ //
    addDragControls(drag:boolean = true){

        if (drag){

            this.modelInstance.dragControls = 
                new DragControls(
                this.ajhkeys.getKeyBodies(), 
                this.modelInstance.camera, 
                this.modelInstance.renderer.domElement
                );
                
                this.modelInstance.dragControls.addEventListener('hoveron', (event) => {

                console.log("hoveron");

                const mesh = event.object as Mesh;
                const material = mesh.material as MeshStandardMaterial;

                material.emissive.set('orange');

                })

                this.modelInstance.dragControls.addEventListener('hoveroff', (event) => {

                const mesh = event.object as Mesh
                const material = mesh.material as MeshStandardMaterial
                material.emissive.set('black')
                
                this.modelInstance.pointLight.position.x = mesh.position.x = this.modelInstance.pointer.x;    
                this.modelInstance.pointLight.position.z = mesh.position.z =  this.modelInstance.pointer.y;    

                console.log("hoveroff")

                })

                this.modelInstance.dragControls.addEventListener('dragstart', (event) => {
        
                    console.log("dragstart");
                    const mesh = event.object as Mesh;
                    const material = mesh.material as MeshStandardMaterial;
                    this.modelInstance.cameraOrbitControls.enabled = false;
                    this.animation.play = false;
                    material.emissive.set('black');
                    material.opacity = 0.8;
                    material.needsUpdate = true;

                })

                this.modelInstance.dragControls.addEventListener(
                'dragend', 
                (event) => {

                    console.log("dragend");
                    this.modelInstance.cameraOrbitControls.enabled = true;
                    this.animation.play = true;
                    const mesh = event.object as Mesh;
                    const material = mesh.material as MeshStandardMaterial;
                    material.emissive.set('black');
                    material.opacity = 1;
                    material.needsUpdate = true;

                })

                this.modelInstance.dragControls.enabled = true;

        }

    }
// 

// ============================================================ //

// ============================================================ //  
// ===== 🪄 ADD HELPERS ===== //
// ============================================================ //
  
   // addHelpers(){
  
    //   this.axesHelper = new AxesHelper(4);
  
    //   this.axesHelper.visible = false;
  
    //   this.modelInstance.scene.add(this.axesHelper);
  
    //   this.modelInstance.pointLightHelper 
    //   = 
    //   new PointLightHelper(
    //     this.modelInstance.pointLight, 
    //     undefined, 
    //     'orange'
    //   );
  
    //   this.modelInstance.pointLightHelper.visible = false;
  
    //   this.modelInstance.scene.add(this.modelInstance.pointLightHelper)
  
    //   const gridHelper 
    //   = 
    //   new GridHelper(
    //       20, 
    //       20, 
    //       'teal', 
    //       'darkgray'
    //     );
  
    //   gridHelper.position.y = -0.01;
  
    //  / this.modelInstance.scene.add(gridHelper);
  
  //  }
  
// ============================================================ //

// ============================================================ //  
// ======= 🪄 ADD COMPOSER PASS ======= //
// ============================================================ //
    
    // addComposerPass(){

    //     this.gu = {
    //         time: { value: 0 }
    //     };
        
    //     this.clock = new Clock();
    
    //     this.modelInstance.composer 
    //     = new EffectComposer( 
    //         this.modelInstance.renderer as WebGLRenderer 
    //     );
    
    //         const renderPass 
    //         = new RenderPass( 
    //             this.modelInstance.scene, 
    //             this.modelInstance.camera 
    //         );
    
    //         this.modelInstance.composer.addPass( renderPass );
    
    //         const ssaoPass = new SSAOPass( 
    //             this.modelInstance.scene, 
    //             this.modelInstance.camera, 
    //             this.width, 
    //             this.height 
    //         );
    //         //
    //         this.modelInstance.composer.addPass( ssaoPass );
    
    //         const outputPass = new OutputPass();
    //         this.modelInstance.composer.addPass( outputPass );

    // }

// ============================================================ //

// ============================================================ //  
// ======= 🪄 addFullScreenToggleOnDuobleClick ======= //
// ============================================================ //
    
    addFullScreenToggleOnDoubleClick(){

        // Full screen
    {

        window.addEventListener(
        'dblclick', 
        (event) => {

            if (event.target === this.modelInstance.canvas) {

            toggleFullScreen(this.modelInstance.canvas);

            }

        }

        );

    }

    }
    
// ============================================================ //

}