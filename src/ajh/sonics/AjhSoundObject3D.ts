
import * as Tone from "tone";
import {
    Channel,
    Filter,
    Frequency,
    Player,
    Reverb,
    Synth
} from "tone";

import { Object3D } from "three";
import AjhModel from "../datamodels/AjhModel";
import AjhKey from "../keys/AjhKey";

export default class AjhSoundObject3D {

    ////////////////////////////////////////////////////

   

    
    public get synth(): Synth {
        return this._synth;
    }
    public set synth(value: Synth) {
        this._synth = value;
    }

    public set bpmSubdivision(value: string) {
        this._bpmSubdivision = value;
    }
    public set baseurl(value: string) {
        this._baseurl = value;
    }

    public set url(value: string) {
        this._url = value;
    }

    public set player(value: Player) {
        this._player = value;
    }

    public set panner3D(value) {
        this._panner3D = value;
    }

    public set context(value: Tone.BaseContext) {
        this._context = value;
    }
   
    private _midiSend: boolean = true;
    public get midiSend(): boolean {
        return this._midiSend;
    }
    public set midiSend(value: boolean) {
        this._midiSend = value;
    }

    private _sampleTrigger: boolean = false;
    public get sampleTrigger(): boolean {
        return this._sampleTrigger;
    }
    public set sampleTrigger(value: boolean) {
        this._sampleTrigger = value;
    }

    private _synthTrigger: boolean = false;
    public get synthTrigger(): boolean {
        return this._synthTrigger;
    }
    public set synthTrigger(value: boolean) {
        this._synthTrigger = value;
    }

    private _context: Tone.BaseContext;
   
    
    private _panner3D = new Tone.Panner3D(0, 0, 0);
  
    

    private _player: Player;
   
    
    private _url: string;
   
    
    private _baseurl: string;
    

    private _bpmSubdivision: string = "8t";
    
    
    private _id: number
   
    private _filter: Filter
    private _lpFilter: Filter = new Filter({
        frequency: 20000,
        type: "lowpass",
        rolloff: -24,
    
    
    });
    
    private _synth: Synth 
    =
    new Synth({
        oscillator: {
            type: "fatsawtooth"
        },
        envelope: {
            attack: 0.001,
            decay: 1.00,
            sustain: 0.53,
            release: "16n"
        }
    });
    
////////////////////////////////////////////////////
    
    private _synthesizers :Array<Synth> 
    = [];
    
    private _playbackRate: number = 0.04;

   // private _sampler:  Sampler
   
    private _channel: Channel 
    = new Channel({
        pan: 0.0,// + (Math.random()*0.9),
        volume: 0.2,
        mute: false,
        solo: false
    });

    private _reverb: Reverb 
    = new Reverb({
        decay: 0.2,
        wet: 0.20,
        preDelay: 0.01
    });

    private _body: Object3D
    
    private _frequency: number
    
    private _voice: any

    private _positionalAudioNodeBuffer
    : AudioBufferSourceNode;

    private _modelInstance: AjhModel 
    = AjhModel.Instance;
    
////////////////////////////////////////////////////

    constructor(
            id: number
    ) {

        this._id = id;
        this._panner3D.panningModel = "HRTF";

        this.addListeners();
        
    }

////////////////////////////////////////////////////


    addListeners(){

        this.modelInstance.noteEventEmitter
        .on(
            "on_off",
            this.onNoteListener.bind(this)
        );

      

    }

////////////////////////////////////////////////////

    

////////////////////////////////////////////////////

    onNoteListener(

        on_off:boolean,
        positionId: number, 
        noteName: Tone.Unit.Frequency

    ){

        try{
        if(
           
            this._id == positionId && on_off == true
        ){
 
                    if(!this.key.muted){

                       
                       // SYNTH TRIGGER::::
                       if(this._synthTrigger){
                           
                           this._synth
                           .triggerAttackRelease(
                            noteName, //noteName, 
                            0,
                            1.6 + ( Math.random() * 1.52 )
                            // this.key.ajhSequence.subdivision,
                            // Transport.nextSubdivision(this.key.ajhSequence.subdivision),
                            // 0.5-(Math.random()*0.4)
                           )//.connect(this.reverb);
                       }

                        // MIDI TRIGGER:::
                        if(this._midiSend){
                        
                            let midiNote = Frequency(noteName).transpose(24).toMidi();

                           // for (let index = 0; index < this._modelInstance.ajhMidi.midiOut.length; index++) {
                            //    const element = this._modelInstance.ajhMidi.midiOut[index];
                                 
                                this._modelInstance.ajhMidi.sendMidiMessage(
                                    this.id, // this._modelInstance.currentMidiOutputChannel,//this.id, // this._sequence.toTicks()%9, 
                                    midiNote, 
                                    0x77, 
                                    10,
                                    // Transport.nextSubdivision(
                                    //     this.ring.ajhSequence.subdivision
                                    // ),
                                    this.id //this.modelInstance.currentMidiOutId
                                );

                                    // this._modelInstance.ajhMidi.sendTestMidi(
                                    //     this._modelInstance.currentMidiOutputChannel,
                                    //     this.modelInstance.currentMidiOutId
                                    // );

                                    // this._modelInstance.ajhMidi.sendMidiToAllDevices();

                                console.log(
                                    "Eureka!"
                                    + midiNote
                                    + "I am EuclideanRing("
                                    + this._id
                                    +") : I am playing note "
                                    + noteName
                                    + " on "
                                    + this.modelInstance.availableMidiOutputs[this.modelInstance.currentMidiOutId].name
                                    + " on channel "
                                    + this.modelInstance.currentMidiOutputChannel
                                )

                        }

                    }
                    else{

                        console.log(
                            "MUTED::"
                            + " Ring("
                            + this._id
                            +") :  note "
                            + noteName
                        )


                    }
                }
            }
            catch(e){

                console.log(
                    "Hmm...triggering a sequenced note was not successful: "
                    + e
                )
                
            }    

    }

////////////////////////////////////////////////////

    connectInstrumentToChannelLpfReverbAndPanner3D( 
       synthInstance : Synth
    ){

        console.log(
            " Key " 
            + this._id 
            + 
            " : Connecting oscillatorInstanceChannelLPFilterReverb :"
        );
        
        console.log("Connect oscillatorInstance To channel");
        synthInstance.connect(this._lpFilter);
        this.synth.connect(this._lpFilter);

        console.log("Connect lpf To reverb");
        this._lpFilter.connect(this._reverb);

        console.log("Connect reverb to panner3D");
        this._reverb.connect(this._panner3D);

        console.log("Connect channel To lpf");
        this._panner3D.connect(this._channel);
        
        console.log("Connect panner3D toDestination()");
        this._channel.toDestination();

        try {
            
            console.log(

                "I am Key("
                + this._id
                + ") of Musical Keyboard "
                + " and I have connected successfully"
                + " to the last node!"

            )

            synthInstance.triggerAttackRelease(

                    "B1",
                    "4n",
                    0,
                    1.6 + ( Math.random() * 1.52 )

            );

        }
        catch(e){

            console.log(

                "Hmm...connecting Synth "
                + "to Channel was not successful: "
                + e

            )
            
        }
    }


///////////////////////////////////////////////////////////

/**
 * One night,
 *  in the year 1713 I dreamed I had made a pact with the devil 
 * for my soul. Everything went as I wished: my new servant 
 * anticipated my every desire. 
 * Among other things, 
 * I gave him my violin to see if he could play. 
 * How great was my astonishment on hearing a sonata so wonderful 
 * and so beautiful, played with such great art and intelligence, 
 * as I had never even conceived in my boldest flights of fantasy. 
 * I felt enraptured, transported, enchanted: my breath failed me, 
 * and I awoke. I immediately grasped my violin in order to retain, 
 * in part at least, the impression of my dream. In vain! The music 
 * which I at this time composed is indeed the best that I ever wrote, 
 * and I still call it the "Devil's Trill", 
 * but the difference between it and that which so moved me is so great 
 * that I would have destroyed my instrument and have said farewell 
 * to music forever if it had been possible for me to live without 
 * the enjoyment it affords me.[4]
 * 
 * Tartini - the devil's trill.
 *  1799 in L'Art du Violon by Jean-Baptiste Cartier
 * Tartini's Dream by Louis-Léopold Boilly (1824)

 */

////////////////////////////////////////////////////////////////////

    private _key: AjhKey;
    public get key(): AjhKey {
        return this._key;
    }
    public set key(value: AjhKey) {
        this._key = value;
    }

    public get id(): number {
        return this._id;
    }

    public get filter(): Tone.Filter {
        return this._filter;
    }

    public get body(): Object3D {
        return this._body;
    }

    public get frequency(): number {
        return this._frequency;
    }

    public get voice(): any {
        return this._voice;
    }

    public get positionalAudioNodeBuffer(): AudioBufferSourceNode {
        return this._positionalAudioNodeBuffer;
    }

    public get modelInstance(): AjhModel {
        return this._modelInstance;
    }

     public get context(): Tone.BaseContext {
        return this._context;
    }

    public get panner3D() {
        return this._panner3D;
    }

    public get player(): Player {
        return this._player;
    }

    public get url(): string {
        return this._url;
    }
    public get baseurl(): string {
        return this._baseurl;
    }

    public get bpmSubdivision(): string {
        return this._bpmSubdivision;
    }

    public get playbackRate(): number {
        return this._playbackRate;
    }

    public get synthesizers() {
        return this._synthesizers;
    }

    public get reverb(): Reverb {
        return this._reverb;
    }

    public get channel(): Channel {
        return this._channel;
    }


    ////////////////////////////////////////////////////
    
     
    public set reverb(value: Reverb) {
        this._reverb = value;
       // this._reverb.toDestination();
    }

    public set channel(value: Channel) {
        this._channel = value;
    }

    public set synthesizers(value) {
        this._synthesizers = value;
    }

    public set playbackRate(value: number) {
        this._playbackRate = value;
    }

    public set id(value: number) {
        this._id = value;
    }
    

    public set filter(value: Tone.Filter) {
        this._filter = value;
    }

    public set body(value: Object3D) {
        this._body = value;
    }

    public set frequency(value: number) {
        this._frequency = value;
    }

    public set voice(value: any) {
        this._voice = value;
    }

    public set positionalAudioNodeBuffer(
        value: AudioBufferSourceNode
    ) {
        this._positionalAudioNodeBuffer = value;
    }
    
    public set modelInstance(value: AjhModel) {
        this._modelInstance = value;
    }


}