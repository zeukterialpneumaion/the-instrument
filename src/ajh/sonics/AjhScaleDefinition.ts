
export default class AjhScaleDefinition {

    intervals : Array<number> 
    scale :Array<string> 
    name : string;

    octaveOffsets: Array<number> = new Array<number>;

    constructor(){

      


    };


    noteNamesOneOctave:Array<string>  
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


    // create(){
        
      
    //     let newscale:Array<string> 
    //     =
    //     new Array<string>();

    //     let newoffsets:Array<number> 
    //     =
    //     new Array<number>();

    //     for (
            
    //         let index = 0; 
    //         index < this.intervals.length; 
    //         index++
        
    //     ) {

    //         const element
    //          = 
    //          this.intervals[
    //             (index)
    //            ];

    //            // if(index < (this.intervals.length) ){
    //                 newoffsets.push(0);
    //             // }
    //             // else{

    //             //     this.octaveOffsets.push(1);

    //             // }

    //             newscale.push( 
    //             this.noteNamesOneOctave[
    //                 (
    //                     element
                        
    //                 )
    //                 %
    //                 this.noteNamesOneOctave.length
    //             ] 
    //         );

    //     }

    //    this.scale = newscale;
        
    //    this.octaveOffsets =  newoffsets;
    // }

    transpose(semitone : number ){

       // this.noteNamesOneOctave.rotate(semitone);

       // this.create();

       
       let newscale:Array<string> 
       =
       new Array<string>();

       let newoffsets:Array<number> 
       =
       new Array<number>();

       for (
           
           let index = 0; 
           index < this.intervals.length; 
           index++
       
       ) {

           const element
            = 
            this.intervals[
               (index)
              ];

              if(index < (this.intervals.length-semitone) ){
                this.octaveOffsets[index] = 0;
              }
              else{

                this.octaveOffsets[index] = 1;

              }
                

               newscale.push( 
               this.noteNamesOneOctave[
                   (

                       ( element + semitone ) 
                       
                   )
                   %
                   this.noteNamesOneOctave.length
               ] 
           );

       }

      this.scale = newscale;
       //this.octaveOffsets =  newoffsets;

       console.log("octaveoffsets :: " 
       +
       this.octaveOffsets.toString())

    };

    reverse(nums, start, end) {
        while (start < end) {
            [nums[start], nums[end]] = [nums[end], nums[start]];
            start++;
            end--;
        }
    }


    rotate(whatArrayToRotate, rotateBy) {
        const n = whatArrayToRotate.length;
        rotateBy %= n;
        
       this.reverse(whatArrayToRotate, 0, n - 1);
       this.reverse(whatArrayToRotate, 0, rotateBy - 1);
       this.reverse(whatArrayToRotate, rotateBy, n - 1);
    }



}