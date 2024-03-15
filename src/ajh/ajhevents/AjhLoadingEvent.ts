
export interface AjhLoadingEvents {

    'loadingRequest': ( 
      id:number, 
      type : string, 
      fileName : string,
      url: string
    ) => void;

    'loaded': ( 
      id:number, 
      type : string, 
      fileName : string,
      url: string,
      file : any
    ) => void;

    'promiseFulfilled': ( 
      id:number, 
      type : string, 
      fileName : string,
      url: string,
      file : any
    ) => void;

    'loading': (
      id:number, 
      type : string, 
      fileName : string,
      url: string
    ) => void;

    'unloaded': (
      id:number, 
      type : string, 
      fileName : string,
      url: string
    ) => void;
  
}
  