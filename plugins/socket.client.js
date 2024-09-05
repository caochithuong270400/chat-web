import { io } from 'socket.io-client';

export default defineNuxtPlugin((nuxtApp) => {
  const socket = io('http://localhost:3001'); // Kết nối tới WebSocket server

  // Cung cấp đối tượng socket cho toàn bộ ứng dụng
  nuxtApp.provide('socket', socket);
});
