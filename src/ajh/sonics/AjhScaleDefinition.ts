
export default class AjhScaleDefinition {

    intervals : Array<number>;
    scale : Array<string>;
    name : string;

    constructor(){};

    private noteNamesOneOctave 
    = 
    [

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

    transpose(semitone : number ){

        this.scale

        let notenames = new Array<string>();

        for (
            
            let index = 0; 
            index < this.intervals.length; 
            index++
        
        ) {

            const element = this.intervals[index];

            notenames.push( 
                this.noteNamesOneOctave[
                    (
                        element
                        + semitone
                    )
                    %
                    this.noteNamesOneOctave.length
                ] 
            );

        }

        this.scale 
        =  notenames;

    };

}