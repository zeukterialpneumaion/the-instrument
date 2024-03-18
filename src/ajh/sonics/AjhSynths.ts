import { DuoSynth, MembraneSynth, PluckSynth, PolySynth, Synth } from "tone";
import AjhSynthDefinition from "./AjhSynthDefinition";

export default class AjhSynths {

    plucksynth : AjhSynthDefinition;

    membranesynth : AjhSynthDefinition;

    duosynth : AjhSynthDefinition;

    polysynth : AjhSynthDefinition;

    phatpolysynth : AjhSynthDefinition;

    squaresynth : AjhSynthDefinition;

    trianglesynth : AjhSynthDefinition;

    fatoscillator : AjhSynthDefinition;
    
    constructor(){

        this.plucksynth = this.createPluckSynth();

        this.membranesynth = this.createMembraneSynth();
    
        this.duosynth = this.createDuoSynth();
    
        this.polysynth = this.createPolySynth();
    
        this.phatpolysynth = this.createPhatPolySynth();

        this.fatoscillator = this.createFatOscillator();

        this.trianglesynth = this.createTriangle();

        this.squaresynth = this.createSquare();

    }

    createPluckSynth() : AjhSynthDefinition{

        let synthDef = new AjhSynthDefinition();

        synthDef.name = "PluckSynth";

        synthDef.synth 
        =  new PluckSynth();

        return synthDef;

    }

    createFatOscillator() : AjhSynthDefinition{

        let synthDef = new AjhSynthDefinition();

        synthDef.name = "FatOscillator";

        synthDef.synth 
        = new PolySynth(
            Synth, 
            {
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
            })

            synthDef.synth.maxPolyphony = 64;
            
        return synthDef;

    }

    createTriangle() : AjhSynthDefinition{

        let synthDef = new AjhSynthDefinition();

        synthDef.name = "Triangle";

        synthDef.synth 
        = new PolySynth(
            Synth, 
            {
                oscillator: {
                    type: "fattriangle",
                    count: 5,
                    spread: 60
                },
                envelope: {
                    attack: 0.01,
                    decay: 0.1,
                    sustain: 0.5,
                    release: 0.8,
                    attackCurve: "exponential"
                },
            })

            synthDef.synth.maxPolyphony = 64;
            
        return synthDef;

    }

    createSquare() : AjhSynthDefinition {

        let synthDef = new AjhSynthDefinition();

        synthDef.name = "Square";

        synthDef.synth 
        = new PolySynth(
            Synth, 
            {
                oscillator: {
                    type: "fatsquare",
                    count: 8,
                    spread: 60
                },
                envelope: {
                    attack: 0.01,
                    decay: 0.1,
                    sustain: 0.5,
                    release: 0.8,
                    attackCurve: "exponential"
                },
            })

            synthDef.synth.maxPolyphony = 64;
            
        return synthDef;

    }

    createMembraneSynth() : AjhSynthDefinition{

        let synthDef = new AjhSynthDefinition();

        synthDef.name = "MembraneSynth";

        synthDef.synth 
        = new MembraneSynth();

        return synthDef;

    }

    createDuoSynth():AjhSynthDefinition{
      
        let synthDef = new AjhSynthDefinition();

        synthDef.name = "DuoSynth";

        synthDef.synth 
        = 
        new DuoSynth(
            {
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
                }
            );

        return synthDef;

    }

    createPolySynth():any{

        let synthDef = new AjhSynthDefinition();

        synthDef.name = "PolySynth";

        synthDef.synth 
        = 
        new PolySynth(

            Synth, 
            {
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
        );

        return synthDef;

    }

    createPhatPolySynth():AjhSynthDefinition{

        let synthDef = new AjhSynthDefinition();

        synthDef.name = "PhatPolySynth";

        synthDef.synth 
        = 
            new PolySynth(
                
                Synth, 
                {
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
                }
            );
        
        return synthDef;

    }


}
