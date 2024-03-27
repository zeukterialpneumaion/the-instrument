import { Color, MathUtils } from "three";
import AjhColours from "../../colours/AjhColours";

export default class AjhKeyColoursDefinition{

        colourFunctions:AjhColours;

        amountOfColours: number;
        
        accidentalsBaseColour:Color;
        accidentalsDarkLightColours : Array<Color> = new Array<Color>();
        
        naturalsBaseColour:Color;
        naturalsDarkLightColours : Array<Color> = new Array<Color>();

        spectrumColours  : Array<Color>;

        spectrumDarkLightColours : Array<Array<Color>>;

        

        constructor( 
            accidentalsBaseColour: string = "#c18c3e",
            naturalsBaseColour: string = "#408080",
            amountOfColours:  number =  7,
            octaves:number
        ){

            this.amountOfColours = amountOfColours;

            this.colourFunctions 
            = 
            new AjhColours(
                MathUtils.randInt(1000,10000),
                this.amountOfColours,
                octaves
            );

            this.accidentalsBaseColour 
            = new Color( accidentalsBaseColour );
            
            this.accidentalsDarkLightColours 
            = 
            this.colourFunctions
                .generateLightToDarkArray(
                    amountOfColours,
                    new Color(accidentalsBaseColour)
                );


            this.naturalsBaseColour 
            = new Color( naturalsBaseColour );

            this.naturalsDarkLightColours = 
            this.colourFunctions
                .generateLightToDarkArray(
                    amountOfColours,
                    new Color(naturalsBaseColour)
                );

            
                this.spectrumColours 
                = 
                this.colourFunctions
                .generateSpectrumArray(
                    this.amountOfColours,
                    0.5
                );

            this.spectrumDarkLightColours 
            = 
            this.colourFunctions.generateSpectrumLightToDarkArray(6);

        }




}