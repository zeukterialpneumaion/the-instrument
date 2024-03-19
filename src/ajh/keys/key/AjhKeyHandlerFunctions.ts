import { Mesh } from "three";
import AjhKey from "./AjhKey";

export default class AjhKeyHandlerFunctions{

    keyInstance :AjhKey;

    constructor (key:AjhKey)
    {

        this.keyInstance = key;

    }

// ============================================================================= //
 
    onPointerDownListener(
        pointerid : number, 
        keyid:number, 
        uuid: string
    ){
    
        if(this.keyInstance.modelInstance.instruments){

            if(
                ( (this.keyInstance.KeyState.View.Body as Mesh).uuid == uuid )
                &&
                ( (this.keyInstance.KeyState.View.Body as Mesh).id == keyid )
            ){

                this.keyInstance.modelInstance.pointerDown = true;
                this.keyInstance.KeyState.State.setIsPointerDown(true);
               // if(this.keyInstance.KeyState.State.checkIfPointerRayExistsById(pointerid)){
                        
               if( this.keyInstance.KeyState.State.IsRayTouched ){
                
                    // highlightkey::
                    this.keyInstance.highlightKey(true);
                
                }

               // }

                if(
                    this.keyInstance.modelInstance.showMusicalKeyMessages
                ){
                    
                    console.log( 

                        "POINTER DOWN: " 
                        + this.keyInstance.modelInstance
                            .instruments.currentInstrument.name
                        + " I am  key number " 
                        + this.keyInstance.KeyState.Id
                        + ", with a pitch of "
                        + this.keyInstance.KeyState.Sonics.NoteName
                        + " and i heard that my identifier: " 
                        + this.keyInstance.KeyState.View.Body.uuid 
                        + "was compared to:" 
                        + uuid +
                        " and I was FOUND!!.."

                    )

                }

                if(!this.keyInstance.KeyState.Sonics.IsPlaying){

                    this.keyInstance.KeyState.Sonics.IsPlaying = true; 
                
                    this.keyInstance.KeyState.State.setIsPointerDown(true);

                    this.keyInstance.modelInstance.instruments
                    .startToPlayANote(

                        this.keyInstance.KeyState.Sonics.NoteName 
                        + 
                        this.keyInstance.KeyState.Sonics.Octave.toString()

                    );

                }

            }
            else{
            
                //  the key is no longer intersected by the raycaster but the note is playing....
                //  ...so we need to stop it...
                // if(
                //     this.keyInstance.KeyState.State.IsPointerDown
                //     &&
                //     this.keyInstance.KeyState.Sonics.IsPlaying
                // ){

                //         if(this.keyInstance.modelInstance.instruments){

                //             this.keyInstance.KeyState.Sonics.IsPlaying = true; 

                //             this.keyInstance.modelInstance.instruments
                //             .stopToPlayANote(

                //                 this.keyInstance.KeyState.Sonics.NoteName 
                //                 + 
                //                 this.keyInstance.KeyState.Sonics.Octave.toString()

                //             );

                //         }

                //         this.keyInstance.KeyState.State.setIsPointerDown(false);
                //         this.keyInstance.KeyState.Sonics.IsPlaying = false;

                // }
        
            }

        }

    }

// ============================================================================= //

    onPointerUpListener(

        pointerid : number, 
        id:number, 
        uuid: string

    ){

    // if I am the event target

        if(this.keyInstance.modelInstance.instruments){

            if(
                ( (this.keyInstance.KeyState.View.Body as Mesh).uuid == uuid )
            // ( isTrue )
            ){     
                
                this.keyInstance.KeyState.State.setIsPointerDown(true);
              //  if(this.keyInstance.KeyState.State.checkIfPointerRayExistsById(pointerid)){
                
                    // highlightkey::
                    this.keyInstance.highlightKey(false);

             //   }

                if(
                    this.keyInstance.modelInstance.showMusicalKeyMessages
                ){
                        
                    console.log(

                        "POINTER UP :: I am  key number " 
                        + this.keyInstance.KeyState.Id
                        + ", with a pitch of "
                        + this.keyInstance.KeyState.Sonics.NoteName
                        + " and i heard that my identifier: " 
                        + this.keyInstance.KeyState.View.Body.uuid 
                        + "was compared to:" 
                        + uuid +
                        " and i am trigging a NOTE RELEASE"

                    );

                }

                this.keyInstance.modelInstance.instruments
                .stopToPlayANote(

                    this.keyInstance.KeyState.Sonics.NoteName 
                    + 
                    this.keyInstance.KeyState.Sonics.Octave.toString()

                );

                this.keyInstance.KeyState.Sonics.IsPlaying = false;

                this.keyInstance.KeyState.State.setIsPointerDown(false);

        
            } else {

    // if I am NOT the event target

                if(
                    this.keyInstance.KeyState.State.IsPointerDown
                    &&
                    this.keyInstance.KeyState.Sonics.IsPlaying
                ){

                    if(this.keyInstance.modelInstance.instruments){

                        this.keyInstance.KeyState.Sonics.IsPlaying = true; 

                        this.keyInstance.modelInstance.instruments
                        .stopToPlayANote(

                            this.keyInstance.KeyState.Sonics.NoteName 
                            + 
                            this.keyInstance.KeyState.Sonics.Octave.toString()

                        );

                    }

                    this.keyInstance.KeyState.State.setIsPointerDown(false);
                    this.keyInstance.KeyState.Sonics.IsPlaying = false;

                }
        
            }
        
        }

    }

// ============================================================================= //

    onPointerLeaveListener(

        pointerid : number, 
        id : number, 
        uuid: string

    ){
      
    // stop all notes that key is currently playing,
    // regardless of whether this  is touched
    
        if(this.keyInstance.modelInstance.instruments){

            if(this.keyInstance.KeyState.Sonics.IsPlaying){
    
                if(this.keyInstance.modelInstance.instruments){

                    this.keyInstance.modelInstance.instruments
                    .stopToPlayANote(

                        this.keyInstance.KeyState.Sonics.NoteName 
                        + 
                        this.keyInstance.KeyState.Sonics.Octave.toString()

                    );

                }
                
                this.keyInstance.KeyState.Sonics.IsPlaying = false;

                //if(this.keyInstance.KeyState.State.checkIfPointerRayExistsById(pointerid)){
                                
                    // highlightkey::
                    this.keyInstance.highlightKey(false);

                //}


            } else {

            }

    // if this key is touched then

            if(
    
                ( (this.keyInstance.KeyState.View.Body as Mesh).uuid == uuid )
               // ( isTrue )
            ){
    
            } else {

            }
           
        }
    
    }

// ============================================================================= //

    isRayTouchedListener(
        
        touched: boolean, 
        rayid:number, 
        id:number, 
        uuid: string

    ){

    
    // check if this key has been intersected by a ray, then

        if(

            ( (this.keyInstance.KeyState.View.Body as Mesh).uuid == uuid )
            &&
            ( (this.keyInstance.KeyState.View.Body as Mesh).id == id )

        ){
    
    // set the ray touch to true

            this.keyInstance.KeyState.State.IsRayTouched = true;
            
    // register Pointer Ray in the KEY Pointer Ray Array : 
            
            this.keyInstance.KeyState.State.addPointerRayIdIfNotExisting(rayid, true);

    // do a little logging
            if(
                this.keyInstance.modelInstance.showMusicalKeyMessages
            ){
                
              
                console.log(

                    this.keyInstance.KeyState.Sonics.NoteName
                    +
                    this.keyInstance.KeyState.Sonics.Octave
                    + 
                    " KEY IS Intersected by ray id : "
                    +
                    rayid
                    +
                    " added to KEY:PointerRays if not already registered "
                );

            }

            console.log(

                " KEY IS Intersected by ray id :getNumberOfPointerRays: "
                +
                this.keyInstance.KeyState.State.getNumberOfPointerRays()
               
            );

    // now, check if key is playing a note
            if(this.keyInstance.KeyState.Sonics.IsPlaying){

            } else {
    // it is NOT playing, now, check if the pointer is down...
                if(this.keyInstance.modelInstance.pointerDown){
    // the pointer IS DOWN,  now send a note attackrelease command            
                    this.keyInstance.modelInstance.instruments
                    .playANote(

                        this.keyInstance.KeyState.Sonics.NoteName 
                        + 
                        this.keyInstance.KeyState.Sonics.Octave.toString()

                    );
                }

            }
        
        } else {

    //  the key is not intersected by the raycaster .....

       // remover Pointer Ray from the KEY Pointer Ray Array : 
            
        this.keyInstance.KeyState.State.removePointerRayById(rayid, true);

            if(this.keyInstance.modelInstance.pointerDown){

    // ... the pointer is down, 
    
    // if was playing then i need to stop IF the pointerId is registered...
    
                if(

                    !this.keyInstance.KeyState.Sonics.IsPlaying 
                    &&
                    this.keyInstance.KeyState.State.checkIfPointerRayExistsById(rayid, true) 
                        != null

                ){

                    this.keyInstance.modelInstance.instruments
                    .stopToPlayANote(

                        this.keyInstance.KeyState.Sonics.NoteName 
                        + 
                        this.keyInstance.KeyState.Sonics.Octave.toString()

                    );

                    this.keyInstance.KeyState.Sonics.IsPlaying = false;
                
                }
                else{


                }

            } else {

            }
            
        }
      

            //  the key is no longer intersected by the raycaster but the note is playing....
            //  ...so we need to stop it...
        // if(this.KeyState.State.IsPointerDown){

                // if(this.KeyState.Sonics.IsPlaying && this.KeyState.State.IsPointerDown){

                //     if(this.modelInstance.instruments){

                //         this.KeyState.Sonics.IsPlaying = true; 

                //         this.modelInstance.instruments
                //         .stopToPlayANote(

                //             this.KeyState.Sonics.NoteName 
                //             + 
                //             this.KeyState.Sonics.Octave.toString()

                //         );

                //     }

                //     this.KeyState.State.setIsPointerDown(false);
                //     this.KeyState.Sonics.IsPlaying = false;
                // }

        // }

        }

}