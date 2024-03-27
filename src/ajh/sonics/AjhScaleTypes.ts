import AjhScaleDefinition from "./AjhScaleDefinition";

export default class AjhScaleTypes {

    public SemitoneOffset : number = 0;

    public Major : AjhScaleDefinition;

    public MelodicMinor : AjhScaleDefinition;
    
    public HarmonicicMinor : AjhScaleDefinition;
    
    public MinorThirdFifthSeventh : AjhScaleDefinition;
    
    public Chromatic : AjhScaleDefinition;
    
    public CircleOfFifths : AjhScaleDefinition;
    
    public MinorPentatonic : AjhScaleDefinition;

    public BlackKeys : AjhScaleDefinition;
   
   
    private nMajor : string = "Major";

    private nMelodicMinor : string = "MelodicMinor";
    
    private nHarmonicicMinor : string = "HarmonicMinor";
    
    private nMinorThirdFifthSeventh : string = "MinorThirdFifthSeventh";
    
    private nChromatic : string = "Chromatic";
    
    private nCircleOfFifths : string = "CircleOfFifths";
    
    private nMinorPentatonic  : string = "MinorPentatonic";

    private nBlackKeys  : string = "BlackKeys";

    
    private _Chromatic: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    

    private _Major: Array<number> = [0, 2, 4, 5, 7, 9, 11];
   

    private _MelodicMinor: Array<number> = [0, 2, 3, 5, 7, 8, 11];
   

    private _HarmonicicMinor: Array<number> = [0, 2, 3, 5, 7, 8, 10];
    

    private _MinorThirdFifthSeventh: Array<number> = [0, 3, 7, 10];
   

    private _CircleOfFifths: Array<number> = [7];
   

    private _MinorPentatonic: Array<number> = [ 0, 1, 4, 5, 7, 8, 11 ];
   

    private _BlackKeys: Array<number>  = [1, 3, 6, 8, 10];

    private _noteNamesOneOctave 
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
   

    constructor( semitoneOffset:number = 0 ){

        this.createAllScales( this.SemitoneOffset);

    }

    createAllScales(semitoneOffset :number){

        this.SemitoneOffset = semitoneOffset;

        this.BlackKeys
        = 
        this.createScale(
            this.nBlackKeys,
            this._BlackKeys, this.SemitoneOffset
        );

        this.Chromatic 
        = this.createScale(this.nChromatic,this._Chromatic, this.SemitoneOffset);
    
        this.CircleOfFifths 
        = this.createScale(this.nCircleOfFifths,this._CircleOfFifths, this.SemitoneOffset);
    
        this.HarmonicicMinor 
        = this.createScale(this.nHarmonicicMinor,this._HarmonicicMinor, this.SemitoneOffset);
    
        this.Major 
        = this.createScale(this.nMajor,this._Major, this.SemitoneOffset);

        this.MelodicMinor 
        = this.createScale(this.nMelodicMinor,this._MelodicMinor), this.SemitoneOffset;

        this.MinorPentatonic 
        = this.createScale(this.nMinorPentatonic,this._MinorPentatonic, this.SemitoneOffset);
 
        this.MinorThirdFifthSeventh 
        = 
        this.createScale(
            this.nMinorThirdFifthSeventh,
            this._MinorThirdFifthSeventh, this.SemitoneOffset
        );
 


    }

    createScale( name : string, intervals : Array<number> , offset : number = 0) : AjhScaleDefinition{

        let synthDef = new AjhScaleDefinition();

        synthDef.name = name;

        let notenames = new Array<string>();

        
        let newoffsets:Array<number> 
            =
            new Array<number>();

           
        for (
            
            let index = 0; 
            index < intervals.length; 
            index++
        
        ) {


          const element = intervals[index];

            
         

            notenames.push( 
                this._noteNamesOneOctave[
                    (
                        element
                        + offset
                    )
                    %
                    this._noteNamesOneOctave.length
                ] 
            );

        }

        intervals.forEach((element,index) => {
            if(index > this.SemitoneOffset){
            newoffsets.push(0);
            } else {
                newoffsets.push(1);
            }
        });

        synthDef.scale 
        =  notenames;

        synthDef.intervals 
        =  intervals;

        synthDef.octaveOffsets 
        = newoffsets;

        console.log("scaleType octaveoffsets :: " 
        +
        synthDef.octaveOffsets.toString())

        return synthDef;

    }

    getScaleAndTranspose(

        name:string , 
        offset : number

    ) : AjhScaleDefinition | null 
    {

        let foundScale : AjhScaleDefinition = null;

        let scales : Array<AjhScaleDefinition>
        = 
        [ 
            this.Major,
            this.MelodicMinor,
            this.HarmonicicMinor,
            this.MinorThirdFifthSeventh,
            this.Chromatic,
            this.CircleOfFifths,
            this.MinorPentatonic,
            this.BlackKeys
        ];

        for (
            let index = 0; 
            index < scales.length; 
            index++
        ) {

            const element = scales[index];

            if(element.name == name){

               
                foundScale = element;


            }
            
        } 

        if ( foundScale != null ){
        
            let notenames = new Array<string>();

            let newoffsets:Array<number> 
            =
            new Array<number>();


            for (let index = 0; index < foundScale.intervals.length; index++) {

                const element = foundScale.intervals[index];

                if(index < (foundScale.intervals.length-offset) ){
                    newoffsets.push(1);
                  }
                  else{
    
                    newoffsets.push(0);
    
                  }
            

                notenames.push( 

                    this._noteNamesOneOctave[
                        (
                            element
                            + offset
                        )
                        %
                        this._noteNamesOneOctave.length
                    ] 

                );

            }

            foundScale.scale = notenames;
            
            foundScale.octaveOffsets =  newoffsets;

           

        }

        return foundScale;

    }

    getScaleFromName( name:string ) : AjhScaleDefinition | null {

        let foundScale : AjhScaleDefinition = null;
        let scales : Array<AjhScaleDefinition>
        = 
        [ 
            this.Major,
            this.MelodicMinor,
            this.HarmonicicMinor,
            this.MinorThirdFifthSeventh,
            this.Chromatic,
            this.CircleOfFifths,
            this.MinorPentatonic,
            this.BlackKeys
        ];

        for (let index = 0; index < scales.length; index++) {
            const element = scales[index];

            if(element.name == name){
                foundScale = element;
            }
            
        }

        return foundScale;

    }

    getNoteIndexFromName(name: string) : number | null {

        let noteIndex : number = null;
        for (
            let index = 0; 
            index < this._noteNamesOneOctave.length; 
            index++
        ) {
            const element = this._noteNamesOneOctave[index];

            if(element == name){
                noteIndex = index;
            }
            
        }

        return noteIndex;

    }

}