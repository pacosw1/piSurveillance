let app = require('express')()
let server = require("http").Server(app)
let io = require('socket.io')(server)

let port = process.env.port || 4000

server.listen(port, () => {
	console.log("Listening on port ", port)
})

io.on("connected", () => {
	console.log("Camera feed received")
})

io.emit("incoming data", {data: "success"})

io.on("connection", socket => 	{
	_id = ""
	sid = ""
	io.emit("connected", {data: "sucess"})
	socket.on("connected", data => {
		console.log(data)
		_id = data._id
		sid = data.sid
	})

	socket.on("disconnect", () => {
		console.log("Camera " + _id + " disconnected");
	})

	socket.on("feed", feed => {
		console.log(feed)
	})
})
io.on("connected", data => {
	console.log(data)
})
app.get("/", (req, res) => {
	res.send("Welcome to feedCam api")
})

