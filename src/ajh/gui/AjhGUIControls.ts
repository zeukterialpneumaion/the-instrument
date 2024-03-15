import AjhModel from "../datamodels/AjhModel";

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

                
            const setItem = localStorage.setItem;
            localStorage.constructor.prototype.setItem = (key, value) => setItem.apply(localStorage, [location.pathname + ':' + key, value])

            const getItem = localStorage.getItem;
            localStorage.constructor.prototype.getItem = (key) => getItem.apply(localStorage, [location.pathname + ':' + key]);

            const removeItem = localStorage.removeItem;
            localStorage.constructor.prototype.removeItem = (key) => removeItem.apply(localStorage, [location.pathname + ':' + key]);

            //  this.modelInstance.gui = new GUI();
               this._modelInstance = AjhModel.Instance;

             // this.populateGUI( false );

               // this._gui =  this.modelInstance.gui;
            }

        ///////////////////////////////////////////////////

       

// ============================================================ //
// ==== 🐞 ADD DEBUG GUI ==== //🐞
// ============================================================ //

populateGUI( drag:boolean = false )  {


   
    
        const soundsFolder =  this.modelInstance.gui.addFolder('sound controls').close();
       // let vol:Channel = this.modelInstance.instruments.channel as Channel;
        //vol.v
                // soundFolder.add(vol, "volume")
                //     .min(0.02)
                //     .max(0.8)
                //     .step(0.01)
                //     .name("volume");
                //let instrument = this.modelInstance.instruments.currentInstrument;
        
                let synthsObj = { instrument: 'PolySynth' }
                soundsFolder.add(
                    synthsObj, 
                    'instrument', 
                    [ 
                        
                       // 'PluckedSynth', 
                        'PolySynth', 
                        'PhatPolySynth',
                        'FatOscillator', 
                       // 'DuoSynth',
                       // 'MembraneSynth'
                    ]
                )
                .onChange(
                    function( v ) {

                        try{

                            this._modelInstance.musicalKeyEventEmitter.emit(
                                "onPointerUp", 
                                this._modelInstance.selectedKeys.selectedKeys[0].bodyName,
                                this._modelInstance.selectedKeys.selectedKeys[0].bodyId,
                                this._modelInstance.selectedKeys.selectedKeys[0].bodyUUID,
                            )
                
                       console.log("pointerup  >> id: " + 0)
                
                    }
                    catch(e){
                
                        console.log(e);
                
                    }
                
                    
                        console.log( 'The value is now ' + v );
                        switch (v) {
                            case 'FatOscillator':
                                this.modelInstance.instruments.currentInstrument =
                                this.modelInstance.instruments.instruments[0];
                                this.modelInstance.instruments.currentInstrumentType =  'FatOscillator';
                                break;
  // _fatOsc,_membraneOsc,pluckedSynth,duoSynth,phatPolySynth,polySynth);
                                case 'MembraneSynth':
                                    this.modelInstance.instruments.currentInstrument =
                                    this.modelInstance.instruments.instruments[1];
                                    this.modelInstance.instruments.currentInstrumentType =  'MembraneSynth';
                                    break;
    

                            case 'PluckedSynth':
                                this.modelInstance.instruments.currentInstrument =
                                this.modelInstance.instruments.instruments[2];
                                this.modelInstance.instruments.currentInstrumentType =  'PluckedSynth';
                                break;

                        
                            case 'DuoSynth':
                                this.modelInstance.instruments.currentInstrument =
                                this.modelInstance.instruments.instruments[3];
                                this.modelInstance.instruments.currentInstrumentType =  'DuoSynth';
                                break;        

                            case 'PhatPolySynth':
                                this.modelInstance.instruments.currentInstrument =
                                this.modelInstance.instruments.instruments[4];
                                this.modelInstance.instruments.currentInstrumentType =  'PhatPolySynth';
                                break;

                            case 'PolySynth':
                                this.modelInstance.instruments.currentInstrument =
                                this.modelInstance.instruments.instruments[5];
                                this.modelInstance.instruments.currentInstrumentType =  'PolySynth';
                                break;


                            default:
                                break;

                        }
                    } .bind(this)
                );
        
                let scalesObj = { scale: 'chromatic' }
                soundsFolder.add(
                    scalesObj, 
                    'scale', 
                    [ 
                        'Chromatic', 
                        'CMajor', 
                        'EbMinor', 
                        'CircleOfFifths',
                        'MinorThirds' 
                    ]
                ).name("choose scale (TODO!)").onChange(function(evt){});

                
      //      });
       // });

       
        const viewsFolder =  this.modelInstance.gui.addFolder('change display').close();
        
        viewsFolder.add(
            this._modelInstance, 
            'useSpectrumColours'
        ).name("toggle KeyColours").onChange(
            function(evt){


                this._modelInstance.currentKeyBoard.repaintKeyBodies();

            }.bind(this)
        ) 
       
        viewsFolder.add(
            this._modelInstance.currentKeyBoard, 
            'numberOfColumns', 
            8,32,1
        ).name("number of keys").onChange(function(evt){

                try{

                    this._modelInstance.musicalKeyEventEmitter.emit(
                        "onPointerUp", 
                        this._modelInstance.selectedKeys.selectedKeys[0].bodyName,
                        this._modelInstance.selectedKeys.selectedKeys[0].bodyId,
                        this._modelInstance.selectedKeys.selectedKeys[0].bodyUUID,
                    )
        
               console.log("pointerup  >> id: " + 0)
        
            }
            catch(e){
        
                console.log(e);
        
            }
        
            console.log("setting key columns:"+ evt.value);
           this._modelInstance.currentKeyBoard.createKeys();

        }.bind(this));

        // viewsFolder.add(
        //     this._modelInstance.currentKeyBoard, 
        //     'numberOfRows', 
        //     1,5,1
        // ).name("number of rows of keys").onChange(function(evt){


        //     console.log("setting key rows:"+ evt.value);
        //    this._modelInstance.currentKeyBoard.createKeys();

        // }.bind(this));
       

        if(drag){

            const controlsFolder =   this.modelInstance.gui.addFolder('Controls');
            controlsFolder.add(this.modelInstance.dragControls, 'enabled').name('drag controls');

        };

        const lightsFolder =   this.modelInstance.gui.addFolder('Lights').close();

        lightsFolder.add(this.modelInstance.pointLights[0], 'visible').name('point light');
        lightsFolder.add(this.modelInstance.ambientLight, 'visible').name('ambient light');
    
        // const helpersFolder =  this.modelInstance.gui.addFolder('Helpers');
        // helpersFolder.add(this.axesHelper, 'visible').name('axes');
        // helpersFolder.add(this.modelInstance.pointLightHelper, 'visible').name('pointLight');
    
        const cameraFolder =   this.modelInstance.gui.addFolder('camera').close();
       // cameraFolder.add( this.modelInstance.cameraOrbitControls, 'autoRotate');
        cameraFolder.add( this.modelInstance.cameraOrbitControls, 'enabled').onChange(
            function(evt){
            this.modelInstance.toggleOrbitCameraEnabled(this.modelInstance.cameraOrbitControls.enabled)
            }.bind(this)
        )

        // let functionobj 
        // = 
        // {
        //     fun: this.modelInstance.fitCameraToSelection
        // }
        // this.modelInstance.gui.add(functionobj,"fun").name('reset camera position');
    
        // // persist GUI state in local storage on changes
        //   this.modelInstance.gui.onFinishChange(() => {

        //   const guiState =   this.modelInstance.gui.save();
        //   localStorage.setItem('guiState', JSON.stringify(guiState));

        // })
    


        // load GUI state if available in local storage
        const guiState = localStorage.getItem('guiState')
        if (guiState)  this.modelInstance.gui.load(JSON.parse(guiState))
    
        // reset GUI state button
        const resetGui = () => {
          localStorage.removeItem('guiState')
           this.modelInstance.gui.reset()
        }
         this.modelInstance.gui.add({ resetGui }, 'resetGui').name('RESET to Defaults')
    
         this.modelInstance.gui.close()

    }


}

///////////////////////////////////////////////////
