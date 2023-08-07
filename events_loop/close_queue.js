//close queue callbacks are executed after all the other queues callbacks in a given iteration of the loop are executed

const fs = require("fs")

const readableStream = fs.createReadStream(__filename)
readableStream.close()

readableStream.on('close', ()=>{
    console.log("this is readable stream close event callback")
})

setImmediate(()=>{
    console.log("set immediate")
})
setTimeout(() => {
    console.log("set timeout.")
}, 0);
process.nextTick(()=>{
    console.log("next tick")
})
Promise.resolve().then(()=>{
    console.log("promise")
})
