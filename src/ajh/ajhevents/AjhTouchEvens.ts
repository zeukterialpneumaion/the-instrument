import AjhModel from "../datamodels/AjhModel";

class AjhTouchEventsanager {

  private _modelInstance: AjhModel;
  public get modelInstance(): AjhModel {
    return this._modelInstance;
  }
  public set modelInstance(value: AjhModel) {
    this._modelInstance = value;
  }

  ongoingTouches;
    el;
    ctx;
    
    constructor() {
       // this.modelInstance.canvas = document.getElementById("canvas");
        this.modelInstance.canvas.addEventListener("touchstart", this.handleStart);
        this.modelInstance.canvas.addEventListener("touchend", this.handleEnd);
        this.modelInstance.canvas.addEventListener("touchcancel", this.handleCancel);
        this.modelInstance.canvas.addEventListener("touchmove", this.handleMove);
        console.log("Initialized.");
      }

      // document.addEventListener("DOMContentLoaded", startup);
      handleStart(evt) {
        evt.preventDefault();
        console.log("ajh touchstart registered ::");
       
        // this.ctx = this.modelInstance.canvas.getContext("2d");
       
        const touches = evt.changedTouches;
      
        for (let i = 0; i < touches.length; i++) {

          console.log(`touchstart: ${i}.`);
          this.ongoingTouches.push(this.copyTouch(touches[i]));
          const color = this.colorForTouch(touches[i]);
          console.log(`color of touch with id ${touches[i].identifier} = ${color}`);
          // this.ctx.beginPath();
          // this.ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false); // a circle at the start
          // this.ctx.fillStyle = color;
          // this.ctx.fill();

        }

    }

        handleMove(evt) {

            evt.preventDefault();
            // const el = <HTMLCanvasElement> document.getElementById("canvas");
            // const ctx = el.getContext("2d");
            const touches = evt.changedTouches;
          
            for (let i = 0; i < touches.length; i++) {

              const color = this.colorForTouch(touches[i]);

              const idx 
              = this.ongoingTouchIndexById(touches[i].identifier);
          
              if (idx >= 0) {

                console.log(`continuing touch ${idx}`);

               // ctx.beginPath();

                console.log(
                  'ctx.moveTo( ${ongoingTouches[idx].pageX},'
                  +
                  ' ${ongoingTouches[idx].pageY} );',
                );

                // ctx.moveTo(this.ongoingTouches[idx].pageX, this.ongoingTouches[idx].pageY);
                // console.log(`ctx.lineTo( ${touches[i].pageX}, ${touches[i].pageY} );`);
                // ctx.lineTo(touches[i].pageX, touches[i].pageY);
                // ctx.lineWidth = 4;
                // ctx.strokeStyle = color;
                // ctx.stroke();
          
                this.ongoingTouches.splice(idx, 1, this.copyTouch(touches[i])); // swap in the new touch record
              } else {
                console.log("can't figure out which touch to continue");
              }
            }
          }

          handleEnd(evt) {
            evt.preventDefault();
            console.log("touchend");
            // const el = <HTMLCanvasElement> document.getElementById("canvas");
            // const ctx = el.getContext("2d");
            const touches = evt.changedTouches;
          
            for (let i = 0; i < touches.length; i++) {
              const color = this.colorForTouch(touches[i]);
              let idx = this.ongoingTouchIndexById(touches[i].identifier);
          
              if (idx >= 0) {
                // ctx.lineWidth = 4;
                // ctx.fillStyle = color;
                // ctx.beginPath();
                // ctx.moveTo(this.ongoingTouches[idx].pageX, this.ongoingTouches[idx].pageY);
                // ctx.lineTo(touches[i].pageX, touches[i].pageY);
                // ctx.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8); // and a square at the end
                this.ongoingTouches.splice(idx, 1); // remove it; we're done
              } else {
                console.log("can't figure out which touch to end");
              }
            }
          }

          handleCancel(evt) {
            evt.preventDefault();
            console.log("touchcancel.");
            const touches = evt.changedTouches;
          
            for (let i = 0; i < touches.length; i++) {
              let idx = this.ongoingTouchIndexById(touches[i].identifier);
              this.ongoingTouches.splice(idx, 1); // remove it; we're done
            }
          }

          colorForTouch(touch) {
            let r = touch.identifier % 16;
            let g = Math.floor(touch.identifier / 3) % 16;
            let b = Math.floor(touch.identifier / 7) % 16;
            let rhex = r.toString(16); // make it a hex digit
            let ghex = g.toString(16); // make it a hex digit
            let bhex = b.toString(16); // make it a hex digit
            const color = `#${rhex}${ghex}${bhex}`;
            return color;
          }

          copyTouch({ identifier, pageX, pageY }) {
            return { identifier, pageX, pageY };
          }

          ongoingTouchIndexById(idToFind) {

            for (let i = 0; i < this.ongoingTouches.length; i++) {

              const id = this.ongoingTouches[i].identifier;
          
              if (id === idToFind) {
                return i;
              }

            }
            return -1; // not found
          }

        //   console.log(msg) {
        //     const container = document.getElementById("console.log");
        //     container.textContent = `${msg} \n${container.textContent}`;
        //   }

}
