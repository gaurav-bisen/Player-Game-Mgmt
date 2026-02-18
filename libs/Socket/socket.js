import { Server } from 'socket.io'

let io; //global

export const initSocket = (server) => {
    io = new Server(server);

    io.on("connection", (socket) => {
        console.log("Socket connected: ", socket.id);
    
        //client send userId after connect
        socket.on("register", (userId) => {
            console.log("User joined room: ", userId);
            socket.join(String(userId)); //join private room
        })
    
        socket.on("disconnect", () => {
            console.log("Socket Disconnect: ", socket.id);
        })
    })

    return io;
}

//helper to emit events
export const getIo = () => {
    if(!io) {
        throw new Error("Socket IO not initialized!")
    }
    return io;
}

