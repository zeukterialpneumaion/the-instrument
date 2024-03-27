import { Color } from "three";

export default class AjhKeyColoursOldDefinition {

    Naturals : Color = new Color();
    Accidentals : Color = new Color();

    constructor(){

        this.setAccidentalsColourByHex(0xc18c3e );
        this.setNaturalsColourByHex( 0x408080 );

    };

    setAccidentalsColourByHex(colour:any){

        this.Accidentals.setHex(colour);

    }

    setNaturalsColourByHex(colour:any){
        
        this.Naturals.setHex(colour);
        
    }

}