import WebSocket from "ws";

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (socket, req) => {
    console.log(`Received new connection from ${req.connection.remoteAddress}`);

    socket.on("message", (data) => {
        try {
            const obj = JSON.parse(data.toString());
            if (obj.topic === "digital-out") {
                const data = JSON.stringify({
                    topic: "digital-in",
                    payload: {
                        channel: 0,
                        value: obj.payload.value
                    }
                });
                socket.send(data);
            }
        }
        catch (err) {
            console.log("Error parsing: ", err);
        }
        console.log(`Received: ${data.toString()}`);
    });
});
