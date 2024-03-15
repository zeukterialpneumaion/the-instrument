type AjhInstrumentEventTypes = {
    'on_off': [on_off: boolean, id : number]
    'playing': [id : number, note_name: string]
    'repaint': [isTrue: boolean, id:number]
    'touched': [ touched: boolean, id:number ]
    'selected': [ selected: boolean, id:number ]
  }