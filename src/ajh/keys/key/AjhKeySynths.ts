import { DuoSynth, Synth } from "tone";
import AjhSynthDefinition from "../../sonics/AjhSynthDefinition";

export default class AjhKeySonics{

    duosynth : AjhSynthDefinition;

    polysynth : AjhSynthDefinition;

    sawtoothsynth : AjhSynthDefinition;

    squaresynth : AjhSynthDefinition;

    trianglesynth : AjhSynthDefinition;

    sinesynth : AjhSynthDefinition;
    
    constructor(){
    
        this.duosynth = this.createDuoSynth();
    
        this.sawtoothsynth = this.createSawtooth();

        this.sinesynth = this.createSine();

        this.trianglesynth = this.createTriangle();

        this.squaresynth = this.createSquare();

    }

    createSawtooth() : AjhSynthDefinition{

        let synthDef = new AjhSynthDefinition();

        synthDef.name = "Saw";

        synthDef.synth 
        = 
        new Synth(
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
            }
        );

            synthDef.synth.maxPolyphony = 64;
            
        return synthDef;

    }

    createSine() : AjhSynthDefinition{

        let synthDef = new AjhSynthDefinition();

        synthDef.name = "Sine";

        synthDef.synth 
        = new Synth(
            {
                oscillator: {
                    type: "fatsine",
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
            }
        ) 
            
        return synthDef;

    }

    createTriangle() : AjhSynthDefinition{

        let synthDef = new AjhSynthDefinition();

        synthDef.name = "Triangle";

        synthDef.synth 
        = new Synth(
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
            }
        ) 
            
        return synthDef;

    }

    createSquare() : AjhSynthDefinition {

        let synthDef = new AjhSynthDefinition();

        synthDef.name = "Square";

        synthDef.synth 
        = 
        synthDef.synth 
        = 
        new Synth(
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
            }
        )
            
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


}
