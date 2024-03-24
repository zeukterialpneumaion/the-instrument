import { Destination } from "tone";
import AjhModel from "../datamodels/AjhModel";
import AjhSynths from "../sonics/AjhSynths";

///////////////////////////////////////////////////

export default class AjhGUIControls {

        ///////////////////////////////////////////////////
        
            // private _gui: GUI;
            // public get gui(): GUI {
            //     return this._gui;
            // }
            // public set gui(value: GUI) {
            //     this._gui = value;
            // }

        ///////////////////////////////////////////////////

            private _modelInstance: AjhModel 
           // = AjhModel.Instance;
        
            public get modelInstance(): AjhModel {
                return this._modelInstance;
            }

        ///////////////////////////////////////////////////

            constructor(){

           ///////////////////////////////////////////////////
      
            // const setItem = localStorage.setItem;
            // localStorage.constructor.prototype.setItem = (key, value) => setItem.apply(localStorage, [location.pathname + ':' + key, value])

            // const getItem = localStorage.getItem;
            // localStorage.constructor.prototype.getItem = (key) => getItem.apply(localStorage, [location.pathname + ':' + key]);

            // const removeItem = localStorage.removeItem;
            // localStorage.constructor.prototype.removeItem = (key) => removeItem.apply(localStorage, [location.pathname + ':' + key]);

            
             ///////////////////////////////////////////////////
                
              this._modelInstance = AjhModel.Instance;

            }

        ///////////////////////////////////////////////////

       

// ============================================================ //
// ==== 🐞 ADD DEBUG GUI ==== //🐞
// ============================================================ //

populateGUI( drag:boolean = false )  {

    let volObj = { volume: 0.7 }
    this.modelInstance.gui.add(

        volObj,
         "volume"
    )
    .min(0)
    .max(1)
    .step(0.01)
    .name("volume")
    .onChange(
        function( v ) {

            console.log("VOLUME:" + v);
            Destination.volume.value = (1 - v ) * (-36);
            
        }
    );

    //this.modelInstance.gui.add(

        //this.modelInstance.instruments.volume,
        //"mute"

    //);
    
        const soundsFolder =  this.modelInstance.gui.addFolder('sound controls').close();
      
                let synthsObj = { instrument: 'PolySynth' };

                soundsFolder.add(

                    synthsObj, 
                    'instrument', 
                    [ 
                        
                        'Sine', 
                        'Sawtooth',
                        'Square', 
                        'Triangle',
                        'WideSine', 

                    ]

                )
                .onChange(
                    function( v ) { 
                    
                        console.log( 'The current synth is now a ' + v );

  // _fatOsc,_membraneOsc,pluckedSynth,duoSynth,phatPolySynth,polySynth);

                        switch (v) {
                            
                            case 'FatOscillator':
                                this.modelInstance.instruments.currentInstrument  =
                                (this.modelInstance.instruments.synths as AjhSynths).fatoscillator 
                                 break;

                            case 'Sawtooth':
                                this.modelInstance.instruments.currentInstrument  =
                                 (this.modelInstance.instruments.synths as AjhSynths).fatoscillator; 
                                 break;

                            case 'Square':
                                this.modelInstance.instruments.currentInstrument  =
                                (this.modelInstance.instruments.synths as AjhSynths).squaresynth; 
                                break;

                        
                            case 'Triangle':
                                this.modelInstance.instruments.currentInstrument  =
                                (this.modelInstance.instruments.synths as AjhSynths).trianglesynth; 
                                break;        

                            case 'WideSine':
                                this.modelInstance.instruments.currentInstrument  =
                                (this.modelInstance.instruments.synths as AjhSynths).phatpolysynth; 
                                break;

                            case 'Sine':
                                this.modelInstance.instruments.currentInstrument  =
                                (this.modelInstance.instruments.synths as AjhSynths).polysynth; 
                                break;

                            default:
                                break;

                        };

                    } .bind(this)
                );
        
                let scalesObj = { scale: 'chromatic' };

                soundsFolder.add(

                    scalesObj, 
                    'scale', 
                    [

                        'Chromatic', 
                        'Major', 
                        'MelodicMinor',
                        'HarmonicMinor',
                        'MinorThirdFifthSeventh',
                        'MinorPentatonic',
                        "BlackKeys",
                        // 'CircleOfFifths',

                    ]

                )
                .name("scale")
                .onChange(function(evt){

                    this.modelInstance.currentKeyBoard.scaleType
                    =
                    this.modelInstance.scaleTypes.getScaleFromName(evt); 

                    this.modelInstance.currentKeyBoard
                    .createKeys( 
                        ""
                    );

                }.bind(this));


                // set octave 
                    let octaveObj = { octave: 3 };

                    soundsFolder.add(

                        octaveObj, 
                        'octave'
                    
                    )
                    .min(0)
                    .max(5)
                    .step(1)
                    .name("octave to start from")
                    .onChange(
                        
                        function(evt){

                        
                            this.modelInstance
                            .currentKeyBoard
                            .octaveToStartFrom = (evt);

                            this.modelInstance.currentKeyBoard
                            .createKeys(
                                ""
                            );
                            

                        }.bind(this)

                    );

                // set offset 
                    let offsetObj = { offset: 0 };

                    soundsFolder.add(

                        offsetObj, 
                        'offset'
                    
                    )
                    .min(0)
                    .max(11)
                    .step(1)
                    .name("semitone offset")
                    .onChange(
                        
                        function(evt){

                            this.modelInstance
                            .currentKeyBoard
                            .semitoneOffset 
                            = evt;
                            
                            // transpose scale
                            this.modelInstance
                            .currentKeyBoard
                            .scaleType.transpose(evt);

                            this.modelInstance.currentKeyBoard
                            .createKeys(
                                ""
                            );
                            

                        }.bind(this)

                    );

        const viewsFolder 
        =  
        this.modelInstance.gui.addFolder('change display').close();
        
        viewsFolder.add(
            this._modelInstance.currentKeyBoard, 
            'numberOfColumns', 
            2,32,1
        ).name("number of keys").onChange(function(evt){

        
            console.log("setting key columns:"+ evt.value);

            this.modelInstance.currentKeyBoard
                    .createKeys(
                        ""
                    );

        }.bind(this));

        viewsFolder.add(
            this._modelInstance.currentKeyBoard, 
            'numberOfRows', 
            1,13,1
        ).name("number of rows").onChange(function(evt){

        
            console.log("setting key rows:"+ evt.value);

            this.modelInstance.currentKeyBoard
                    .createKeys(
                        ""
                    );

        }.bind(this));

        const  colourfolder
        =
        viewsFolder.addFolder("colours");

        colourfolder.add(
            this._modelInstance, 
            'useSpectrumColours'
        ).name("toggle Spectrum Colours").onChange(
            function(evt){

                // this._modelInstance.currentKeyBoard.createKeys();
                this._modelInstance.currentKeyBoard.repaintKeyBodies();

            }.bind(this)
        ) 

       
        let colourObj = {
            naturals: '#408080',
            accidentals: '#c18c3e',
            color3: 'rgb(170, 0, 255)',
            color4: 0xaa00ff
        }

       
        colourfolder.addColor( colourObj, 'naturals' ).onChange(

            function(data){

                this._modelInstance
                .currentKeyBoard
                .KeyColoursDef
                .setNaturalsColour(data.toString().replace('#', '0x') );

                console.log("COLOUR SET: " + data.toString().replace('#', '0x') );

                this._modelInstance.currentKeyBoard.createKeys();
                this._modelInstance.currentKeyBoard.repaintKeyBodies();
                // this._modelInstance.currentKeyBoard.repaintKeyBodies();

            }.bind(this)

        );

        colourfolder.addColor( colourObj, 'accidentals' ).onChange(

            function(data){

                this._modelInstance
                    .currentKeyBoard
                    .KeyColoursDef
                    .setAccidentalsColour( data.toString().replace('#', '0x') );

                    console.log("COLOUR SET: " + data.toString().replace('#', '0x')  );
                // this._modelInstance.currentKeyBoard.repaintKeyBodies();

            }.bind(this)
            
        );

        colourfolder.close();
        viewsFolder.close();

        let stateFolder = this.modelInstance.gui.addFolder("state")

        let statsShow = { show : false }
        stateFolder.add(statsShow, "show",).name("stats").onChange(

            function(evt){

                if(evt){

                    document.body.appendChild(this.modelInstance.Stats.dom);

                } else {

                    document.body.removeChild(this.modelInstance.Stats.dom);

                }
       
            }.bind(this)

        )

        let infoShow = { show : false }
        stateFolder.add(infoShow, "show",).name("info").onChange(

            function(evt){

                if(evt){

                    this.modelInstance.initialScreen.show();

                } else {

                    this.modelInstance.initialScreen.hide();

                }
       
            }.bind(this)

        )


        let debugShow = { show : false }
        stateFolder.add(debugShow, "show",).name("debug").onChange(

            function(evt){

                if(evt){

                    this.modelInstance.informationWindow.show();

                } else {

                    this.modelInstance.informationWindow.hide();

                }
       
            }.bind(this)

        )

        const cameraFolder 
        =   
        stateFolder.addFolder('camera').close();
        // cameraFolder.add( this.modelInstance.cameraOrbitControls, 'autoRotate');
            cameraFolder.add( this.modelInstance.cameraOrbitControls, 'enabled').onChange(
                function(evt){
                this.modelInstance.toggleOrbitCameraEnabled(this.modelInstance.cameraOrbitControls.enabled)
                }.bind(this)
            )
        stateFolder.close();
       

        // if(drag){

        //     const controlsFolder =   this.modelInstance.gui.addFolder('Controls');
        //     controlsFolder.add(this.modelInstance.dragControls, 'enabled').name('drag controls');

        //     const lightsFolder =   this.modelInstance.gui.addFolder('Lights').close();

        //     lightsFolder.add(this.modelInstance.pointLights[0], 'visible').name('point light');
        //     lightsFolder.add(this.modelInstance.ambientLight, 'visible').name('ambient light');
        
        //     // const helpersFolder =  this.modelInstance.gui.addFolder('Helpers');
        //     // helpersFolder.add(this.axesHelper, 'visible').name('axes');
        //     // helpersFolder.add(this.modelInstance.pointLightHelper, 'visible').name('pointLight');
        
          

        // };

       

        // let functionobj 
        // = 
        // {
        //     fun: this.modelInstance.fitCameraToSelection
        // }
        // this.modelInstance.gui.add(functionobj,"fun").name('reset camera position');
    
        // // persist GUI state in local storage on changes
        this.modelInstance.gui.onFinishChange(
            () => {

                const guiState 
                =   
                this.modelInstance.gui.save();

                localStorage.setItem( 
                    'guiState', 
                    JSON.stringify(guiState) 
                );
            
            }
        );

        
        // load GUI state if available in local storage
        const guiState = localStorage.getItem('guiState')
        if (guiState)  this.modelInstance.gui.load(JSON.parse(guiState))
    
        // reset GUI state button
        const resetGui = () => {
          localStorage.removeItem('guiState')
           this.modelInstance.gui.reset()
        }

       
        stateFolder.add({ resetGui }, 'resetGui').name('reset local storage')
       
         this.modelInstance.gui.close()

    }


}

///////////////////////////////////////////////////
