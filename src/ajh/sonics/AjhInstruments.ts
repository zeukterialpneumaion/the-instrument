import * as Tone from "tone";
import { Channel, DuoSynth, Filter, Frequency, MembraneSynth, PluckSynth, PolySynth, Reverb, Synth } from "tone";
import AjhModel from "../datamodels/AjhModel";
export default class AjhInstruments{

    private _modelInstance: AjhModel = AjhModel.Instance;
    public get modelInstance(): AjhModel {
        return this._modelInstance;
    }
    public set modelInstance(value: AjhModel) {
        this._modelInstance = value;
    }

    
    private _currentInstrument: any ;
    public get currentInstrument(): any {
        return this._currentInstrument;
    }
    public set currentInstrument(value: any) {
        this._currentInstrument = value;
    }

    private _currentInstrumentType: String;
    public get currentInstrumentType(): String {
        return this._currentInstrumentType;
    }
    public set currentInstrumentType(value: String) {
        this._currentInstrumentType = value;
    }

    constructor(){

        this.channel 
        =
        new Channel({
            pan: 0.0, // + (Math.random()*0.9),
            volume: 0.7,
            mute: false,
            solo: false
        });

        this.ajhReverb = new Reverb( 
            {
                decay: 1.5,
                wet: 0.70,
                preDelay: 0.1
            })

            this.ajhReverb2 = new Reverb( 
                {
                    decay: 0.5,
                    wet: 0.20,
                    preDelay: 0.1
                })

        this._fatOsc  = new Tone.PolySynth(Tone.Synth, {
			oscillator: {
				type: "fatsawtooth",
				count: 3,
				spread: 30
			},
			envelope: {
				attack: 0.01,
				decay: 0.1,
				sustain: 0.5,
				release: 0.8,
				attackCurve: "exponential"
			},
		}).connect(this.ajhReverb)
            .connect(this.channel);
    


        this._membraneOsc 
        = new MembraneSynth()
        .connect(this.ajhReverb)
        .connect(this.channel).toDestination();


        this.pluckedSynth
        = new PluckSynth();
           

           // synth.triggerAttackRelease("C2", "8n");

        //    let synthOptions : SynthOptions = 
        //    {
        //     "volume": 0,
        //     "detune": 0,
        //     "portamento": 0,
        //     "envelope": {
        //         "attack": 0.005,
        //         "attackCurve": "linear",
        //         "decay": 0.1,
        //         "decayCurve": "exponential",
        //         "release": 1,
        //         "releaseCurve": "exponential",
        //         "sustain": 0.3
        //     },
        //     "oscillator": {
        //         "partialCount": 0,
        //         "phase": 0,
        //         "type": "triangle",
        //         "volume" : 0,
        //         "mute" : false,
        //         "onstop" : 
        //     }
        // }

       this.duoSynth 
       = 
        new DuoSynth({
                vibratoAmount: 0.5,
                vibratoRate: 5,
                portamento: 0.1,
                harmonicity: 1.005,
                volume: 5,
                voice0: {
                    oscillator: {
                        type: "sawtooth"
                    },
                    filter: {
                        Q: 1,
                        type: "lowpass",
                        rolloff: -24
                    },
                    envelope: {
                        attack: 0.01,
                        decay: 0.25,
                        sustain: 0.8,
                        release: 1.2
                    },
                    filterEnvelope: {
                        attack: 0.001,
                        decay: 0.05,
                        sustain: 0.3,
                        release: 2,
                        baseFrequency: 100,
                        octaves: 4
                    }
                },
                voice1: {
                    oscillator: {
                        type: "sawtooth"
                    },
                    filter: {
                        Q: 2,
                        type: "bandpass",
                        rolloff: -12
                    },
                    envelope: {
                        attack: 0.25,
                        decay: 4,
                        sustain: 0.1,
                        release: 0.8
                    },
                    filterEnvelope: {
                        attack: 0.05,
                        decay: 0.05,
                        sustain: 0.7,
                        release: 2,
                        baseFrequency: 5000,
                        octaves: -1.5
                    }
                }
            }).connect(this._lpFilter)
            .connect(this.ajhReverb)
            .connect(this.channel);

    

        this.phatPolySynth 
        = 
            new PolySynth(Synth, {
                oscillator: {
                    type: "fattriangle",
                    count: 1,
                    spread: 30
                },
                envelope: {
                    attack: 0.2,
                    decay: 0.1,
                    sustain: 0.5,
                    release: 0.8,
                    attackCurve: "exponential"
                },
            }).connect(this._lpFilter)
            .connect(this.ajhReverb)
            .connect(this.channel);

            this.phatPolySynth.maxPolyphony = 64;

            
          

           this._polySynth = 
            new PolySynth(
                    Synth, {
                        oscillator: {
                            // partials: [0, 2, 3, 4, 7, 13],
                            type: "fatsine",
                            volume: 0.1,
                            count: 1,
                            spread: 30
                        }
                        ,
                envelope: {
                    attack: 0.8,
                    decay: 0.1,
                    sustain: 0.5,
                    release: 0.8,
                    attackCurve: "exponential"
                },
                    }
                ).connect(this._lpFilter)
                .connect(this.ajhReverb)
                .connect(this.channel);

                this._polySynth. maxPolyphony = 64;



            this.instruments.push(this._fatOsc);
            this.instruments.push(this._membraneOsc);
            this.instruments.push(this.pluckedSynth);
            this.instruments.push(this.duoSynth);
            this.instruments.push(this.phatPolySynth);
            this.instruments.push(this.polySynth);

            // _fatOsc,_membraneOsc,pluckedSynth,duoSynth,phatPolySynth,polySynth);

                
        this.channel.toDestination();

        this.currentInstrument = this.phatPolySynth;
        this.currentInstrumentType = "PhatPolySynth";




                // set the attributes across all the voices using 'set'
               // this._polySynth.set({ detune: -1200 });
                // play a chord
                this.playAChord(4);
                //_polySynth.triggerAttackRelease(["C4", "E4", "A4"], 1);


              

    }

    public playAChord(octave:number){

        this._polySynth.triggerAttackRelease(
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

    playHarmonized3rd7th(note){

        let harmony = Frequency(note).harmonize([0, 3, 7,9,11,13,19,23]);

        this.phatPolySynth.triggerAttackRelease(
            [
                harmony[0].toFrequency(),
                harmony[1].toFrequency(),
                harmony[2].toFrequency(),
                // harmony[3].toFrequency(),
                // harmony[4].toFrequency(),
                // harmony[5].toFrequency(),
                // harmony[6].toFrequency(),
                // harmony[7].toFrequency()
            ],
            2.5,

        );
    }

    stopHarmonized3rd7th(note){

        let harmony = Frequency(note).harmonize([0, 3, 7]);

        this.phatPolySynth.triggerRelease(
            [
                harmony[0].toFrequency(),
                harmony[1].toFrequency(),
                harmony[2].toFrequency()
            ]
        );

    }

    public playANote(note:string){
        
        // this.phatPolySynth.triggerAttack(note );
        // this.polySynth.triggerAttack(note);
        
        switch (this.currentInstrumentType) {
            case "PhatPolySynth":
                (this.currentInstrument as Synth)
                .triggerAttackRelease(note, 0.5, Tone.now(), 0.8);
            break;

            case "FatOscillator":
                (this.currentInstrument as PolySynth)
                .triggerAttackRelease(note, 0.5, Tone.now(), 0.8);
            break;

            case "MembraneSynth":
                (this.currentInstrument as MembraneSynth)
                .triggerAttackRelease(note, 0.5, Tone.now(), 0.8);
            break;

            case "PolySynth":
                (this.currentInstrument as PolySynth)
                .triggerAttackRelease(note, 0.5, Tone.now(), 0.8);
                //.triggerAttack(note);
                //this.currentInstrument.triggerRelease(note,Tone.now()+0.8);
            break;

            case "DuoSynth":
                (this.currentInstrument as DuoSynth)
                .triggerAttackRelease(note, 0.5, Tone.now(), 0.8);
            break;

            case "PluckedSynth":
                (this.currentInstrument as PluckSynth)
                .triggerAttack(note, Tone.now());
            break;
        
            default:
                break;
        }

        if((this.currentInstrumentType == "PolySynth" )){};

       
        //this.playHarmonized3rd7th(note);
    
    }

    public startToPlayANote(note:string){
        
        // this.phatPolySynth.triggerAttack(note );
        // this.polySynth.triggerAttack(note);
        
        switch (this.currentInstrumentType) {
            case "PhatPolySynth":
                (this.currentInstrument as Synth)
                .triggerAttack(note, Tone.now(), 0.8);
            break;

            case "FatOscillator":
                (this.currentInstrument as PolySynth)
                .triggerAttack(note, Tone.now(), 0.8);
            break;

            case "MembraneSynth":
                (this.currentInstrument as MembraneSynth)
                .triggerAttack(note, Tone.now(), 0.8);
            break;

            case "PolySynth":
                (this.currentInstrument as PolySynth)
                .triggerAttack(note, Tone.now(), 0.8);
                //.triggerAttack(note);
                //this.currentInstrument.triggerRelease(note,Tone.now()+0.8);
            break;

            case "DuoSynth":
                (this.currentInstrument as DuoSynth)
                .triggerAttack(note, Tone.now(), 0.8);
            break;

            case "PluckedSynth":
                (this.currentInstrument as PluckSynth)
                .triggerAttack(note, Tone.now());
            break;
        
            default:
                break;
        }

        if((this.currentInstrumentType == "PolySynth" )){};

       
        //this.playHarmonized3rd7th(note);
    
    }


    public stopToPlayANote(note:string){
        
        // this.phatPolySynth.triggerAttack(note );
        // this.polySynth.triggerAttack(note);
        
        switch (this.currentInstrumentType) {
            case "PhatPolySynth":
                (this.currentInstrument as Synth).triggerRelease()//Tone.now())
                // .triggerAttackRelease(note, 0.5, Tone.now(), 0.8);
            break;

            case "FatOscillator":
                (this.currentInstrument as PolySynth).triggerRelease(note)
                    //   .triggerAttackRelease(note, 0.5, Tone.now(), 0.8);
            break;

            case "MembraneSynth":
                (this.currentInstrument as MembraneSynth).triggerRelease(note)
                // .triggerAttackRelease(note, 0.5, Tone.now(), 0.8);
            break;

            case "PolySynth":
                (this.currentInstrument as PolySynth).triggerRelease(note)
                // .triggerAttackRelease(note, 0.5, Tone.now(), 0.8);
                //.triggerAttack(note);
                //this.currentInstrument.triggerRelease(note,Tone.now()+0.8);
            break;

            case "DuoSynth":
                (this.currentInstrument as DuoSynth).triggerRelease(Tone.now())
                // .triggerAttackRelease(note, 0.5, Tone.now(), 0.8);
            break;

            case "PluckedSynth":
            //    (this.currentInstrument as PluckSynth).triggerRelease(Tone.now())
                // .triggerAttack(note, Tone.now());
            break;
        
            default:
                break;
        }

        if((this.currentInstrumentType == "PolySynth" )){};

       
        //this.playHarmonized3rd7th(note);
    
    }

    public stopANote(note:string){
       // this.phatPolySynth.triggerRelease("+1");
      //  this.phatPolySynth.triggerRelease( note, "+0.21");
      //  this.polySynth.triggerRelease( note, "+0.21" );

        this.currentInstrument.triggerRelease( note, "+0.21" );
        //this.stopHarmonized3rd7th(note);
    };

    // ============================================================== //
    
    private _instruments: Array<any> = new Array<any>();
    public get instruments(): Array<any> {
        return this._instruments;
    }
    public set instruments(value: Array<any>) {
        this._instruments = value;
    }

    private _pluckedSynth: PluckSynth;
    public get pluckedSynth(): PluckSynth {
        return this._pluckedSynth;
    }
    public set pluckedSynth(value: PluckSynth) {
        this._pluckedSynth = value;
    }

    private _fatOsc: PolySynth;
    public get fatOsc(): PolySynth {
        return this._fatOsc;
    }
    public set fatOsc(value: PolySynth) {
        this._fatOsc = value;
    }

    private _membraneOsc: MembraneSynth;
    public get membraneOsc(): MembraneSynth {
        return this._membraneOsc;
    }
    public set membraneOsc(value: MembraneSynth) {
        this._membraneOsc = value;
    }

    private _polySynth: PolySynth;
    public get polySynth(): PolySynth {
        return this._polySynth;
    }
    public set polySynth(value: PolySynth) {
        this._polySynth = value;
    }

    private _phatPolySynth: PolySynth;
    public get phatPolySynth(): PolySynth {
        return this._phatPolySynth;
    }
    public set phatPolySynth(value: PolySynth) {
        this._phatPolySynth = value;
    }

    private _duoSynth: DuoSynth;
    public get duoSynth(): DuoSynth {
        return this._duoSynth;
    }
    public set duoSynth(value: DuoSynth) {
        this._duoSynth = value;
    }

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