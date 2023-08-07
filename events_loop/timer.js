//callbacks in the timer queue has high priority
//but callbacks in the microtask queue has higher priority
//timer queue callbacks are executed in FIFO order
//after every callback in the timer queue, the event loop checks the microtask queue

console.log("start")

setTimeout(() => {
    console.log("set timeout with 1000 delay")
}, 1000);
setTimeout(() => {
    console.log("set timeout 1")
}, 0);
setTimeout(() => {
    console.log("set timeout 2")
    Promise.resolve().then(()=>{console.log("promise inside set timeout 2")})
    process.nextTick(()=>{console.log("next tick inside set timeout 2")})
}, 0);
setTimeout(() => {
    console.log("set timeout 3")
}, 0);
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



setTimeout(() => {
    console.log("set timeout with 500 delay")
}, 500);
setTimeout(() => {
    console.log("set timeout with 0 delay")
}, 0);

console.log("end")


