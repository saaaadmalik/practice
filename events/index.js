const EventEmitter = require("events")
const event = new EventEmitter()


// ************Event to be fired once***********

//listening for event
event.on("fireEvent", ()=>{
    console.log("Event Fired")
})

//emiting event
event.emit("fireEvent")

//***************Create an event emitter for multiple events**************

event.on("fireMultipleEvents", ()=>{
    console.log("Event Fired 1")
})
event.on("fireMultipleEvents", ()=>{
    console.log("Event Fired 2")
})
event.on("fireMultipleEvents", ()=>{
    console.log("Event Fired 3")
})
event.emit("fireMultipleEvents")


//*****************registering for event with callback parameters***********

event.on("checkpage", (code,msg)=>{
    console.log(`Status code is ${code} and the page is ${msg}`)
})

event.emit("checkpage", 200, "ok")