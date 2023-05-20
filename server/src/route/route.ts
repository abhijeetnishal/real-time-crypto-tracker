import { Server, Socket } from "socket.io";
//In the TypeScript code, we import the Server and Socket types from the "socket.io" module.
import getCryptoData from "../controller/controller";

function handleSocketIO(io: Server){
    io.on("connection", (socket: Socket) => {
        //console.log("Client connected");
        
        socket.on("disconnect", () => {
            //console.log("Client disconnected");
        });
        
        socket.on("getCoinData", async () => {
            const data = await getCryptoData();
            //console.log(data);
            socket.emit("coinData", data);
        });
    });
}

export default handleSocketIO;  