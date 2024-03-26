import AjhModel from './ajh/datamodels/AjhModel';

import AjhInit from './ajh/helpers/AjhInit';

// ============================================================ //

let modelInstance = AjhModel.Instance;

let initializer:AjhInit = new AjhInit();

const CANVAS_ID = 'scene';

// ============================================================ //

initializeApplication();

// ============================================================ //

function initializeApplication(){

    modelInstance.canvas 
    = 
    document.querySelector(`canvas#${CANVAS_ID}`);
    
    initializer.init( modelInstance.canvas );

}

// ============================================================ //