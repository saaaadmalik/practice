// io events are polled and callbacks functions are added to io queue only after i/o is completed.


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

//as we know, io queue has high priority than check queue
//initially all these methods are called in the call stack()
//and from the call stack they are transfered to their respective queues
//initially io queue is empty.
//when the control reaches io queue after micro and timer, the control is transfered to io polling
//io polling checks if the io operations are completed or not i.e read file is completed or not
//if it is completed then callback is added to the io queue
//but at that time the control is at check queue, so it executes callback in the check queue
//and in the next iteration, the control is transfered to io queue and callback is executed
//that's why check queue callbacks here, are executed before io queue callbacks

//check queue callback
setImmediate(()=>{
    console.log("set immediate")
})
