import AjhTypedEventEmitter from '../ajhevents/ajh_typed_events/AjhTypedEventEmitter';
import AjhKey from '../keys/key/AjhKey';
import AjhSelectedKey from '../keys/key/AjhSelectedKey';
export interface AjhMusicalKeyEvents {

    'SelectionIdChanged': (

      selectedObject : AjhSelectedKey 
      
      ) => void;

    'toggle': (

      key: AjhKey,
      id:number 

    ) => void;

    'on': (on: boolean, id : number ) => void;

    'off': (off: boolean, id : number) => void;

    'playing': (
      id:number  ) => void;

    'repaint': (isTrue: boolean, id:number) => void;

    'touched': (
      touched: boolean, 
      id:number  ) => void;

    'no longer touched': (touched: boolean, id : number) => void;

    'selected': (
      selected: boolean, 
      id:number  
    ) => void;

    'bufferLoaded': (buffer: ArrayBuffer, name: String ) => void;
    
  }

  export type AjhMusicalKeyEventTypes 
  = {

    'on_off': [on_off: boolean, id : number]
    'playing': [id : number, note_name: string]
    'repaint': [isTrue: boolean, id:number]
    'touchedByRay': [ touched: boolean, rayid:number,  id:number, uuid: string  ]
    
    'onPointerDown': [  pointerid:number,  id:number, uuid: string, event : any  ]
    'onPointerUp': [  pointerid:number,  id:number, uuid: string, event : any  ]
    'onPointerEnter': [  pointerid:number,  id:number, uuid: string, event : any  ]
    'onPointerOver': [  pointerid:number,  id:number, uuid: string, event : any  ]
    'onPointerOut': [  pointerid:number,  id:number, uuid: string, event : any ]
    'onPointerCancel': [  pointerid:number, id:number, uuid: string, event : any  ]
    'onPointerLeave': [  pointerid:number, id:number, uuid: string, event : any  ]
    
   
    'selected': [ selected: boolean, id:number,uuid: string  ]
    'toggle': [ key: AjhKey, id:number ]

  }

  export function createInstrumentEventBroker( ) : AjhTypedEventEmitter<AjhInstrumentEventTypes> {
    const instrumentEventEmitter =  new AjhTypedEventEmitter<AjhInstrumentEventTypes>();
    instrumentEventEmitter.emitter.setMaxListeners(1024);
    return instrumentEventEmitter;
  }
 
