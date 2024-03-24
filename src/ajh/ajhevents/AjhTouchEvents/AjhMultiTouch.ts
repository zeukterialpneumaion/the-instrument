export default class AjhMultiTouch 
{

//     !--https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Multi-touch_interaction-->

// <html lang=en>
// <!--
//   This app demonstrates using the Touch Events touch event types (touchstart,
//   touchmove, touchcancel and touchend) for the following interaction:
//    1. Single touch
//    2. Two (simultaneous) touches
//    3. More than two simultaneous touches
//    4. 1-finger swipe
//    5. 2-finger move/pinch/swipe
// -->

log(message:string,evt:any,bool:boolean){
    console.log ( message + ". " + evt + ", " + bool);
}

//<script>
// Log events flag
 logEvents = false;

// Touch Point cache
 tpCache = new Array();

start_handler(ev) {
 // If the user makes simultaneious touches, the browser will fire a
 // separate touchstart event for each touch point. Thus if there are
 // three simultaneous touches, the first touchstart event will have
 // targetTouches length of one, the second event will have a length
 // of two, and so on.
 ev.preventDefault();
 // Cache the touch points for later processing of 2-touch pinch/zoom
 if (ev.targetTouches.length == 2) {
   for (var i=0; i < ev.targetTouches.length; i++) {
    this.tpCache.push(ev.targetTouches[i]);
   }
 }
 if (this.logEvents) this.log("touchStart", ev, true);
 this.update_background(ev);
}

move_handler(ev) {
 // Note: if the user makes more than one "simultaneous" touches, most browsers
 // fire at least one touchmove event and some will fire several touchmoves.
 // Consequently, an application might want to "ignore" some touchmoves.
 //
 // This function sets the target element's outline to "dashed" to visualy
 // indicate the target received a move event.
 //
 ev.preventDefault();
 if (this.logEvents) this.log("touchMove", ev, false);
 // To avoid too much color flashing many touchmove events are started,
 // don't update the background if two touch points are active
 if (!(ev.touches.length == 2 && ev.targetTouches.length == 2))
 this.update_background(ev);

 // Set the target element's outline to dashed to give a clear visual
 // indication the element received a move event.
 ev.target.style.outline = "dashed";

}

end_handler(ev) {
  ev.preventDefault();
  if (this.logEvents) this.log(ev.type, ev, false);
  if (ev.targetTouches.length == 0) {
    // Restore background and outline to original values
    ev.target.style.background = "white";
    ev.target.style.outline = "1px solid black";

    //
    // remove the touch from the cache ::
    for (var i=0; i < this.tpCache.length; i++) {
        
        let element = this.tpCache[i];
        
        if( (element.id) == ev.id){
        
            this.tpCache.splice( i, 1 );
        
        }
        
        this.tpCache.push(ev.targetTouches[i]);
       
    }

  }
}

set_handlers(name) {
 // Install event handlers for the given element
 var el=document.getElementById(name);
 el.ontouchstart = this.start_handler;
 el.ontouchmove = this.move_handler;
 // Use same handler for touchcancel and touchend
 el.ontouchcancel = this.end_handler;
 el.ontouchend = this.end_handler;
}

update_background(ev) {
 // Change background color based on the number simultaneous touches
 // in the event's targetTouches list:
 //   yellow - one tap (or hold)
 //   pink - two taps
 //   lightblue - more than two taps
 switch (ev.targetTouches.length) {
   case 1:
     // Single tap`
     ev.target.style.background = "yellow";
     break;
   case 2:
     // Two simultaneous touches
     ev.target.style.background = "pink";
     break;
   default:
     // More than two simultaneous touches
     ev.target.style.background = "lightblue";
 }
}
  
init() {
    this.set_handlers("target1");
    this.set_handlers("target2");
    this.set_handlers("target3");
    this.set_handlers("target4");
}


// <head>
// <title>Touch Events tutorial</title>
// <meta name="viewport" content="width=device-width">
// <style>
//   div {
//     margin: 0em;
//     padding: 2em;
//   }
  
//   #target1, #target2, #target3, #target4  {
//     background: white;
//     border: 1px solid black;
//   }
// </style>
// </head>
  
// <body onload="init();">
// <h1>Multi-touch interaction</h1>
//  <!-- Create some boxes to test various gestures. -->
//  <div id="target1"> Tap, Multi-touch hold me 1</div>
//  <div id="target2"> Tap, Multi-touch Hold me 2</div>
//  <div id="target3"> Tap, Multi-touch Hold me 3</div>
//  <div id="target4"> Tap, Multi-touch Hold me 4</div>

// </body>
// </html>


}