//event loop is a C program that runs in the background and executes all the callbacks in the queue
//async functions are executed in the event loop
//event loop has 6 phases


console.log("start")

setTimeout(()=>{
    console.log("set timeout 1") 
},2000)

setTimeout(()=>{
    console.log("set timeout 2") 
},500)

console.log("end")