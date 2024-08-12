import { createContext, useEffect } from "react";
import { io } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import config from "../../config";
import PropTypes from "prop-types";
export const ApplicationContext = createContext({});


export function ApplicationProvider({ children }) {
  ApplicationProvider.propTypes = {
    children: PropTypes.any.isRequired,
  };
  const queryClient = useQueryClient();

  const socketOptions = {
    autoConnect: false,
  };

  const SOCKET_IO_URL = config.socketUrl;
  const socket = io(SOCKET_IO_URL, socketOptions);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.connect();

    socket.on("error", (error) => {
      if (error && error.message) {
        toast.error(error.message);
      }
    });

    socket.on("notification", (data) => {
      toast.success(data?.msg);
    });

    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    socket.on("disconnect", (reason) => {
      console.log("Disconnected from the server:", reason);
    });

    socket.on("refetch", (msg) => {
      queryClient.invalidateQueries(msg?.key);
    });

    return () => {
      socket.disconnect();
      socket.off("notification");
      socket.off("refetch");
    };
  }, [queryClient, socket]);

  return (
    <ApplicationContext.Provider value={{ socket }}>
      {children}
    </ApplicationContext.Provider>
  );
}
