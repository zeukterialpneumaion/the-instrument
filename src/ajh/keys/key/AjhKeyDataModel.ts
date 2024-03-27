import { InstancedMesh, Mesh, Vector2, Vector3 } from "three";
import AjhSynthDefinition from "../../sonics/AjhSynthDefinition";
import AjhKeyBoard from "../keyboards/AjhKeyBoard";
import AjhKeyColoursDefinition from "../keyboards/AjhKeyColoursDefinition";

// ============================================================================== //

    export interface IKeyDataModel {
        

        Id:number,
        KeyboardInstance: AjhKeyBoard;
        PositionInKeyboard : number;

        State:KeyState;
        View:KeyView;
        Sonics:KeySonics;

        createView() : void ;
        createState() : void ;
        createSonics() : void ;



        createAll() : void ;

        setAllValueStates(
        
            
           
                IdNewValue:number,
                KeyboardInstance: AjhKeyBoard,
                PositionInKeyboard : number,

                
            //set All KeyStateValues

                IsRayTouched : boolean,
                IsPointerDown: boolean,
                IsPointerMove: boolean,
                IsPointerOut: boolean,
                    
            //set All KeyView Values

                ColId : number,
                RowId : number,

                Height : number,
                Width : number,
                Length : number,

                Position : Vector3,
                ScreenPosition : Vector2,

            //set All KeySonics Values

                NoteNameNewValue:string,
                OctaveNewValue:number,
                IsSharpOrFlatState:boolean,
                IsPlayingState:boolean
                
        ) : boolean ;
       
    }

// ============================================================================== //

    export default class AjhKeyDataModel implements IKeyDataModel 
    {

        private _PositionInKeyboard: number;
        public get PositionInKeyboard(): number {
            return this._PositionInKeyboard;
        }
        public set PositionInKeyboard(value: number) {
            this._PositionInKeyboard = value;
        }

        private _Id: number;
        public get Id(): number {
            return this._Id;
        }
        public set Id(value: number) {
            this._Id = value;
        }

        private _KeyboardInstance: AjhKeyBoard;
        public get KeyboardInstance(): AjhKeyBoard {
            return this._KeyboardInstance;
        }
        public set KeyboardInstance(value: AjhKeyBoard) {
            this._KeyboardInstance = value;
        }
        
        private _Sonics: KeySonics;
        public get Sonics(): KeySonics {
            return this._Sonics;
        }
        public set Sonics(value: KeySonics) {
            this._Sonics = value;
        }
        
        
        private _State: KeyState;
        public get State(): KeyState {
            return this._State;
        }
        public set State(value: KeyState) {
            this._State = value;
        }
       

        private _View: KeyView;
        public get View(): KeyView {
            return this._View;
        }
        public set View(value: KeyView) {
            this._View = value;
        }
        

        constructor(){

            this.createAll();

        };

        createView() : void {

            this.View =  new KeyView();

        };
        
        createState() : void {
        
            this.State =  new KeyState();
            
        };

        createSonics() : void {
        
            this.Sonics = new KeySonics();
            
        };

        createAll() {

            this.createView();

            this.createState();
            
            this.createSonics();

        };
        
        setAllValueStates(
            
            IdNewValue:number,
            keyboardInstance: AjhKeyBoard,
            PositionInKeyboard : number,
            
        //set All KeyStateValues

            IsRayTouched : boolean,
            IsPointerDown: boolean,
            IsPointerMove: boolean,
            IsPointerOut: boolean,
                
        //set All KeyView Values

            ColId : number,
            RowId : number,


            Height : number,
            Width : number,
            Length : number,

            Position : Vector3,
            ScreenPosition : Vector2,

        //set All KeySonics Values

            NoteNameNewValue:string,
            OctaveNewValue:number,
            IsSharpOrFlatState:boolean,
            IsPlayingState:boolean
                
        ) : boolean  {

                let hasSucceeded = false;
                
                try {


                    this.Id = IdNewValue;
                    this.KeyboardInstance = keyboardInstance;
                    this.PositionInKeyboard = PositionInKeyboard;
                    
                    
                        //set All KeyStateValues

                        this.State.IsRayTouched = IsRayTouched;
                        this.State.IsPointerDown = IsPointerDown;
                        this.State.IsPointerMove = IsPointerMove;
                        this.State.IsPointerOut = IsPointerOut;
                            
                        //set All KeyView Values

                        this.View.ColId = ColId;
                        this.View.RowId = RowId;

                        this.View.Colours = keyboardInstance.KeyColoursDef;

                        this.View.Height = Height;
                        this.View.Width = Width;
                        this.View.Length = Length;

                        this.View.Position = Position;
                        this.View.ScreenPosition = ScreenPosition;

                        //set All KeySonics Values

                        this.Sonics.NoteName = NoteNameNewValue;
                        this.Sonics.Octave = OctaveNewValue;
                        this.Sonics.IsSharpOrFlat = IsSharpOrFlatState;
                        this.Sonics.IsPlaying = IsPlayingState;
                    

                    //if all done, then 

                    hasSucceeded = true;

                } catch (error) {
                    console.log("ERROR IN CREATING KeyData : " + error);
                }
                return hasSucceeded;

        };

    }

// ============================================================================== //

    export interface IKeySonics{
        

        NoteName : string;

        Octave : number;

        IsSharpOrFlat : boolean;

        IsPlaying : boolean;
        
        Synth : AjhSynthDefinition;

        setIsSharpOrFlat(state:boolean) : void;
        setSynth(synth:AjhSynthDefinition) : void;

        setAllKeySonicsValues(

                NoteNameNewValue:string,
                OctaveNewValue:number,
                IsSharpOrFlatState:boolean,
                IsPlayingState:boolean,
                Synth : AjhSynthDefinition
            
            ) : void;

    }

// ============================================================================== //

export class KeySonics implements IKeySonics {

    // ========================================================================== //

    private _IsSharpOrFlat: boolean;
    public get IsSharpOrFlat(): boolean {
        return this._IsSharpOrFlat;
    }
    public set IsSharpOrFlat(value: boolean) {
        this._IsSharpOrFlat = value;
    }

    private _Octave: number;
    public get Octave(): number {
        return this._Octave;
    }
    public set Octave(value: number) {
        this._Octave = value;
    }

    private _Synth: AjhSynthDefinition;
    public get Synth(): AjhSynthDefinition {
        return this._Synth;
    }
    public set Synth(value: AjhSynthDefinition) {
        this._Synth = value;
    }
     
    private _NoteName: string;
    public get NoteName(): string {
        return this._NoteName;
    }
    public set NoteName(value: string) {
        this._NoteName = value;
    }

    private _IsPlaying: boolean;
    public get IsPlaying(): boolean {
        return this._IsPlaying;
    }
    public set IsPlaying(value: boolean) {
        this._IsPlaying = value;
    }

    // ========================================================================== //
    
    setIsSharpOrFlat(state:boolean) : void {

        this.IsSharpOrFlat = state;

    } ;

    setAllKeySonicsValues(

        NoteName : string,
        OctaveNewValue:number,
        IsSharpOrFlatState:boolean,
        IsPlayingState:boolean,
        Synth : AjhSynthDefinition
    
    ) : void
    {

        this.NoteName = NoteName,
        this.Octave = OctaveNewValue;
        this.IsSharpOrFlat = IsSharpOrFlatState;
        this.IsPlaying = IsPlayingState;

    };

    setSynth(synth:AjhSynthDefinition) : void
    {

        this.Synth = synth;

    };


}

// ============================================================================== //

export interface IKeyView {
    
    NoteName: string;
    Id: string;
    Body : Mesh | InstancedMesh;
    Position: Vector3;
    ScreenPosition: Vector2;

    RowId:number;
    ColId:number;
    
    Width:number;
    Height:number; 
    Length:number;

    IsActive: boolean;
    IsRayTouched: boolean;

    IsSharpOrFlat : boolean;

    Colours : AjhKeyColoursDefinition;

    setIsSelected(state:boolean) : void ;
    setIsActive(state:boolean) : void ;
    setIsSharpOrFlat(state:boolean) : void ;
    setIsRayTouched(state:boolean) : void ;
    setAllKeyViewValues(

        IsActive : boolean,
        IsRayTouched : boolean,
        IsSharpOrFlat : boolean,
        ColId : number,
        RowId : number,
        Colours : AjhKeyColoursDefinition,
        Height : number,
        Width : number,
        Length : number,
        Position : Vector3,
        ScreenPosition : Vector2,

    ) : void ;
    
}

// ============================================================================== //

export class KeyView implements IKeyView {

    // ========================================================================== //

    private _RowId: number;
    public get RowId(): number {
        return this._RowId;
    }
    public set RowId(value: number) {
        this._RowId = value;
    }
    
    private _ColId: number;
    public get ColId(): number {
        return this._ColId;
    }
    public set ColId(value: number) {
        this._ColId = value;
    }
    
    private _Width: number;
    public get Width(): number {
        return this._Width;
    }
    public set Width(value: number) {
        this._Width = value;
    }

    private _Height: number; 
    public get Height(): number {
        return this._Height;
    }
    public set Height(value: number) {
        this._Height = value;
    }

    private _Length: number;
    public get Length(): number {
        return this._Length;
    }
    public set Length(value: number) {
        this._Length = value;
    }

    
    private _IsSharpOrFlat: boolean;
    public get IsSharpOrFlat(): boolean {
        return this._IsSharpOrFlat;
    }
    public set IsSharpOrFlat(value: boolean) {
        this._IsSharpOrFlat = value;
    }
    
    private _Colours: AjhKeyColoursDefinition;
    public get Colours(): AjhKeyColoursDefinition {
        return this._Colours;
    }
    public set Colours(value: AjhKeyColoursDefinition) {
        this._Colours = value;
    }
    
    private _Id: string;
    public get Id(): string {
        return this._Id;
    }
    public set Id(value: string) {
        this._Id = value;
    }

    private _Body: Mesh | InstancedMesh;
    public get Body(): Mesh | InstancedMesh {
        return this._Body;
    }
    public set Body(value: Mesh | InstancedMesh) {
        this._Body = value;
    }

    private _NoteName: string;
    public get NoteName(): string {
        return this._NoteName;
    }
    public set NoteName(value: string) {
        this._NoteName = value;
    }
    
    private _Position: Vector3;
    public get Position(): Vector3 {
        return this._Position;
    }
    public set Position(value: Vector3) {
        this._Position = value;
    }

    private _ScreenPosition: Vector2;
    public get ScreenPosition(): Vector2 {
        return this._ScreenPosition;
    }
    public set ScreenPosition(value: Vector2) {
        this._ScreenPosition = value;
    }

    private _IsActive: boolean;
    public get IsActive(): boolean {
        return this._IsActive;
    }
    public set IsActive(value: boolean) {
        this._IsActive = value;
    }
    
    private _IsRayTouched: boolean;
    public get IsRayTouched(): boolean {
        return this._IsRayTouched;
    }
    public set IsRayTouched(value: boolean) {
        this._IsRayTouched = value;
    }

    // ========================================================================== //

    setIsRayTouched(state:boolean) : void {

        this.IsRayTouched = state;

    } ;

    setIsSelected(state:boolean) : void {

        this.IsRayTouched = state;

    } ;

    setIsActive(state:boolean) : void {

        this.IsActive = state;

    } ;
    
    setIsSharpOrFlat(state:boolean) : void {

        this.IsSharpOrFlat = state;

    } ;

    setAllKeyViewValues(

        IsActive : boolean,
        IsRayTouched : boolean,
        IsSharpOrFlat : boolean,
        ColId : number,
        RowId : number,
        Colours : AjhKeyColoursDefinition,
        Height : number,
        Width : number,
        Length : number,
        Position : Vector3,
        ScreenPosition : Vector2,
        
        
    ){
        
        this.IsActive = IsActive;

        this.ColId = ColId;
        this.Colours = Colours;
        this.Height = Height;
        this.IsActive = IsActive;
        this.IsRayTouched = IsRayTouched;
        this.IsSharpOrFlat = IsSharpOrFlat;
        this.Length = Length;
        this.Position = Position;
        this.RowId = RowId;
        this.ScreenPosition = ScreenPosition;
        this.Width = Width;

    }

}

// ============================================================================== //


// ============================================================================== //

export interface IKeyState {
    
    // Id: string;
    // NoteName: string;
   // IsPlaying: boolean;
    IsActive: boolean;
    IsRayTouched : boolean;
    IsPointerDown: boolean;
    IsPointerMove: boolean;
    IsPointerOut: boolean;

    PointerRayIds: Array<number>;



   // setIsPlaying(state:boolean) : void ;
    setIsActive(state:boolean) : void ;
    setIsRayTouched(state:boolean) : void ;
    setIsPointerDown(state:boolean) : void ;
    setIsPointerMove(state:boolean) : void ;
    setIsPointerOut(state:boolean) : void ;
    
    addPointerRayIdIfNotExisting(value:number, log:boolean);
    getNumberOfPointerRays():number;
    removePointerRayById(id:number, log:boolean );
    checkIfPointerRayExistsById(id:number, log:boolean) : number | null;
     
    setAllKeyStateValues(

        IsActive: boolean,
        IsRayTouched : boolean,
        IsPointerDown: boolean,
        IsPointerMove: boolean,
        IsPointerOut: boolean

    ) : void ;
}

// ============================================================================== //

export class KeyState implements IKeyState {

    // ========================================================================== //
   
    private _PointerRayIds: Array<number> = new Array<number>();
    public get PointerRayIds(): Array<number> {
        return this._PointerRayIds;
    }
    public set PointerRayIds(value: Array<number>) {
        this._PointerRayIds = value;
    }
   
    private _IsPointerDown: boolean;
    public get IsPointerDown(): boolean {
        return this._IsPointerDown;
    }
    public set IsPointerDown(value: boolean) {
        this._IsPointerDown = value;
    }

    private _IsPointerMove: boolean;
    public get IsPointerMove(): boolean {
        return this._IsPointerMove;
    }
    public set IsPointerMove(value: boolean) {
        this._IsPointerMove = value;
    }

    private _IsPointerOut: boolean;
    public get IsPointerOut(): boolean {
        return this._IsPointerOut;
    }
    public set IsPointerOut(value: boolean) {
        this._IsPointerOut = value;
    }

    private _IsPlaying: boolean;
    public get IsPlaying(): boolean {
        return this._IsPlaying;
    }
    public set IsPlaying(value: boolean) {
        this._IsPlaying = value;
    }

    private _IsActive: boolean;
    public get IsActive(): boolean {
        return this._IsActive;
    }
    public set IsActive(value: boolean) {
        this._IsActive = value;
    }

    private _IsRayTouched: boolean;
    public get IsRayTouched(): boolean {
        return this._IsRayTouched;
    }
    public set IsRayTouched(value: boolean) {
        this._IsRayTouched = value;
    }
    

    // ========================================================================== //

    setIsPlaying(state:boolean) : void{

        this.IsPlaying = state;

    } ;
    
    setIsActive(state:boolean) : void {

        this.IsActive = state;

    } ;

    setIsRayTouched(state:boolean) : void {

        this.IsRayTouched = state;

    } ;

    setIsPointerDown(state:boolean) : void {

        this.IsPointerDown = state;

    } ;

    setIsPointerMove(state:boolean) : void {

        this.IsPointerMove = state;

    } ;

    setIsPointerOut(state:boolean) : void {

        this.IsPointerOut = state;

    } ;

    setAllKeyStateValues(
        
        IsActive: boolean,

        IsRayTouched : boolean,

        IsPointerDown: boolean,
        IsPointerMove: boolean,
        IsPointerOut: boolean
        
    ){
        
        this.IsActive = IsActive;
        this.IsRayTouched = IsRayTouched;

        this.IsPointerDown = IsPointerDown;
        this.IsPointerMove = IsPointerMove;
        this.IsPointerOut = IsPointerOut;

    }

    addPointerRayIdIfNotExisting(id:number, log:boolean = false){

        let exists = this.checkIfPointerRayExistsById(id,log);

        if(exists == null){

            this.PointerRayIds.push(id);

        } else {

        }

        console.log(

            " PointerRayChecks : adding if ray is registered :"
            +
            exists

        );
        

    };

    getNumberOfPointerRays():number {

        return this.PointerRayIds.length;
    };

    checkIfPointerRayExistsById(id:number, log:boolean = false) : number | null {

        let foundPointerRay = null;

        for (
            let index = 0; 
            index < this.PointerRayIds.length; 
            index++
        ) {

            const element = this.PointerRayIds[index];

            if(element == id){

                foundPointerRay = index;

            }
            
        }

        if(log){

            console.log(

                "PointerRayChecks : checking if ray EXISTING ID: "
                +
                foundPointerRay

            );

        };

        return foundPointerRay;

    };

    removePointerRayById(id:number, log:boolean = false) : boolean {

        let foundPointerRayIndex :number;
        let foundAndRemoved : boolean = false;

        if(log){
        
            console.log(

                "PointerRayChecks : removing ray ATTEMPT : NumberOfRegisteredPointerRays : "
                +
                this.PointerRayIds.length
                +
                " : "
                +
                id
            )
        
        };

        for (
            let index = 0; 
            index < this.PointerRayIds.length; 
            index++
        ) {

            const element = this.PointerRayIds[index];

            if(element == id){

                foundPointerRayIndex = index;

            }
            
        }

      if(foundPointerRayIndex != undefined){

           
            this.PointerRayIds.splice(foundPointerRayIndex, 1);
            foundAndRemoved = true;

            if(log){

                console.log(

                    "PointerRayChecks : removing FOUND RAY: "
                    +
                    foundPointerRayIndex
                    + 
                    " : "
                    + 
                    foundAndRemoved

                );
        
            };


        };

        if(log){
            console.log(

                " PointerRayChecks : removing ray if ray is registered :"
                +
                foundPointerRayIndex
                + 
                " : "
                + 
                foundAndRemoved

            );
        }

        return foundAndRemoved;

    };

    // ========================================================================== //

}

