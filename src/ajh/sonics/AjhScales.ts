import AjhScaleTypes from "./AjhScaleTypes";

export default class AjhScales{

    public scaleTypes : AjhScaleTypes = new AjhScaleTypes();

    private _Majors: Array<number> = [0, 2, 4, 5, 6, 8, 10];
    public get Majors(): Array<number> {
        return this._Majors;
    }
    public set Majors(value: Array<number>) {
        this._Majors = value;
    }

    private _MelodicMinors: Array<number> = [0, 2, 3, 5, 7, 8, 11];
    public get MelodicMinors(): Array<number> {
        return this._MelodicMinors;
    }
    public set MelodicMinors(value: Array<number>) {
        this._MelodicMinors = value;
    }

    private _HarmonicicMinors: Array<number> = [0, 2, 3, 5, 7, 8, 10];
    public get HarmonicicMinors(): Array<number> {
        return this._HarmonicicMinors;
    }
    public set HarmonicicMinors(value: Array<number>) {
        this._HarmonicicMinors = value;
    }

    private _MinorThirdFifthSeventh: Array<number> = [0, 3, 7, 10];
    public get MinorThirdFifthSeventh(): Array<number> {
        return this._MinorThirdFifthSeventh;
    }
    public set MinorThirdFifthSeventh(value: Array<number>) {
        this._MinorThirdFifthSeventh = value;
    }

    private _CircleOfFifths: Array<number> 
    = [0, 7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77];
    public get CircleOfFifths(): Array<number> {
        return this._CircleOfFifths;
    }
    public set CircleOfFifths(value: Array<number>) {
        this._CircleOfFifths = value;
    }

    private _MinorPentatonic: Array<number> = [ 0,3,5,7,11 ];
    public get MinorPentatonic(): Array<number> {
        return this._MinorPentatonic;
    }
    public set MinorPentatonic(value: Array<number>) {
        this._MinorPentatonic = value;
    }

    constructor(){

    }

// ============================================================ //

    private _noteNamesOneOctave = [
        "C",
        "C#",
        "D",
        "D#",
        "E",
        "F",
        "F#",
        "G",
        "G#",
        "A",
        "A#",
        "B"
    ];

    public get noteNamesOneOctave() {
        return this._noteNamesOneOctave;
    }
    public set noteNamesOneOctave(value) {
        this._noteNamesOneOctave = value;
    };

// ============================================================ //

        private _noteNamesWithOctaveRegister = [
            "C0",
            "C#0",
            "D0",
            "D#0",
            "E0",
            "F0",
            "F#0",
            "G0",
            "G#0",
            "A0",
            "A#0",
            "B0",

            "C1",
            "C#1",
            "D1",
            "D#1",
            "E1",
            "F1",
            "F#1",
            "G1",
            "G#1",
            "A1",
            "A#1",
            "B1",

            "C2",
            "C#2",
            "D2",
            "D#2",
            "E2",
            "F2",
            "F#2",
            "G2",
            "G#2",
            "A2",
            "A#2",
            "B2",

            "C3",
            "C#3",
            "D3",
            "D#3",
            "E3",
            "F3",
            "F#3",
            "G3",
            "G#3",
            "A3",
            "A#3",
            "B3",

            "C4",
            "C#4",
            "D4",
            "D#4",
            "E4",
            "F4",
            "F#4",
            "G4",
            "G#4",
            "A4",
            "A#4",
            "B4",

            "C5",
            "C#5",
            "D5",
            "D#5",
            "E5",
            "F5",
            "F#5",
            "G5",
            "G#5",
            "A5",
            "A#5",
            "B5",

            "C6",
            "C#6",
            "D6",
            "D#6",
            "E6",
            "F6",
            "F#6",
            "G6",
            "G#6",
            "A6",
            "A#6",
            "B6",

            "C7",
            "C#7",
            "D7",
            "D#7",
            "E7",
            "F7",
            "F#7",
            "G7",
            "G#7",
            "A7",
            "A#7",
            "B7",

            "C8",
            "C#8",
            "D8",
            "D#8",
            "E8",
            "F8",
            "F#8",
            "G8",
            "G#8",
            "A8",
            "A#8",
            "B8",

            "C9",
            "C#9",
            "D9",
            "D#9",
            "E9",
            "F9",
            "F#9",
            "G9",
            "G#9",
            "A9",
            "A#9",
            "B9",
        ];
    
        public get noteNamesWithOctaveRegister() {
            return this._noteNamesWithOctaveRegister;
        }
        public set noteNamesWithOctaveRegister(value) {
            this._noteNamesWithOctaveRegister = value;
        }

    // ============================================================ //

        private _noteSpeeds = [

            "64n",
            "64n",
            "32t",
            "32n",
            "16t",
            "16n",
            "8t",
            "8n",
            "4t",
            "4n",
            "2t",
            "2n",
            "1t",
            "1n",
            "64t"


        ];

    // ============================================================ //

        public pitches =
            [

                261.63,
                277.18,
                293.66,
                311.13,
                329.63,
                349.23,
                369.99,
                392.00,
                415.30,
                440.00,
                466.16,
                493.88,
                523.25

            ];

    // ============================================================ //

}