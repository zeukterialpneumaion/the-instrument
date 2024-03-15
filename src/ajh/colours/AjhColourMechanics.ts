///////////////////////////////////////////////////////////////

import { Color } from "three";

function generateRandomColours(amount,colourArray){

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

///////////////////////////////////////////////////////////////

function generateRandomColour(){

    

      let generatedColour = new Color();
      let r = Math.random();
      let g = Math.random();
      let b = Math.random();

      generatedColour.setRGB(r,g,b);

      return generatedColour;

    }

///////////////////////////////////////////////////////////////

function generateLightToDarkColourArray(amount, seedcolour:Color){

    let h = Math.random()*1;
    let s = 1;
    let l = 0.16;



    let colourArray : Array<Color> = [];
    
    for (let index = 0; index < amount; index++) {
      
      let colour = new Color();
      
      l = 0.026 + ( (index / amount) * 0.6 );

      let seedhsl: any = { 
        h: 0, 
        s: 0, 
        l: 0 
      }; 
      seedcolour.getHSL(seedhsl);
      
      colour.setHSL(seedhsl.h,seedhsl.s,l);
      
      colourArray.push(colour)
      
    }

    let colourOff = new Color();

    colourOff.setHSL(h,s,l);

    //h = 0.2;//r;
    s = 1;//g;
    l = 0.45;//b;

    let colourOn = new Color();

    colourOn.setHSL(h,s,l);


    return colourArray;

}

///////////////////////////////////////////////////////////////
 
export {
  generateLightToDarkColourArray, generateRandomColour,
  generateRandomColours
};

///////////////////////////////////////////////////////////////
 
