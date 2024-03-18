import { Color } from "three";

export default class AjhKeyColours {


    private _baseColour: Color
    private _highlightColour: Color
    private _onColour: Color
    private _offColour: Color
    private _playingColour: Color;
    private _inactiveColour: Color;
    private _mutedColour: Color;
    

    private _seedColours: Array<Color> 
    = [

        new Color(0xffff00),
        new Color(0xff0000),
        new Color(0x00ff00),
        new Color(0x0000ff),

    ];

    //////////////////////////////////////////////////

    constructor(
        baseColour: Color = new Color(0x00ff00),
        highlightColour: Color = new Color(0x00ff00),
        onColour: Color = new Color(0x00ff00),
        offColour: Color = new Color(0x00ff00)
    ) {

        this._baseColour = baseColour
        this.createHighLightColourFromBaseColour();
        //this._highlightColour = highlightColour
        this._onColour = onColour
        this._offColour = offColour
        this._playingColour 
        = 
        this.generateColourFromBaseColour(

            this._baseColour,
            0.6
            
        );

        this._inactiveColour = new Color(0x707070);

    }

    //////////////////////////////////////////////////
    // internal functions //
    //////////////////////////////////////////////////

    public createHighLightColourFromBaseColour(){
            
        let hslColor:any = new Object(); 

        this._baseColour.getHSL(hslColor);

        hslColor.l = 0.55;
       // hslColor.s = 0.25;

        this.highlightColour = new Color(0xFF00000);
        //this.highlightColour.copy( this._baseColour );

        //HSL is a degree (360) / percentage ,percentage value ::  0-100%
        this.highlightColour
        .setHSL(
            hslColor.h,
            hslColor.s,
            hslColor.l
        );

        // this.highlightColour
        // .setHSL(
        //     .60, .8182, .74314
        // );

        // let amount = 1;
        // this.highlightColour.lerp( new Color(0xff0000), amount )

    }

    private generateColourFromBaseColour(base:Color, brightness = 0.3) {


         // create HSL object and populate from base:
         let seedhsl: any = { 
            h: 0, 
            s: 0, 
            l: 0 
            }; 
            base.getHSL(seedhsl);

        let outputbrightness: number,
            colour = new Color();
       
          
            outputbrightness = 0.003 + ( brightness * 0.9597 );

            // set hue and saturation from seed
            // set lightness from array index value :
            colour.setHSL(
                    seedhsl.h,
                    seedhsl.s,
                    outputbrightness
            );
          
          return colour;

    }

    
    //////////////////////////////////////////////////

    public get offColour(): Color {
        return this._offColour;
    }

    public get onColour(): Color {
        return this._onColour;
    }

    public get highlightColour(): Color {
        return this._highlightColour;
    }

    public get baseColour(): Color {
        return this._baseColour;
    }

    public get playingColour(): Color {
        return this._playingColour;
    }

    public get seedColours(): Array<Color> {
        return this._seedColours;
    }

    public get inactiveColour(): Color {
        return this._inactiveColour;
    }

    public get mutedColour(): Color {
        return this._mutedColour;
    }

    //////////////////////////////////////////////////

    
    public set mutedColour(value: Color) {
        this._mutedColour = value;
    }
    
    public set playingColour(value: Color) {
        this._playingColour = value;
    }

    public set offColour(value: Color) {
        this._offColour = value;
    }

    public set onColour(value: Color) {
        this._onColour = value;
    }

    public set baseColour(value: Color) {

        this._baseColour = value;

        this._highlightColour 
        = this.generateColourFromBaseColour(
            this._baseColour,
            0.2
        );
        this._offColour 
        = this.generateColourFromBaseColour(
            this._baseColour,
            0.1
        );
        this._onColour 
        = this.generateColourFromBaseColour(
            this._baseColour,
            0.4
        );
    }

    public set highlightColour(value: Color) {
        this._highlightColour = value;
    }

    public set inactiveColour(value: Color) {
        this._inactiveColour = value;
    }
    
    public set seedColours(value: Array<Color>) {
        this._seedColours = value;
    }


}