// server/websocket.js
import { Server } from 'socket.io';
import { createServer } from 'http';

const server = createServer();
const io = new Server(server, {
    cors: {
        origin: "*", // Cho phép truy cập từ bất kỳ nguồn gốc nào, cấu hình lại nếu cần.
    },
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('message', (data) => {
        console.log('Message received:', data);
        console.log('Message received:', data.message);
        console.log('Message received:', data.user);
        // Phát tin nhắn đến tất cả các client
        io.emit('reply', {
            user: data.user,
            message: data.message
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const port = 3001
server.listen(port, () => {
    console.log('WebSocket server is running on port', port);
});
