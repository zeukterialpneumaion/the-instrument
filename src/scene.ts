import GUI from 'lil-gui'
import {
  AmbientLight,
  AxesHelper,
  Box3,
  BoxGeometry,
  Clock,
  GridHelper,
  LoadingManager,
  Mesh,
  MeshLambertMaterial,
  MeshStandardMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  PointLightHelper,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three'

import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'

import TWEEN from "@tweenjs/tween.js"

import * as Tone from "tone"
import { Transport } from "tone"
import AjhModel from './ajh/datamodels/AjhModel'
import * as animations from './ajh/helpers/AjhAnimations'
import AjhFullScreenObject from './ajh/helpers/AjhFullScreenObject'
import { resizeRendererToDisplaySize } from './ajh/helpers/AjhResponsiveness'
import AjhKeys from './ajh/keys/AjhKeys'
import './style.css'

const CANVAS_ID = 'scene';

let canvas: HTMLElement;
let loadingManager: LoadingManager;
let ambientLight: AmbientLight;
let pointLight: PointLight;
let cube: Mesh;
let camera: PerspectiveCamera;
let cameraControls: OrbitControls;
let dragControls: DragControls;
let axesHelper: AxesHelper;
let pointLightHelper: PointLightHelper;
let clock: Clock;
let stats: Stats;
let gui: GUI;
let modelInstance: AjhModel;
let ajhkeys : AjhKeys;
let fullscreenobject : AjhFullScreenObject;

// ============================================ //

const animation = { enabled: true, play: true }

init();

// ============================================ //



// ============================================ //
// ===============  FUNCTIONS ================= //
// ============================================ //

function init() {

  // ===== 🖼️ CANVAS, RENDERER, & SCENE ===== //

    {

      modelInstance = AjhModel.Instance;
      //modelInstance.toneInstance = TONE;

      canvas 
      = modelInstance.canvas; //document.querySelector(`canvas#${CANVAS_ID}`);

      modelInstance.renderer 
      = 
      new WebGLRenderer(
        {
          canvas, 
          antialias: true, 
          alpha: true 
        }
      );

      (modelInstance.renderer as WebGLRenderer)
        .setPixelRatio(
          Math.min(
            window.devicePixelRatio, 
            2
          )
        );

      (modelInstance.renderer as WebGLRenderer)
        .shadowMap.enabled = true;

      (modelInstance.renderer as WebGLRenderer)
        .shadowMap.type = PCFSoftShadowMap;

      modelInstance.scene = new Scene();

    }

  // ===== 👨🏻‍💼 LOADING MANAGER =====

    {

      loadingManager = new LoadingManager()

      loadingManager.onStart = () => {
        console.log('loading started')
      }
      loadingManager.onProgress = (url, loaded, total) => {
        console.log('loading in progress:')
        console.log(`${url} -> ${loaded} / ${total}`)
      }
      loadingManager.onLoad = () => {
        console.log('loaded!')
      }
      loadingManager.onError = () => {
        console.log('❌ error while loading')
      }

    }

  // ===== 💡 LIGHTS ===== //
    {

      ambientLight = new AmbientLight('white', 1.8 );

      pointLight = new PointLight('white', 40, 100);
      pointLight.position.set(-2, 6, 2);
      pointLight.castShadow = true;
      pointLight.shadow.radius = 4;
      pointLight.shadow.camera.near = 0.5;
      pointLight.shadow.camera.far = 4000;
      pointLight.shadow.mapSize.width = 2048;
      pointLight.shadow.mapSize.height = 2048;

      modelInstance.scene.add(ambientLight);

      modelInstance.scene.add(pointLight);

    }

  // ===== 📦 ADD OBJECTS =====

    addObjects();

  // ===== 🎥 CAMERA ===== //

    {

      camera 
      = 
      new PerspectiveCamera(
        50, 
        canvas.clientWidth / canvas.clientHeight, 
        0.1, 
        100
      );

      camera.position.set(0, 8, 0);

    }

  // ===== 🕹️ CONTROLS ===== //
  
    addControls();

    // ajhkey.highlightKey(true);



  // ===== 🪄 HELPERS ===== //

    addHelpers();

  // ===== 📈 STATS & CLOCK ===== //

    {
      clock = new Clock()
      stats = new Stats()
      document.body.appendChild(stats.dom)
    }

  // ==== 🐞 DEBUG GUI ====

    addGui();

  
  // ==== FIT CAMERA TO SELECTION ====

    fitCameraToSelection(
      camera, 
      cameraControls, 
      [fullscreenobject.body],//ajhkeys.getKeyBodies(),
      0.87
    );

    animate();

}

// ====== ANIMATE ===== //                                                                                                   

function animate() {

  requestAnimationFrame(animate)

  stats.update()

  TWEEN.update();;

  if (animation.enabled && animation.play) {
    animations.rotate(cube, clock, Math.PI / 3)
    animations.bounce(cube, clock, 1, 0.5, 0.5)
  }

  if (
    resizeRendererToDisplaySize(
      modelInstance.renderer as WebGLRenderer
    )
  ) {

    const canvas = modelInstance.renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();

  }

  //cameraControls.update()

  modelInstance.renderer.render(modelInstance.scene, camera)

}

// ====== Fit To Screen ===== //

function fitToScreen(object){

  const box = new Box3();

  box.makeEmpty();

  var vFOV = camera.fov * Math.PI / 180; 

    var ratio = 2 * Math.tan( vFOV / 2 );
    var screen = ratio * (window.innerWidth / window.innerHeight) ; 
    var size = box.setFromObject( object ).max.y;
    var dist = (size/screen) / 4; 

}

// ===== 📦 FIT CAMERA TO SELECTION ===== //

function fitCameraToSelection(
  camera, 
  controls, 
  selection, 
  fitOffset = 1.2
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

// ===== 📦 ADD OBJECTS ===== //

function addObjects(){

  const sideLength = 1

  const cubeGeometry 
  = 
  new BoxGeometry(
    sideLength, 
    sideLength, 
    sideLength
  );
  
  const cubeMaterial 
  = 
  new MeshStandardMaterial({
    color: '#f69f1f',
    metalness: 0.5,
    roughness: 0.7,
  })

  ajhkeys = new AjhKeys(1,48,"","",2);

  fullscreenobject 
  = 
  new AjhFullScreenObject(
    canvas.clientWidth/1, 
    canvas.clientHeight/1, 
  );

  cube = new Mesh(cubeGeometry, cubeMaterial)
  cube.castShadow = true
  cube.position.y = 0.5

  const planeGeometry = new PlaneGeometry(3, 3)

  const planeMaterial 
  = 
  new MeshLambertMaterial(
    {
        color: 'gray',
        emissive: 'teal',
        emissiveIntensity: 0.2,
        side: 2,
        transparent: true,
        opacity: 0.4,
    }
  )

  const plane = new Mesh(planeGeometry, planeMaterial);
  plane.rotateX(Math.PI / 2);
  plane.receiveShadow = true;

  //getScreensize:
  const geometry 
  = 
  new PlaneGeometry(
    canvas.clientWidth/135, 
    canvas.clientHeight/135, 
    1, 
    1
  )

  modelInstance.scene.add( cube );
  modelInstance.scene.add( plane );

  modelInstance.scene.add( fullscreenobject.body );

  ajhkeys.addKeysToScene(modelInstance.scene);

}

// ===== 🕹️ CONTROLS ===== //
  
function addControls(drag:boolean = false){

  cameraControls = new OrbitControls(camera, canvas)
  cameraControls.target = cube.position.clone()
  cameraControls.enableDamping = true
  cameraControls.autoRotate = false
 // cameraControls.update()

   if (drag){
          dragControls = 
          new DragControls(
            ajhkeys.getKeyBodies(), 
            camera, 
            modelInstance.renderer.domElement
          );
          
          dragControls.addEventListener('hoveron', (event) => {

            console.log("hoveron");

            const mesh = event.object as Mesh;
            const material = mesh.material as MeshStandardMaterial;

            material.emissive.set('orange');

            // new TWEEN.Tween(mesh.position)
            //      .to(
            //         {
            //            y: 30
            //         }, 
            //         100 
            //       )
            //      .easing( TWEEN.Easing.Bounce.In );

            // mesh.position.y = 0.3;

                // .onUpdate(() => render())
                //     .start()
            //     //.delay (1000)
            //     .easing(TWEEN.Easing.Cubic.Out)
            //     //.onUpdate(() => render())
            //     .start()

          })

          dragControls.addEventListener('hoveroff', (event) => {

            const mesh = event.object as Mesh
            const material = mesh.material as MeshStandardMaterial
            material.emissive.set('black')

            // new TWEEN.Tween(mesh.position)
            //      .to(
            //         {
            //            y: 0
            //         }, 
            //         100 
            //       )
            //      .easing( TWEEN.Easing.Bounce.In );
            
            pointLight.position.x = mesh.position.x;    
            pointLight.position.z = mesh.position.z;    

            //pointLight.position.x = mesh.position.x;  
            
          // pointLight.position.y = mesh.position.y + 6;  

            // 

          // ajhkey.highlightKey(true);
            console.log("hoveroff")

          })

          dragControls.addEventListener('dragstart', (event) => {

            console.log("dragstart");
            const mesh = event.object as Mesh;
            const material = mesh.material as MeshStandardMaterial;
            cameraControls.enabled = false;
            animation.play = false;
            material.emissive.set('black');
            material.opacity = 0.8;
            material.needsUpdate = true;

          })

          dragControls.addEventListener(
            'dragend', 
            (event) => {

              console.log("dragend");
              cameraControls.enabled = true;
              animation.play = true;
              const mesh = event.object as Mesh;
              const material = mesh.material as MeshStandardMaterial;
              material.emissive.set('black');
              material.opacity = 1;
              material.needsUpdate = true;

            })

          dragControls.enabled = true;
  }

}

// ==== 🐞 DEBUG GUI ==== //

function addGui(drag:boolean = false){

      gui = new GUI({ title: '🐞 Debug GUI', width: 300 })
  
      //const cubeOneFolder = gui.addFolder('Cube one')
  
      gui.add( 
        modelInstance.toneInstance, 
        "start" 
      )?.onChange(async (value) => {
          await Tone.start()
          .then(() => {
              Transport.start();
              console.log("starting Tone");
          });
      });

      const cubeOneFolder = gui.addFolder('Cube one')
  
      cubeOneFolder.add(cube.position, 'x').min(-5).max(5).step(0.5).name('pos x')
      cubeOneFolder.add(cube.position, 'y').min(-5).max(5).step(0.5).name('pos y')
      cubeOneFolder.add(cube.position, 'z').min(-5).max(5).step(0.5).name('pos z')
  
      cubeOneFolder.add(cube.material, 'wireframe')
      cubeOneFolder.addColor(cube.material, 'color')
      cubeOneFolder.add(cube.material, 'metalness', 0, 1, 0.1)
      cubeOneFolder.add(cube.material, 'roughness', 0, 1, 0.1)
  
      cubeOneFolder
        .add(cube.rotation, 'x', -Math.PI * 2, Math.PI * 2, Math.PI / 4)
        .name('rotate x')
      cubeOneFolder
        .add(cube.rotation, 'y', -Math.PI * 2, Math.PI * 2, Math.PI / 4)
        .name('rotate y')
      cubeOneFolder
        .add(cube.rotation, 'z', -Math.PI * 2, Math.PI * 2, Math.PI / 4)
        .name('rotate z')
  
      cubeOneFolder.add(animation, 'enabled').name('animated')
  if(drag){
      const controlsFolder = gui.addFolder('Controls')
      controlsFolder.add(dragControls, 'enabled').name('drag controls')
  }
      const lightsFolder = gui.addFolder('Lights')
      lightsFolder.add(pointLight, 'visible').name('point light')
      lightsFolder.add(ambientLight, 'visible').name('ambient light')
  
      const helpersFolder = gui.addFolder('Helpers')
      helpersFolder.add(axesHelper, 'visible').name('axes')
      helpersFolder.add(pointLightHelper, 'visible').name('pointLight')
  
      const cameraFolder = gui.addFolder('Camera')
      cameraFolder.add(cameraControls, 'autoRotate')
  
      // persist GUI state in local storage on changes
      gui.onFinishChange(() => {
        const guiState = gui.save()
        localStorage.setItem('guiState', JSON.stringify(guiState))
      })
  
      // load GUI state if available in local storage
      const guiState = localStorage.getItem('guiState')
      if (guiState) gui.load(JSON.parse(guiState))
  
      // reset GUI state button
      const resetGui = () => {
        localStorage.removeItem('guiState')
        gui.reset()
      }
      gui.add({ resetGui }, 'resetGui').name('RESET')
  
      gui.close()
    }

// ===== 🪄 HELPERS ===== // 

function addHelpers(){

    axesHelper = new AxesHelper(4);

    axesHelper.visible = false;

    modelInstance.scene.add(axesHelper);

    pointLightHelper 
    = 
    new PointLightHelper(
      pointLight, 
      undefined, 
      'orange'
    );

    pointLightHelper.visible = false;

    modelInstance.scene.add(pointLightHelper)

    const gridHelper 
    = 
    new GridHelper(
        20, 
        20, 
        'teal', 
        'darkgray'
      );

    gridHelper.position.y = -0.01;

    modelInstance.scene.add(gridHelper);

  }
