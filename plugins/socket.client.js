import { io } from 'socket.io-client';

export default defineNuxtPlugin((nuxtApp) => {
  // Kết nối tới WebSocket server trên cùng cổng của Nuxt
  const socket = io('http://localhost:3001'); // Không cần chỉ định URL, socket.io tự động kết nối đến cùng host và cổng của ứng dụng

  // Cung cấp đối tượng socket cho toàn bộ ứng dụng
  nuxtApp.provide('socket', socket);
});
