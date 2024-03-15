import AjhModel from './ajh/datamodels/AjhModel';

import AjhThreeInit from './ajh/helpers/AjhThreeInit';

// ============================================================ //

let modelInstance = AjhModel.Instance;

let initializer:AjhThreeInit = new AjhThreeInit();

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