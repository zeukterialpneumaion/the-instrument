
import { Frequency } from 'tone/build/esm/core/type/Units';
import AjhTypedEventEmitter from '../ajhevents/ajh_typed_events/AjhTypedEventEmitter';

export interface AjhNoteEvents {
    'noteOn': ( 
      Id : number, 
      noteName : Frequency
    ) => void;

    'noteOff': ( 
      Id:number
     ) => void;
    
    'tick': ( 
      Id:number, 
      currentTick : number) => void;

    'midiSend': ( 
      Id : number, 
      noteName : Frequency
    ) => void;

    'midiRecieve': ( 
      Id : number, 
      noteName : Frequency
    ) => void;

    'reverse': ( isTrue: boolean) => void;

    'start': ( 
      Id:number, 
      id : number
    ) => void;

    'stop': ( 
      stop: boolean, 
      Id:number, 
      id : number
    ) => void;

    'pause': ( pause: boolean, id : number ) => void;

    'cycleComplete': ( 
      Id:number 
    ) => void;
  }

  export type AjhNoteEventTypes = {
    'on_off': [on_off: boolean, id : number]
    'playing': [id : number, note_name: string]
    'repaint': [isTrue: boolean, id:number]
    'touched': [ touched: boolean, id:number ]
    'selected': [ selected: boolean, id:number ]
  }

  export function createNoteEventBroker( ) : AjhTypedEventEmitter<AjhNoteEventTypes> {
    const noteEmitter =  new AjhTypedEventEmitter<AjhNoteEventTypes>();
    noteEmitter.emitter.setMaxListeners(1024);
    return new AjhTypedEventEmitter<AjhNoteEventTypes>();
  }
  