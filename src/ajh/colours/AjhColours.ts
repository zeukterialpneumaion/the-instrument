import { Color } from "three";

export default class AjhColours {


    public seedColours = [
        
        new Color(0x0000ff),
        new Color(0x00ff00),
        new Color(0xff0000),
        new Color(0xffff00),
       
    ];

    private _gold: Color = new Color(0xaaaa00);
    public get gold(): Color {
        return this._gold;
    }
    public set gold(value: Color) {
        this._gold = value;
    }

    private _mutedColour: Color = new Color(0x404040);
    public get mutedColour(): Color {
        return this._mutedColour;
    }
    public set mutedColour(value: Color) {
        this._mutedColour = value;
    }
    //
    private _id: number;

    //
    private _seedColour: Color;
    
       
    //
    private _light: Color;
       

    //
    private _dark: Color;
    
    //
    private _amountOfColours: number;
       
    //
    private _lightdarkArray: Array<Color>;

    //
    private _spectrumArray: Array<Color>;

    private _spectrumLightDarkArray: Array<Array<Color>> 
    = new Array<Array<Color>>();
    public get spectrumLightDarkArray(): Array<Array<Color>> {
        return this._spectrumLightDarkArray;
    }
    public set spectrumLightDarkArray(value: Array<Array<Color>>) {
        this._spectrumLightDarkArray = value;
    }

    // private _spectrumDarkArray: Array<Color>;
    // public get spectrumDarkArray(): Array<Color> {
    //     return this._spectrumDarkArray;
    // }
    // public set spectrumDarkArray(value: Array<Color>) {
    //     this._spectrumDarkArray = value;
    // }
    

    ////////////////////////////////////////////////////////
    
    //
    constructor(
        id : number,
        amountOfColours: number = 24,
        octaves:number
    ) {
        
        this._id = id;
        this._amountOfColours = amountOfColours;
       // this._seedColour = this.seedColours[id]
        // this._lightdarkArray 
        // = this.generateLightToDarkArray(
        //     amountOfColours, 
        //     this.seedColours[id]
        // );
        this._spectrumArray 
        = this.generateSpectrumArray(
            amountOfColours,
            0.2
        );


        this.spectrumLightDarkArray = 
        this.generateSpectrumLightToDarkArray(octaves);

        // this._spectrumLightArray 
        // = this.generateSpectrumArray(
        //     amountOfColours,0.4
        // );

        // this._spectrumDarkArray 
        // = this.generateSpectrumArray(
        //     amountOfColours,0.04 //0.07
        // );

        // this._light 
        // = this.lightdarkArray[this.lightdarkArray.length-1];
        // this._dark = this.lightdarkArray[0];

    }

    //////////////////////////////////////////////////////////////////

    public generateColourArray( amount:number, useSeed:Boolean = false ){

        let outputArray;
        if(useSeed){
            outputArray
            =
            this.generateLightToDarkArray(
                amount,
                this._seedColour
            );
        }
        else {
            outputArray
            =
            this.generateSpectrumArray(amount);
        }

        return outputArray;

    }


        public generateSpectrumArray(
            amount:number = 12, 
            brightness:number = 0.5
        ){

            amount = 12;

            let h = Math.random()*1;
            let s = 0.5;
            let l = 0.3;
        
            let colourArray : Array<Color> = [];
            
            for (let index = 0; index < amount; index++) {
            
            let colour = new Color();
            
            h = 0.000 + ( (index / amount) * 1.00 );
            
            colour.setHSL(h,1,brightness);
            
            colourArray.push(colour)
            
            }

        
            return colourArray;
        
        }

        public  generateLightToDarkArray(
            amount, 
            seedcolour:Color
        ) : Array<Color>
        {
            
            //TODO:: GET THIS WORKING PROPERLY AND LOGICALLY::
            // at the moment i am forcing it to the max possible rows plus the max scale offset
            amount = 11;

            let colourArray : Array<Color> = new Array<Color>();
            
            //dummy initial values
            let h = Math.random()*1;
            let s = 1;
            let l = 0.16;
        
            // create HSL object and populate from seed:
            let seedhsl: any = { 
            h: 0, 
            s: 0, 
            l: 0 
            }; 
            seedcolour.getHSL(seedhsl);
        
        
            /**TODO - sort out these hard wired values !!!*/ 
            for (let index = 0; index < amount; index++) {
            
                let offsetLightness = -0.07;// -(amount/47.33)
                let divisor = 19.33
                let colour = new Color();
                
                l = offsetLightness + (( (index) / amount) * (amount/divisor));
                s = (offsetLightness + (( (index) / amount) * (amount/divisor)))/4;
                // set hue and saturation from seed
                // set lightness from array index value :
                colour.setHSL(
                        seedhsl.h,
                        seedhsl.s - s,
                        seedhsl.l + l
                );
            
                colourArray.push(colour)
            
            }

            return colourArray;
            
        }


        public  generateSpectrumLightToDarkArray(octaves:number): Array<Array<Color>> {

            let spectrums = new Array<Array<Color>>();

            console.log("GENERATING COLOURS FROM SPECTRUM :: LENGTH :: "+this.spectrumArray.length)
            
            for (
                let index = 0; 
                index < this._spectrumArray.length; 
                index++
            ) {


                //spectrums[index] = new Array<Color>();
                spectrums.push(
                    this.generateLightToDarkArray(
                        octaves,
                        this.spectrumArray[index]
                    )
                );

                console.log(
                    "SPECTRUMLD::"
                    +
                    spectrums[spectrums.length-1].length
                    +
                    "::"
                    +
                    +
                    spectrums[spectrums.length-1][0].toJSON()
                )
    
            }

            return spectrums

        }
    
    ///////////////////////////////////////////////////////////////

    private generateRandomColours(amount,colourArray){

        for (let index = 0; index < amount; index++) {
    
          let generatedColour = new Color();
          let r = Math.random();
          let g = Math.random();
          let b = Math.random();
    
          generatedColour.setRGB(r,g,b);
    
          // generatedColour.setHex(Math.round((index/amount) * 0xffffff)
          // .toString(16));
          colourArray.push(generatedColour);
    
          console.log(
            "---> generatedColour: " + colourArray[index].r
          );
    
        }
    
      }

    /////////////////////////////////////////////

    public get id(): number {
        return this._id;
    }

    public get light(): Color {
        return this._light;
    }

    public get dark(): Color {
        return this._dark;
    }

    public get amountOfColours(): number {
        return this._amountOfColours;
    }
    public get seedColour(): Color {
            return this._seedColour;
    }

    public get lightdarkArray(): Array<Color> {
        return this._lightdarkArray;
    }

    public get spectrumArray(): Array<Color> {
        return this._spectrumArray;
    }

    //////////////////////////////////////////////////
    
    public set id(value: number) {
        this._id = value;
    }

    public set light(value: Color) {
        this._light = value;
    }

    public set dark(value: Color) {
        this._dark = value;
    }
    
    public set amountOfColours(value: number) {
        this._amountOfColours = value;
    }
    public set lightdarkArray(value: Array<Color>) {
        this._lightdarkArray = value;
    }
    
    public set seedColour(value: Color) {
        this._seedColour = value;
    }
    
    public set spectrumArray(value: Array<Color>) {
        this._spectrumArray = value;
    }

    //////////////////////////////////////////////////`


}