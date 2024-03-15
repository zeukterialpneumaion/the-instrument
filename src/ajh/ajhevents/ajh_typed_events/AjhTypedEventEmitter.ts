import { EventEmitter } from "events";

export default class AjhTypedEventEmitter<TEvents extends Record<string, any>> {

   private _emitter = new EventEmitter();
  public get emitter() {
    if(this._emitter.getMaxListeners() != 1024)
    {
      this._emitter.setMaxListeners(1024);
    }
    return this._emitter;
  }
  public set emitter(value) {
    this._emitter = value;
  }
    
  
    emit<TEventName extends keyof TEvents & string>(
      eventName: TEventName,
      ...eventArg: TEvents[TEventName]
    ) {
      this.emitter.emit(eventName, ...(eventArg as []))
    }
  
    on<TEventName extends keyof TEvents & string>(
      eventName: TEventName,
      handler: (...eventArg: TEvents[TEventName]) => void
    ) {
      this.emitter.on(eventName, handler as any)
    }
  
    off<TEventName extends keyof TEvents & string>(
      eventName: TEventName,
      handler: (...eventArg: TEvents[TEventName]) => void
    ) {
      this.emitter.off(eventName, handler as any)
    }
  }