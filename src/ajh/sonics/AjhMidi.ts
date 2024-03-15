import AjhModel from "../datamodels/AjhModel";

export default class AjhMidi {



    modelInstance:AjhModel = AjhModel.Instance;

    NOTE_ON = 0x90
    NOTE_OFF = 0x80

   

    //availableMidiInDevices =[];
    

    channelNOTE_ONs 
    = 
    [ 0x90,0x91,0x92,0x93,0x94,0x95,0x96,0x97,0x98,0x99,0x9a,0x9b,0x9c,0x9d,0x9e,0x9f];

    channelNOTE_OFFs 
    = 
    [ 0x80,0x81,0x82,0x83,0x84,0x85,0x86,0x87,0x88,0x89,0x8a,0x8b,0x8c,0x8d,0x8e,0x8f];

    notesOn = [];

    selectOutList = [];

    // NOTE_ON = 9;
    // NOTE_OFF = 8;
    
    midiIn = [];
    midiOut = [];

    constructor(){

       // this.connect();

        // this.modelInstance.samplerLibraryEventEmitter
        // .addListener("libraryReadyToUse",this.librarReadyToUseListener.bind(this))

    }
     
    // send(){

    //     let n = Midi(60).toMidi(); //60
    //     Midi("A4").transpose(3); //"C5"
    //     Midi(60).toFrequency(); //261.6255653005986
    //     Midi("4n");//a quarter note

        
        

    // }
    // recieve(){

    //     Frequency(69, "midi").toNote(); //"A4"
    //     Frequency("A4").harmonize([0, 3, 7]); //["A4", "C5", "E5"]
    // }

    librarReadyToUseListener(){
        this.connect();
    }

    connect() {
        navigator.requestMIDIAccess()
        .then(
          (midi) => this.midiReady(midi),
          (err) => console.log('Something went wrong', err));
    }
    
    //used by connect() --->
    midiReady(midi) {

      console.log("MIDI READY!")
        // Also react to device changes.
        midi.addEventListener('statechange', (event) => this.initDevices(event.target));
        this.initDevices(midi); // see the next section!
        for (let index = 0; index < this.midiOut.length; index++) {
          const element = this.midiOut[index];
          this.modelInstance.informationWindow.contentField.innerText 
          = 
          "name: " 
          + element.name 
          + "state: " 
          + element.state
          + " :: ";

          if (
            (element.state ==  "connected") 
            && 
            (index ==  this.modelInstance.currentMidiOutId)
          ){

            this.sendMidiMessage(1, 60, 0x7f, 100, index)
            this.sendMidiMessage(11, 60, 0x7f, 100, index)

          }
    
        }
        
    }

    initDevices(midi) {
            // Reset.
            
            this.modelInstance.ajhMidiAccess = midi;
            // MIDI devices that send you data.
            const inputs = midi.inputs.values();

             let availableMidiInputs:Array<any> = [];
            for (
              let input = inputs.next(); 
              input && !input.done; 
              input = inputs.next()
            ) {
              
              this.midiIn.push(input.value);

              if(input.value.state == "connected"){

               // availableMidiInputs.push(input);
                this.modelInstance.availableMidiInputs.push(input.value);

              }
              console.log(
                'Midi Input :: ', 
                input.value,  
                this.modelInstance.availableMidiInputs.length
              );

            }

          
           // this.modelInstance.availableMidiInputs = availableMidiInputs;


            // for (
            //   let index = 0; 
            //   index < this.modelInstance.availableMidiInputs.length; 
            //   index++
            // ) {

            //   const element = this.modelInstance.availableMidiInputs[index];

            //   this.modelInstance.informationWindow.dataField.innerText 
            //   = 
            //   "midi in: " 
            //   + element.name 
            //   + "state: " 
            //   + element.state
            //   + " :: ";
        
            //  }
            
            
            // MIDI devices that you send data to.
            const outputs = midi.outputs.values();

            //let availableMidiOutputs:Array<number> = [];

            for (
              let output = outputs.next(); 
              output && !output.done; 
              output = outputs.next()
            ) {
                
                this.midiOut.push(output.value);

                if(output.value.state == "connected"){

                  this.modelInstance.availableMidiOutputs.push(output.value)

                }

                console.log('Midi Output::', output.value,   this.modelInstance.availableMidiOutputs.length)
              
              }

             

            //
           /* 
           
           midiIns and midiOuts parameters::

            id: "PlsoGpSWwk5c08b/j1p7YYEPgKrZbeHANir11GR21Yw=", 
            manufacturer: "", 
            name: "DOREMiDi Group1", 
            version: "", 
            type: "input", 
            state: "connected", 
            connection: "closed", 
            onstatechange: null  
            */

            for (let index = 0; index < this.midiOut.length; index++) {
              const element = this.midiOut[index];
              this.modelInstance.informationWindow.contentField.innerText 
              = 
              "midi out: " 
              + element.name 
              + "state: " 
              + element.state
              + " :: ";
        
            }

            

           
        // return ;

            //the midi protocol uses hexadecimal representation for its "messages".

            // First half is dedicated to the command while the second part is used to specify the channel. They are 16 possible channels (MIDI channels are 0-indexed, as specified in documentation).

            // Example:
            // 0x80 means Note on (0x90) on Chan 1 (0x90)

            // So, if you want to send the same message en channel 2, you have to change it like this:

            //var noteOnMessage = [0x91, 60, 0x7f];

        
            
      //  this.displayDevices();
        


        this.startListening();
        
        }
      
      
      // Start listening to MIDI messages.
        startListening() {

            for (const input of this.midiIn) {

                input.addEventListener(
                  'midimessage', 
                  this.midiMessageReceived
                );
                
            }
        }

        sendMidiMessage(
          channel, 
          pitch, 
          velocity, 
          duration, 
          midiOutId
        ) {
       
            let device = this.modelInstance.availableMidiOutputs[this.modelInstance.currentMidiOutId];
            const msgOn = [this.channelNOTE_ONs[channel], pitch, velocity];
            const msgOff = [this.channelNOTE_OFFs[channel], pitch, velocity];

            device.send(msgOn, duration);

            
            this.modelInstance.informationWindow.infoField.innerText 
            = 
            "sending midi :: pitch " 
            + pitch
            + ", velocity: "
            + velocity
            + ", duration: "
            + Math.round(duration)
            + " ms >> " //msgOn + "to ::"
            + device.name
            + " ch "
            + midiOutId; //+ device.id 
            
            console.log(" ::" + msgOn + " :: "+ device.name);
            // First send the note on;

            // this.modelInstance.informationWindow.contentField.innerText 
            //   = 
            //   "midi out: " 
            //   + device.name 
            //   + "state: " 
            //   + device.state
            //   + " :: ";
            
            // Then send the note off. You can send this separately if you want 
            // (i.e. when the button is released)
            device.send(msgOff, Date.now() + duration);

        }

        sendTestMidi(channel,portID) {

         // const noteOnMessage = [this.channelNOTE_ONs[channel], 60, 0x7f]; // note on middle C, full velocity
          const noteOnMessage = [0x90, 60, 0x7f]; // note on middle C, full velocity

         // this.channelNOTE_ONs[channel]
          const output = this.modelInstance.ajhMidiAccess.outputs.get(portID);
          //send note on msg : 
          output.send(noteOnMessage); //omitting the timestamp means send immediately.
          //send note off msg 100ms later :
         // output.send([this.channelNOTE_OFFs[channel], 60, 0x40], window.performance.now() + 100.0); // timestamp = now + 1000ms.
          output.send([0x80, 60, 0x40], window.performance.now() + 100.0); // timestamp = now + 1000ms.

        }
        

        midiMessageReceived(event) {

            // MIDI commands we care about. See
            // http://webaudio.github.io/web-midi-api/#a-simple-monophonic-sine-wave-midi-synthesizer.
          
            const cmd = event.data[0] >> 4;
            const pitch = event.data[1];
            const velocity = (event.data.length > 2) ? event.data[2] : 1;
            
            // You can use the timestamp to figure out the duration of each note.
            const timestamp = Date.now();
            
            // Note that not all MIDI controllers send a separate NOTE_OFF command for every NOTE_ON.
            if (cmd === this.NOTE_OFF || (cmd === this.NOTE_ON && velocity === 0)) {

              console.log(`🎧 from ${event.srcElement.name} note off: pitch:${pitch}, velocity: ${velocity}`);
            
              // // Complete the note!
             //const note = this.notesOn.get(pitch);
              // if (note) {
              // //   this.notesOn.delete(pitch);
              // }
              // } else if (cmd === this.NOTE_ON) {
              //  console.log(`🎧 from ${event.srcElement.name} note off: pitch:${pitch}, velocity: {velocity}`);
              
              // //One note can only be on at once.
              //  (this.notesOn as).set(pitch, timestamp);

          }

        }

        sendMiddleC(midiAccess, portID) {
          const noteOnMessage = [0x90, 60, 0x7f]; // note on, middle C, full velocity
          const output = midiAccess.outputs.get(portID);
          output.send(noteOnMessage); // sends the message.
        }

}
