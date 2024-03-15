//import { AlloyFinger } from 'alloyfinger-typescript';
class AlloyFingerInstance {

    // private _alloyfingerInstance: AlloyFinger;
    // public get alloyfingerInstance(): AlloyFinger {
    //     return this._alloyfingerInstance;
    // }
    // public set alloyfingerInstance(value: AlloyFinger) {
    //     this._alloyfingerInstance = value;
    // }

    constructor(htmlelement:HTMLElement){

        // this.alloyfingerInstance 
        //     = new AlloyFinger(htmlelement, {
        //         touchStart: function () { },
        //         touchMove: function () { },
        //         touchEnd:  function () { },
        //         touchCancel: function () { },
        //         multipointStart: function () { },
        //         multipointEnd: function () { },
        //         tap: function () { },
        //         doubleTap: function () { },
        //         longTap: function () { },
        //         singleTap: function () { },
        //         rotate: function (evt) {
        //             console.log(evt.angle);
        //         },
        //         pinch: function (evt) {
        //             console.log(evt.zoom);
        //         },
        //         pressMove: function (evt) {
        //             console.log(evt.deltaX);
        //             console.log(evt.deltaY);
        //         },
        //         swipe: function (evt) {
        //             console.log("swipe" + evt.direction);
        //         }
        // });
    }

    
    
    /**
     * this method can also add or remove the event handler
     */
    onTap() {};
    
    // this.alloyfingerInstance.on('tap', onTap);
    // this.alloyfingerInstance.on('touchStart', function() {});
    
    // this.alloyfingerInstance.off('tap', onTap);
    
    /**
     * this method can destroy the instance
     */
    //this.alloyfingerInstance = this.alloyfingerInstance.destroy();
}