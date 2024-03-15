import AjhModel from "../datamodels/AjhModel";
import AjhPointerEventHandlersObject from "./AjhPointerEventHandlers";

    export default class AjhPointerEvents {


        // ====================================================== //
        
        constructor(

           // pointerHandlers : AjhPointerEventHandlersObject

        ){

            this._modelInstance = AjhModel.Instance;

            this._ajhPointerEventHandlers = new AjhPointerEventHandlersObject();
            
            //pointerHandlers;

            // this.addAllListeners(

            //     this.modelInstance.canvas

            // );

        };

        // ====================================================== //
        
        addAllListeners(

            el:any

        ) {
            
            for (
                let index = 0; 
                index < this._ajhPointerEventHandlers.handlersArray.length; 
                index++
            ) {

                const element 
                = this._ajhPointerEventHandlers.handlersArray[index];

                el.addEventListener(

                    element.handlerType, 
                    element.handlerFunction.bind(this)

                );

            }

        }
        
    // ======================================================================== //
        
        removeAllListeners(

            el:HTMLElement
    
        ) {
                for (
                    let index = 0; 
                    index < this._ajhPointerEventHandlers.handlersArray.length; 
                    index++
                ) {

                    const element 
                    = this._ajhPointerEventHandlers.handlersArray[index];

                    el.removeEventListener(
                        element.handlerType, 
                        element.handlerFunction.bind(this) 
                    );

                }

        }


    // ======================================================================== //
    // GETTERS AND SETTERS :: AJH  //
    // ======================================================================== //

     
    private _ajhPointerEventHandlers : AjhPointerEventHandlersObject 
    = new AjhPointerEventHandlersObject();

    public get ajhPointerEventHandlers() : AjhPointerEventHandlersObject{
        return this._ajhPointerEventHandlers;
    }
    public set ajhPointerEventHandlers ( 
        value : AjhPointerEventHandlersObject 
    ) {
        this._ajhPointerEventHandlers = value;
    }

    private _modelInstance: AjhModel;

}

// ======================================================================== //
