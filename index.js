import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", function connection(ws) {
    ws.on("message", function message(message) {
        const data = JSON.parse(message);

        if (data.type === "message") {
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: "message", data: data.data }));
                }
            });
        }
    });
});

// source 
// https://www.youtube.com/watch?v=TItbp7c9MNQ
// https://github.com/JasonMerrett/real-time-chat-app/blob/master/index.html