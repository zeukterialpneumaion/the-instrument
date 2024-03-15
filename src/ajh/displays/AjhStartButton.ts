import * as Tone from "tone";
import AjhModel from "../datamodels/AjhModel";
import AjhInstruments from "../sonics/AjhInstruments";

export default class AjhStartButton {

    private _startButtonInstance;
    public get startButtonInstance() {
        return this._startButtonInstance;
    }
    public set startButtonInstance(value) {
        this._startButtonInstance = value;
    }

    private _titleField;
    public get titleField() {
        return this._titleField;
    }
    public set titleField(value) {
        this._titleField = value;
    }

    private _modelInstance: AjhModel;
    public get modelInstance(): AjhModel {
        return this._modelInstance;
    }
    public set modelInstance(value: AjhModel) {
        this._modelInstance = value;
    }

    constructor(){

        this.createButton();

    };

    createButton(){

        
        document.body.style.margin = "0px";
        document.body.style.boxSizing = "border-box";
       
        this._startButtonInstance 
        = document.createElement('div');

        this._startButtonInstance.style.fontFamily 
        = "Consolas";

        this._startButtonInstance.style.fontSize = "12px";
        
        this._startButtonInstance.style.color = "#ff9800";

        this._startButtonInstance.style.padding = "1.5em";

        this._titleField 
        = document.createElement('div');
        this._startButtonInstance
        .appendChild(this._titleField);
        this._titleField.style.color = "#ff9800";

        async (value) => {

            await Tone.start()
            .then(
                () => {

                    //Transport.start();
                    console.log("starting Tone");
                    this.modelInstance.voices = new AjhInstruments();
                    this.modelInstance.voices.playAChord();

                }
            );

        }

    }

}