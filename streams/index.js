const fs = require("fs")
const http = require("http")

const server = http.createServer()

server.on("request", (req, res) => {
    //***************without streaming***************
    fs.readFile("input.txt", (err, data) => {
        if (err) return console.error(err);
        console.log(data.toString())
        res.end(data.toString())
    })

    //***************reading with stream***************
    const rstream = fs.createReadStream("input.txt")
    // data means when data is available
    rstream.on("data", (chunk) => {
        //writing at the same time
        res.write(chunk)
    })
    //end means when data is finished
    rstream.on("end", () => {
        res.end()
    })
    //error means when error occurs
    rstream.on("error", (err) => {
        console.log(err)
        res.end("File not found")
    })

    //***************writing with stream on a seperate file***************
    const wstream = fs.createWriteStream("output.txt")
    //writing data
    wstream.write("Hello World")
    wstream.write("This is a new file")
    wstream.end()


    //***************piping***************
    const rstreampipe = fs.createReadStream("input.txt")
    //in argument we write destination where we want to write
    //it reads and writes at the same time
    rstreampipe.pipe(res)
})

server.listen(8000, "127.0.0.1")