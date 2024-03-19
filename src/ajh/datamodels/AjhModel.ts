import {
    AmbientLight,
    Box3,
    Camera,
    Clock,
    LoadingManager,
    Mesh,
    PerspectiveCamera,
    PointLight,
    Raycaster,
    Renderer,
    Scene,
    Vector2,
    Vector3,
    WebGLRenderer
} from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import * as Tone from "tone";

import AjhSelectedKey from "../keys/key/AjhSelectedKey";

import AjhGUIControls from "../gui/AjhGUIControls";
import AjhGeometries from "../helpers/AjhGeometries";
import AjhMaterials from "../helpers/AjhMaterials";

import AjhMidi from "../sonics/AjhMidi";

import AjhTypedEventEmitter from '../ajhevents/ajh_typed_events/AjhTypedEventEmitter';

import { AjhMusicalKeyEventTypes, createInstrumentEventBroker } from '../ajhevents/AjhMusicalKeyEvents';

import { AjhNoteEventTypes, createNoteEventBroker } from '../ajhevents/AjhNoteEvents';

import GUI from "lil-gui";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import AjhPointerEvents from "../ajhevents/AjhPointerEvents";
import AjhColours from "../colours/AjhColours";
import AjhColourSchemeOptions from "../configs/options/AjhColourSchemeOptions";
import AjhInstrumentOptions from "../configs/options/AjhInstrumentOptions";
import AjhScaleOptions from "../configs/options/AjhScaleOptions";
import AjhInformationWindow from "../displays/AjhInformationWindow";
import AjhInitialScreen from "../displays/AjhInitialScreen";
import AjhFullScreenObject from "../helpers/AjhFullScreenObject";
import AjhKeyInterfaceOptions from "../keys/key/AjhKeyInterfaceOptions";
import AjhSelectedKeys from "../keys/key/AjhSelectedKeys";
import AjhKeyboardTypes from "../keys/keyboards/AJhKeyBoardTypes";
import AjhKeys from "../keys/keyboards/AjhKeyBoard";
import AjhRayCasters from "../raycasters/AjhRayCasters";
import AjhRayPointers from "../raycasters/AjhRayPointers";
import AjhInstruments from "../sonics/AjhInstruments";
import AjhScaleCreation from "../sonics/AjhScaleCreation";
import AjhScaleTypes from "../sonics/AjhScaleTypes";

// ============================================================ //

export default class AjhModel {

    public showColourMessages: boolean = true;
    public showMusicalKeyMessages: boolean = false;
    public showKeyBoardMessages: boolean = false;
    public showSequenceMessages: boolean = false;
    public showAudioMessages: boolean = false;
    public useSpectrumColours : boolean = true;

    private _Stats: Stats;
    public get Stats(): Stats {
        return this._Stats;
    }
    public set Stats(value: Stats) {
        this._Stats = value;
    }
    
    private _ScalesCreation: AjhScaleCreation = new AjhScaleCreation();
    public get ScalesCreation(): AjhScaleCreation {
        return this._ScalesCreation;
    }
    public set ScalesCreation(value: AjhScaleCreation) {
        this._ScalesCreation = value;
    }

    private _fullScreenObject: AjhFullScreenObject;
    public get fullScreenObject(): AjhFullScreenObject {
        return this._fullScreenObject;
    }
    public set fullScreenObject(value: AjhFullScreenObject) {
        this._fullScreenObject = value;
    }

    private _currentKeyBoard: AjhKeys;
    public get currentKeyBoard(): AjhKeys {
        return this._currentKeyBoard;
    }
    public set currentKeyBoard(value: AjhKeys) {
        this._currentKeyBoard = value;
    }

    private _keyboardTypes: AjhKeyboardTypes = new AjhKeyboardTypes();
    public get keyboardTypes(): AjhKeyboardTypes {
        return this._keyboardTypes;
    }
    public set keyboardTypes(value: AjhKeyboardTypes) {
        this._keyboardTypes = value;
    }

    private _colourOptions: AjhColourSchemeOptions 
    = new AjhColourSchemeOptions();
    public get colourOptions(): AjhColourSchemeOptions {
        return this._colourOptions;
    }
    public set colourOptions(value: AjhColourSchemeOptions) {
        this._colourOptions = value;
    }

    private _scaleOptions: AjhScaleOptions 
    = new AjhScaleOptions();
    public get scaleOptions(): AjhScaleOptions {
        return this._scaleOptions;
    }
    public set scaleOptions(value: AjhScaleOptions) {
        this._scaleOptions = value;
    }

    private _scaleTypes: AjhScaleTypes = new AjhScaleTypes();
    public get scaleTypes(): AjhScaleTypes {
        return this._scaleTypes;
    }
    public set scaleTypes(value: AjhScaleTypes) {
        this._scaleTypes = value;
    }

    private _instrumentOptions: AjhInstrumentOptions 
    = new AjhInstrumentOptions();
    public get instrumentOptions(): AjhInstrumentOptions {
        return this._instrumentOptions;
    }
    public set instrumentOptions(value: AjhInstrumentOptions) {
        this._instrumentOptions = value;
    }

    private _keyInterfaceOptions: AjhKeyInterfaceOptions 
    = new AjhKeyInterfaceOptions();
    public get keyInterfaceOptions(): AjhKeyInterfaceOptions {
        return this._keyInterfaceOptions;
    }
    public set keyInterfaceOptions(value: AjhKeyInterfaceOptions) {
        this._keyInterfaceOptions = value;
    }

    private _pointerDown: boolean = false;
    public get pointerDown(): boolean {
        return this._pointerDown;
    }
    public set pointerDown(value: boolean) {
        this._pointerDown = value;
    }

    private _count: number = 0;

    private _colours: AjhColours;

    private _buffers: Array<any>;// = allBuffers;

    private _toneInstance: any = Tone;

    private _selectedKey: AjhSelectedKey;

    private _selectedKeys: AjhSelectedKeys = new AjhSelectedKeys();
    public get selectedKeys(): AjhSelectedKeys {
        return this._selectedKeys;
    }
    public set selectedKeys(value: AjhSelectedKeys) {
        this._selectedKeys = value;
    }

    private _maxKeysPerKeyBoard: number = 64;

    private _instruments: AjhInstruments;
    public get instruments(): AjhInstruments {
        return this._instruments;
    }
    public set instruments(value: AjhInstruments) {
        this._instruments = value;
    }

    private _keyBodies: Array<Mesh>;
    public get keyBodies(): Array<Mesh> {
        return this._keyBodies;
    }
    public set keyBodies(value: Array<Mesh>) {
        this._keyBodies = value;
    }

    private _infoScreen: AjhInitialScreen;
    public get infoScreen(): AjhInitialScreen {
        return this._infoScreen;
    }
    public set infoScreen(value: AjhInitialScreen) {
        this._infoScreen = value;
    }


    // ============================================================ //

    private constructor() {

        console.log("MODEL Instantiated");

        this._colours 
        = 
        new AjhColours( 
        
            0,
            this.ScalesCreation.noteNamesOneOctave.length
        
        );

        this._colours
        .generateSpectrumArray(
        
            this.ScalesCreation.noteNamesOneOctave.length, 0.3
        
        );

        // for (
        //     let index = 0;
        //     index < 4;
        //     index++
        // ) {

            // this.colours.push(

            //     new AjhColours(

            //         index,
            //         this.scales.noteNames.length

            //     )

            // );

            // this.colours[index]
            //     .generateSpectrumArray(
            //         this.scales.noteNames.length, 0.3
            //     )

               

       // }

       //this.instruments = new AjhInstruments();
        this.musicalKeyEventEmitter = createInstrumentEventBroker();

        this.noteEventEmitter = createNoteEventBroker();

        this.ajhGuiControls;

        this.selectedKey = AjhSelectedKey.Instance;

        

        // this.ajhMidi = new AjhMidi();

        // console.log("MIDI Instantiated");

    }



    toggleOrbitCameraEnabled(isEnabled){
        this.cameraOrbitControls.enablePan = isEnabled;//
        this.cameraOrbitControls.enableZoom = isEnabled;//
        this.cameraOrbitControls.enableRotate = isEnabled;//
        this.cameraOrbitControls.enabled = isEnabled;
    }
// ============================================================ //  



    public getCameraViewSizeXY() : Vector2 {


        const cameraOffset = 0.7;
        const target = new Vector2(); // create once and reuse it

        (this.camera as PerspectiveCamera)
        .getViewSize( 
            this.camera.position.y-cameraOffset, 
            target 
        ); // result written to target

        return target;

    }

// ============================================================ //

    public getWorldCoordsFromMouseXY(mouse) : Vector3 {

        var vector = new Vector3();
        var pos = new Vector3();
        vector.set(mouse.x, mouse.y, 1);
        vector.unproject( this.camera ); // -1,1 => -screen width/2,screen width/2
        vector.sub(this.camera.position).normalize();
        var distance = -this.camera.position.z / vector.z;
        pos.copy(this.camera.position).add(vector.multiplyScalar(distance));
        return pos

    }

    fitCameraToSelection(
       
       
    ) {
  

        let  fitOffset = 1.2;
        const size = new Vector3();
        const center = new Vector3();
        const box = new Box3();
  
        box.makeEmpty();
  
        for(const object of [this.fullScreenObject.body]) {
    
            box.expandByObject(object);
    
        }
        
        box.getSize(size);
        box.getCenter(center );
        
        const maxSize = Math.max(size.x, size.y, size.z);
    
        const fitHeightDistance 
        = 
        maxSize / (2 * Math.atan(Math.PI * (this.camera as PerspectiveCamera).fov / 360));
    
        const fitWidthDistance 
        = 
        fitHeightDistance / (this.camera as PerspectiveCamera).aspect;
    
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
        this.controls.target.clone()
        .sub((this.camera as PerspectiveCamera).position)
        .normalize()
        .multiplyScalar(distance);
    
        //controls.maxDistance = distance * 10;
        this.controls.target.copy(center);
        
        (this.camera as PerspectiveCamera).near = distance / 100;
        (this.camera as PerspectiveCamera).far = distance * 100;
    
        (this.camera as PerspectiveCamera).updateProjectionMatrix();
    
        (this.camera as PerspectiveCamera).position.copy(this.controls.target).sub(direction);
        
        this.controls.update();
                           
    }

    private _ambientLight: AmbientLight;
    public get ambientLight(): AmbientLight {
        return this._ambientLight;
    }
    public set ambientLight(value: AmbientLight) {
        this._ambientLight = value;
    }

    private _pointLight: PointLight;
    public get pointLight(): PointLight {
        return this._pointLight;
    }
    public set pointLight(value: PointLight) {
        this._pointLight = value;
    }

   
    private _cameraOrbitControls: OrbitControls;
    public get cameraOrbitControls(): OrbitControls {
        return this._cameraOrbitControls;
    }
    public set cameraOrbitControls(value: OrbitControls) {
        this._cameraOrbitControls = value;
    }

    private _clock: Clock;
    public get clock(): Clock {
        return this._clock;
    }
    public set clock(value: Clock) {
        this._clock = value;
    }

    private _initialscreen: AjhInitialScreen;
    public get initialscreen(): AjhInitialScreen {
        return this._initialscreen;
    }
    public set initialscreen(value: AjhInitialScreen) {
        this._initialscreen = value;
    }

// ======================================================= //
// raycasters and pointers //
// ======================================================= //
    
    private _pointerEventsInstance: AjhPointerEvents;
    public get pointerEventsInstance(): AjhPointerEvents {
        return this._pointerEventsInstance;
    }
    public set pointerEventsInstance(value: AjhPointerEvents) {
        this._pointerEventsInstance = value;
    }

    private _pointer: Vector2 = new Vector2();
    public get pointer(): Vector2 {
        return this._pointer;
    }
    public set pointer(value: Vector2) {
        this._pointer = value;
    }

    private _raycasterPointers: AjhRayPointers = new AjhRayPointers();
    public get raycasterPointers(): AjhRayPointers {
        return this._raycasterPointers;
    }
    public set raycasterPointers(value: AjhRayPointers) {
        this._raycasterPointers = value;
    }

// ============================================================ //

    private _raycasters: AjhRayCasters = new AjhRayCasters();
    public get raycasters(): AjhRayCasters {
        return this._raycasters;
    }
    public set raycasters(value: AjhRayCasters) {
        this._raycasters = value;
    }

// =============================================================== //

// =============================================================== //

    public get colours()
        : AjhColours {

        return this._colours;

    }

    public get counter(): number {

        return this._counter;

    }

    public get geometries(): AjhGeometries {

        return this._geometries;

    }

    public get materials(): AjhMaterials {
        return this._materials;
    }

    public get ajhGuiControls(): AjhGUIControls {
        return this._ajhGuiControls;
    }

    public get camera(): Camera {
        return this._camera;
    }

    public get raycaster(): Raycaster {
        return this._raycaster;
    }

    public get scene(): Scene {
        return this._scene;
    }

    public get renderer()
        : Renderer | WebGLRenderer {
        return this._renderer;
    }

    public get controls(): OrbitControls {
        return this._controls;
    }

    public get composer(): EffectComposer {
        return this._composer;
    }

    public get initPositionArray(): Array<number> {
        return this._initPositionArray;
    }

    public get notesArray(): Array<string> {
        return this._notesArray;
    }

    public get buffers(): Array<any> {
        return this._buffers;
    }

    public get selectedKey()
        : AjhSelectedKey {
        return this._selectedKey;
    }

    public get musicalKeyEventEmitter()
        : AjhTypedEventEmitter<any> {
        return this._musicalKeyEventEmitter;
    }

    public get toneInstance(): any {
        return this._toneInstance;
    }

    public get maxKeysPerKeyBoard(): number {
        return this._maxKeysPerKeyBoard;
    }

  
    public get cameraTarget(): any {
        return this._cameraTarget;
    }

    public get count(): number {
        return this._count;
    }

// ============================================================ //

    private _isTouchingSomething: Boolean = false;

// ============================================================ //

    public set cameraTarget(value: any) {

        this._cameraTarget = value;
        this._controls.target = this._cameraTarget;
    }

// ============================================================ //

    public set isTouchingSomething(value: Boolean) {
        this._isTouchingSomething = value;
    }

    public set colours(
        value: AjhColours
    ) {
        this._colours = value;
    }

    public set counter(value: number) {
        this._counter = value;
    }

    public set geometries(value: AjhGeometries) {
        this._geometries = value;
    }

    public set materials(value: AjhMaterials) {
        this._materials = value;
    }

    public set ajhGuiControls(value: AjhGUIControls) {

        this._ajhGuiControls = value;

    }

// ============================================================ //

    private _keyboard: AjhKeys;
    public get keyboard(): AjhKeys {
        return this._keyboard;
    }
    public set keyboard(value: AjhKeys ) {
        this._keyboard = value;
    }

// ============================================================ //

    private _loadingManager: LoadingManager;
    public get loadingManager(): LoadingManager {
        return this._loadingManager;
    }
    public set loadingManager(value: LoadingManager) {
        this._loadingManager = value;
    }

// ============================================================ //

    private _dragControls: DragControls;
    public get dragControls(): DragControls {
        return this._dragControls;
    }
    public set dragControls(value: DragControls) {
        this._dragControls = value;
    }

// ============================================================ //

    private _pointLights: Array<PointLight> = new Array<PointLight>();
    public get pointLights(): Array<PointLight> {
        return this._pointLights;
    }
    public set pointLights(value: Array<PointLight>) {
        this._pointLights = value;
    }

// ============================================================ //



    public set count(value: number) {
        this._count = value;
    }

    public get isTouchingSomething(): Boolean {
        return this._isTouchingSomething;
    }

    public set camera(value: Camera) {
        this._camera = value;
    }

    public set raycaster(value: Raycaster) {
        this._raycaster = value;
    }

    public set scene(value: Scene) {
        this._scene = value;
    }

    public set renderer(value: Renderer | WebGLRenderer) {
        this._renderer = value;
    }

    public set controls(value: OrbitControls) {
        this._controls = value;
    }

    public set composer(value: EffectComposer) {
        this._composer = value;
    }

    public set initPositionArray(value: Array<number>) {
        this._initPositionArray = value;
    }

    public set notesArray(value: Array<string>) {
        this._notesArray = value;
    }

    public set buffers(value: Array<any>) {
        this._buffers = value;
    }

    public set selectedKey(value: AjhSelectedKey) {
        this._selectedKey = value;
        this.musicalKeyEventEmitter
            .emit("SelectionIdChanged", value)
    }

// ============================================================ //

    public set musicalKeyEventEmitter(
        value: AjhTypedEventEmitter<AjhMusicalKeyEventTypes>
    ) {
        this._musicalKeyEventEmitter = value;
    }

    private _musicalKeyEventEmitter : AjhTypedEventEmitter<AjhMusicalKeyEventTypes>;

// ============================================================ //

    public set maxKeysPerKeyBoard(value: number) {
        this._maxKeysPerKeyBoard = value;
    }

    public informationWindow: AjhInformationWindow;

// ============================================================ //

    private _canvas: HTMLElement;
    public get canvas(): HTMLElement {
        return this._canvas;
    }
    public set canvas(value: HTMLElement) {
        this._canvas = value;
    }

// ============================================================ //

    private _noteEventEmitter: AjhTypedEventEmitter<AjhNoteEventTypes>;
    public get noteEventEmitter(): AjhTypedEventEmitter<AjhNoteEventTypes> {
        return this._noteEventEmitter;
    }
    public set noteEventEmitter(value: AjhTypedEventEmitter<AjhNoteEventTypes>) {
        this._noteEventEmitter = value;
    }

// ============================================================ //

    private _ajhMidi: AjhMidi;
    public get ajhMidi(): AjhMidi {
        return this._ajhMidi;
    }
    public set ajhMidi(value: AjhMidi) {
        this._ajhMidi = value;
    }

// ============================================================ //

    public _ajhMidiAccess: any;

    public get ajhMidiAccess(): any {
        return this._ajhMidiAccess;
    }

    public set ajhMidiAccess(value: any) {
        this._ajhMidiAccess = value;
    }

// ============================================================ //

    private _currentMidiOutId = 0;
    public get currentMidiOutId() {
        return this._currentMidiOutId;
    }
    public set currentMidiOutId(value) {
        this._currentMidiOutId = value;
    }

// ============================================================ //

    private _currentMidiInId = 0;
    public get currentMidiInId() {
        return this._currentMidiInId;
    }
    public set currentMidiInId(value) {
        this._currentMidiInId = value;
    }

// ============================================================ //

    private _availableMidiInputs: Array<any> = [];
    public get availableMidiInputs(): Array<any> {
        return this._availableMidiInputs;
    }
    public set availableMidiInputs(value: Array<any>) {
        this._availableMidiInputs = value;
    }

// ============================================================ //

    private _currentMidiInputChannel: number = 1;
    public get currentMidiInputChannel(): number {
        return this._currentMidiInputChannel;
    }
    public set currentMidiInputChannel(value: number) {
        this._currentMidiInputChannel = value;
    }

// ============================================================ //

    private _availableMidiOutputs: Array<any> = [];
    public get availableMidiOutputs(): Array<any> {
        return this._availableMidiOutputs;
    }
    public set availableMidiOutputs(value: Array<any>) {
        this._availableMidiOutputs = value;
    }

// ============================================================ //

    private _currentMidiOutputChannel: number = 1;
    public get currentMidiOutputChannel(): number {
        return this._currentMidiOutputChannel;
    }
    public set currentMidiOutputChannel(value: number) {
        this._currentMidiOutputChannel = value;
    }

// ============================================================ //

    private _audioContext: AudioContext;
    public get audioContext(): AudioContext {
        return this._audioContext;
    }
    public set audioContext(value: AudioContext) {
        this._audioContext = value;
    }

// ============================================================ //

    private _mouseCoordinates: Vector2 = new Vector2();
    public get mouseCoordinates(): Vector2 {
        return this._mouseCoordinates;
    }
    public set mouseCoordinates(value: Vector2) {
        this._mouseCoordinates = value;
    }

// ============================================================ //


            private _gui: GUI = new GUI();
            public get gui(): GUI {
                return this._gui;
            }
            public set gui(value: GUI) {
                this._gui = value;
            }

// ============================================================ //
    private _ajhGuiControls: AjhGUIControls;

    private _counter: number;

    private _geometries: AjhGeometries
        = new AjhGeometries();

    private _materials: AjhMaterials
        = new AjhMaterials();

    private _camera: Camera;

    private _cameraTarget: any = new Vector3();

    private _raycaster: Raycaster;

    private _scene: Scene;

    private _renderer: Renderer | WebGLRenderer;

    private _controls: OrbitControls;

    private _composer: EffectComposer;

    private _initPositionArray: Array<number>;

    private _notesArray: Array<string>;         

// ============================================================ //


// ============================================================ //
// =============== MODEL SINGLETON INSTANCE =================== //
// ============================================================ //
        
    private static _instance: AjhModel | null = null;
    
    public static get Instance(): AjhModel {

        if (!AjhModel._instance) {
            AjhModel._instance = new AjhModel();
        }

        return AjhModel._instance;

    }

    public static getInstance(): AjhModel {

        if (!AjhModel._instance) {
            AjhModel._instance = new AjhModel();
        }

        return AjhModel._instance;

    }

// ============================================================ //

}

// ============================================================ //

// const ajhModelInstance = AjhModel.Instance;

// ============================================================ //