import AjhSelectedKey from "./AjhSelectedKey";

export default class {

    private _selectedKeys: Array<AjhSelectedKey> = new Array<AjhSelectedKey>();
    public get selectedKeys(): Array<AjhSelectedKey> {
        return this._selectedKeys;
    }
    public set selectedKeys(value: Array<AjhSelectedKey>) {
        this._selectedKeys = value; }

    constructor(){};

    removeSelectedKeyByRayCasterId( raycasterId:number ){
      
        for (  
            let index = 0; 
            index < this._selectedKeys.length; 
            index++
        ) {

            const element = this._selectedKeys[ index ];
            if(element.raycasterId == raycasterId){
                this._selectedKeys.splice(index,1);
            }
      
        }
    };

    checkIfExistsAndUpdateOrCreateNewSelectedKey( 
        bodyId,
        bodyName,
        bodyUUID,
        keyId,
        keyboardId,
        raycasterId,
        selectedKey
     ){

        let alreadyExists : boolean = false;
        let existingSelectedKey : AjhSelectedKey;
        for (  
            let index = 0; 
            index < this._selectedKeys.length; 
            index++
        ) {

            const element = this._selectedKeys[ index ];

            if(element.raycasterId == raycasterId){

                existingSelectedKey = element;
                alreadyExists = true;

            }
      
        }

        if(!alreadyExists){

            let newselectedkey = new AjhSelectedKey();
            newselectedkey.bodyId = bodyId;
            newselectedkey.bodyName = bodyName;
            newselectedkey.bodyUUID = bodyUUID;
            newselectedkey.keyId = keyId;
            newselectedkey.keyboardId = keyboardId;
            newselectedkey.raycasterId = raycasterId;
            newselectedkey.selectedKey = selectedKey;
        
            this._selectedKeys.push(newselectedkey);
        
         }
         else{

            
            existingSelectedKey.bodyId = bodyId;
            existingSelectedKey.bodyName = bodyName;
            existingSelectedKey.bodyUUID = bodyUUID;
            existingSelectedKey.keyId = keyId;
            existingSelectedKey.keyboardId = keyboardId;
            existingSelectedKey.raycasterId = raycasterId;
            existingSelectedKey.selectedKey = selectedKey;

         }

    };

    getSelectedKeyByRayCasterId(raycasterId) : AjhSelectedKey | null {

        let selected = null;
        for (  
            let index = 0; 
            index < this._selectedKeys.length; 
            index++
        ) {

            const element = this._selectedKeys[ index ];
            if(element.raycasterId == raycasterId){
                selected = element
            }
      
        }

        return selected;
    }

    
    getSelectedKeyByBodyUUID(uuid) : AjhSelectedKey | null {

        let selected = null;
        for (  
            let index = 0; 
            index < this._selectedKeys.length; 
            index++
        ) {

            const element = this._selectedKeys[ index ];
            if(element.bodyUUID == uuid){
                selected = element
            }
      
        }

        return selected;
    }

}