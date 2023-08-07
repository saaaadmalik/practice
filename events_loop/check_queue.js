//check queue call backs are executed after microtask, timer and io queue callbacks are executed
//in this case , microtask queue callbacks are executed after io callbacks and before check queue callbacks

const fs = require("fs")

fs.readFile(__filename,()=>{
    console.log("read file 1")
    setImmediate(()=>{
        console.log("set immediate")
    })
    process.nextTick(()=>{
        console.log("next tick inside read file")
    })
    Promise.resolve().then(()=>{
        console.log("promise inside read file")
    })
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

//*** */

setImmediate(()=>{
    console.log("set immediate 1")
})
setImmediate(()=>{
    console.log("set immediate 2")
    process.nextTick(()=>{
        console.log("next tick inside set immediate 2")
    })
    Promise.resolve().then(()=>{
        console.log("promise inside set immediate 2")
    })
})
setImmediate(()=>{
    console.log("set immediate 3")
})

//*** */
//when using settimeout with 0 delay and setimmediate, the order of execution is not guaranteed. logic is same as discussed earlier
setTimeout(() => {
    console.log("set timeout with 0 delay")
}, 0);
setImmediate(()=>{
    console.log("set immediate 1")
})




