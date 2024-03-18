import * as Tone from "tone";
import { Channel, Destination, DuoSynth, Filter, Frequency, MembraneSynth, PluckSynth, PolySynth, Reverb, Synth, Volume } from "tone";
import AjhModel from "../datamodels/AjhModel";
import AjhSynthDefinition from "./AjhSynthDefinition";
import AjhSynths from "./AjhSynths";
export default class AjhInstruments{

    private _modelInstance: AjhModel = AjhModel.Instance;
    public get modelInstance(): AjhModel {
        return this._modelInstance;
    }
    public set modelInstance(value: AjhModel) {
        this._modelInstance = value;
    }


    private _currentInstrument: AjhSynthDefinition ;
    public get currentInstrument(): AjhSynthDefinition {
        return this._currentInstrument;
    }
    public set currentInstrument(value: AjhSynthDefinition) {
        this._currentInstrument = value;
    }

    private _volume: Volume;
    public get volume(): Volume {
        return this._volume;
    }
    public set volume(value: Volume) {
        this._volume = value;
    }

///////////////////////////////////////////////////////////////////////////

    public synths : AjhSynths = new AjhSynths();

///////////////////////////////////////////////////////////////////////////

    constructor(){

       // this.volume = new Volume(-24);

       this.setVolume(0.7);

        // this.channel 
        // =
        // new Channel({
        //     pan: 0.0,
        //     volume: 0.1,
        //     mute: false,
        //     solo: false
        // });

        this.ajhReverb 
        = new Reverb( 
            {
                decay: 1.5,
                wet: 0.90,
                preDelay: 0.1
            })

        this.ajhReverb2 
        = new Reverb( 
            {
                decay: 1.5,
                wet: 0.20,
                preDelay: 0.1
            })
        
        this.connectAllInstrumentsToOutput();
        
        this.currentInstrument = this.synths.trianglesynth;
    
        // play a chord
        this.playAChord(4);

    }
    
///////////////////////////////////////////////////////////////////////////

    connectAllInstrumentsToOutput(){

            //this.connectInstrumentToEffectChainAndOutput(this.synths.duosynth.synth);
            this.connectInstrumentToEffectChainAndOutput(this.synths.phatpolysynth.synth);
           // this.connectInstrumentToEffectChainAndOutput(this.synths.plucksynth.synth);
            this.connectInstrumentToEffectChainAndOutput(this.synths.polysynth.synth);
            this.connectInstrumentToEffectChainAndOutput(this.synths.fatoscillator.synth);
            this.connectInstrumentToEffectChainAndOutput(this.synths.squaresynth.synth);
            this.connectInstrumentToEffectChainAndOutput(this.synths.trianglesynth.synth);


    }

///////////////////////////////////////////////////////////////////////////
    
    setVolume(vol : number ){

        Destination.volume.value = (1 - vol ) * (-36);
        
    }
    

///////////////////////////////////////////////////////////////////////////   

    connectInstrumentToEffectChainAndOutput(instrument){
        instrument
        .connect(this._lpFilter)
        .connect(this.ajhReverb)
       // .connect(this.volume)
        .toDestination();

    }

///////////////////////////////////////////////////////////////////////////

    public playAChord(octave:number){

        (this.synths.polysynth.synth as PolySynth).triggerAttackRelease(
            [
                "C"+octave.toString(), 
                "G"+octave.toString(),
                "C"+(octave +1).toString(),
            ], 
            1, 
            Tone.now(), 
            0.5
        );

    }

///////////////////////////////////////////////////////////////////////////

    playHarmonized3rd7th(note){

        let harmony = Frequency(note).harmonize([0, 3, 7,9,11,13,19,23]);

        this.instruments[4][1].triggerAttackRelease(
            [
                harmony[0].toFrequency(),
                harmony[1].toFrequency(),
                harmony[2].toFrequency(),
            ],
            2.5,

        );
    }

///////////////////////////////////////////////////////////////////////////

    stopHarmonized3rd7th(note){

        let harmony = Frequency(note).harmonize([0, 3, 7]);

        this.instruments[1][1].triggerRelease(
            [
                harmony[0].toFrequency(),
                harmony[1].toFrequency(),
                harmony[2].toFrequency()
            ]
        );

    }

///////////////////////////////////////////////////////////////////////////

    public playANote(note:string, noteVolume:number = 0.7 ){

        switch (this.currentInstrument.name) {

            case "Square":
                (this.currentInstrument.synth  as PolySynth)
                .triggerAttackRelease(note, 0.5, Tone.now(), noteVolume );
            break;

            case "Triangle":
                (this.currentInstrument.synth  as PolySynth)
                .triggerAttackRelease(note, 0.5, Tone.now(), noteVolume );
            break;

            case "PhatPolySynth":
                (this.currentInstrument.synth as PolySynth)
                .triggerAttackRelease(note, 0.5, Tone.now(), noteVolume );
            break;

            case "SquareEightSynth":
                (this.currentInstrument.synth  as Synth)
                .triggerAttack(note, Tone.now(), noteVolume);
            break;

            case "FatOscillator":
                (this.currentInstrument.synth as PolySynth)
                .triggerAttackRelease(note, 0.5, Tone.now(), noteVolume );
            break;

            case "MembraneSynth":
                (this.currentInstrument.synth as MembraneSynth)
                .triggerAttackRelease(note, Tone.now(), 0.8);
            break;

            case "PolySynth":
                (this.currentInstrument.synth as PolySynth)
                .triggerAttackRelease(note, 0.5, Tone.now(), noteVolume );
            break;

            case "DuoSynth":
                (this.currentInstrument.synth as DuoSynth)
                .triggerAttackRelease(note, 0.5, Tone.now(), noteVolume );
            break;

            case "PluckSynth":
                (this.currentInstrument.synth as PluckSynth)
                .triggerAttackRelease(note, Tone.now());
            break;
        
            default:
                break;
        }
    
    }

///////////////////////////////////////////////////////////////////////////

    public startToPlayANote(note:string, noteVolume:number= 0.7 ){

        switch (this.currentInstrument.name) {
            case "PhatPolySynth":
                (this.currentInstrument.synth  as Synth)
                .triggerAttack(note, Tone.now(), noteVolume);
            break;

            case "Square":
                (this.currentInstrument.synth  as PolySynth)
                .triggerAttack(note, Tone.now(), noteVolume);
            break;

            case "Triangle":
                (this.currentInstrument.synth  as PolySynth)
                .triggerAttack(note, Tone.now(), noteVolume);
            break;

            case "SquareEightSynth":
                (this.currentInstrument.synth  as Synth)
                .triggerAttack(note, Tone.now(), noteVolume);
            break;


            case "FatOscillator":
                (this.currentInstrument.synth  as PolySynth)
                .triggerAttack(note, Tone.now(), noteVolume);
            break;

            case "MembraneSynth":
                (this.currentInstrument.synth  as MembraneSynth)
                .triggerAttack(note, Tone.now(), noteVolume);
            break;

            case "PolySynth":
                (this.currentInstrument.synth  as PolySynth)
                .triggerAttack(note, Tone.now(), noteVolume);
                //.triggerAttack(note);
                //this.currentInstrument.triggerRelease(note,Tone.now()+0.8);
            break;

            case "DuoSynth":
                (this.currentInstrument.synth  as DuoSynth)
                .triggerAttack(note, Tone.now(), noteVolume);
            break;

            case "PluckedSynth":
                (this.currentInstrument.synth  as PluckSynth)
                .triggerAttack(note, Tone.now());
            break;
        
            default:
                break;
        }
    
    }

///////////////////////////////////////////////////////////////////////////

    public stopToPlayANote(note:string){

        console.log(
            "stopping "
            + this.currentInstrument.name
            + " that was playing a " 
            + note
        );

        switch (this.currentInstrument.name) {

            case "Triangle":
                (this.currentInstrument.synth  as PolySynth).triggerRelease(note);//Tone.now())
               // console.log("stopping Triangle that was playing a " + note);
            break;

            case "Square":
                (this.currentInstrument.synth  as PolySynth).triggerRelease(note);
               // console.log("stopping Square that was playing a " + note);
            break;
            case "PhatPolySynth":
                (this.currentInstrument.synth  as PolySynth).triggerRelease(note);//Tone.now())
               // console.log("stopping PhatPolySynth that was playing a " + note);
            break;

            case "SquareEightSynth":
                (this.currentInstrument.synth  as PolySynth).triggerRelease(note);
               // console.log("stopping FatOscillator that was playing a " + note);
            break;

            case "FatOscillator":
                (this.currentInstrument.synth  as PolySynth).triggerRelease(note);
               // console.log("stopping FatOscillator that was playing a " + note);
            break;

            case "MembraneSynth":
                (this.currentInstrument.synth  as MembraneSynth).triggerRelease(note)
               // console.log("stopping MembraneSynth that was playing a " + note);
            break;

            case "PolySynth":
                (this.currentInstrument.synth  as PolySynth).triggerRelease(note)
               // console.log("stopping PolySynth that was playing a " + note);
            break;

            case "DuoSynth":
                (this.currentInstrument.synth  as DuoSynth).triggerRelease(Tone.now())
               // console.log("stopping DuoSynth that was playing a " + note);
            break;

            case "PluckedSynth":
              (this.currentInstrument.synth  as PluckSynth).triggerRelease(Tone.now())
              // console.log("stopping PluckedSynth that was playing a " + note);
            break;
        
            default:
            break;

        }

    }

///////////////////////////////////////////////////////////////////////////

    public stopANote(note:string){

        this.currentInstrument.synth.triggerRelease( note );
        this.currentInstrument.synth.triggerRelease();

    };

///////////////////////////////////////////////////////////////////////////

    public stopAllNotes(){

       // (this.currentInstrument as Synth).dispose();
       //this.createInstrumentFromType(this.currentInstrumentType) 
       // (this.currentInstrument as Synth).connect();

        //Tone.restart();

        // this.phatPolySynth.triggerRelease("+1");
       //  this.phatPolySynth.triggerRelease( note, "+0.21");
       //  this.polySynth.triggerRelease( note, "+0.21" );
 
        // this.currentInstrument.triggerRelease( note, "+0.21" );
         //this.stopHarmonized3rd7th(note);
     };

///////////////////////////////////////////////////////////////////////////    

    // ============================================================== //
    
    private _instruments: Array<any> = new Array<any>();
    public get instruments(): Array<any> {
        return this._instruments;
    }

    public set instruments(value: Array<any>) {
        this._instruments = value;
    };

    private _ajhReverb: Reverb;
    public get ajhReverb(): Reverb {
        return this._ajhReverb;
    }
    public set ajhReverb(value: Reverb) {
        this._ajhReverb = value;
    }

    private _ajhReverb2: Reverb;
    public get ajhReverb2(): Reverb {
        return this._ajhReverb2;
    }
    public set ajhReverb2(value: Reverb) {
        this._ajhReverb2 = value;
    }

    private _lpFilter: Filter = new Filter({
        frequency: 20000,
        type: "lowpass",
        rolloff: -24,
    });
    public get lpFilter(): Filter {
        return this._lpFilter;
    }
    public set lpFilter(value: Filter) {
        this._lpFilter = value;
    }

    private _channel: Channel;
    public get channel(): Channel {
        return this._channel;
    }
    public set channel(value: Channel) {
        this._channel = value;
    }

    // ================================================== //


}