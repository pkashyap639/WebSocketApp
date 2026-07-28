import { io } from "socket.io-client";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNTNmY2ZkZjVmODYxZmMzZWI5YTA2OCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzg1MTk5MDUwLCJleHAiOjE3ODUyMDI2NTB9.hZL_39L4ekIhmCV51VIt5RVAnpVTb-4ORY1j07esncc";

const socket = io("http://localhost:3000", {
  auth: {
    token: token,
  },
});

socket.on("connect", () => {
  console.log(`Connected! Socket ID: ${socket.id}`);
});

socket.on("connect_error", (error) => {
  console.log("Connection failed:", error.message);
});
