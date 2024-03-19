import { Color } from "three";

export default class AjhKeyColoursDefinition {

    Naturals : Color = new Color();
    Accidentals : Color = new Color();

    constructor(){

        this.setAccidentalsColour(0xc18c3e );
        this.setNaturalsColour( 0x408080 );

    };

    setAccidentalsColour(colour:any){

        this.Accidentals.setHex(colour);

    }

    setNaturalsColour(colour:any){
        
        this.Naturals.setHex(colour);
        
    }

}