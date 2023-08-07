//most of the async methods from built-in modules queue the callback function in the i/o queue
//io queue callbacks are executed after the timer queue callbacks and microtask queue callbacks
//when running settimeout with 0 delay and an i/o async method, the order of the execution is not guaranteed
//because 0 delay is sometimes overriden by 1ms delay. when cpu enters the event loop at 0.5ms, so maybe settiemout is not loaded yet in the timer queue so maybe i/o async method is executed first
//but when cpu enters the event loop at 1.01ms, maybe settimeout is executed first 

const fs = require("fs")

fs.readFile(__filename,()=>{
    console.log("read file")
})

setTimeout(()=>{
 console.log("set timeout ")
},0)

process.nextTick(()=>{
    console.log("next tick")
})

Promise.resolve().then(()=>{
    console.log("promise")
})
