//event loop has 6 phases
//microtask queue is a queue that is executed before the event loop
//microtask queue contains nextTick and promises.
//nextTick is executed before promises

console.log("start")
process.nextTick(()=>{
    console.log("next tick 1")
})
Promise.resolve().then(()=>{
    console.log("promise 1")
})
process.nextTick(()=>{
    console.log("next tick 2")

})
Promise.resolve().then(()=>{
    console.log("promise 2")
})
process.nextTick(()=>{
    console.log("next tick 3")
})
Promise.resolve().then(()=>{
    console.log("promise 3")
})

console.log("end")
