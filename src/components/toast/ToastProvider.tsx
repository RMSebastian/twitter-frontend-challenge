import React, { createContext, ReactNode, useContext, useState } from "react";
import Toast, { ToastType } from "./Toast";

interface ToastProps {
  //Los datos necesarios para crear un Toast
  message: string;
  type: ToastType;
  show?: boolean; //Puedo remplazarlo por el timer del timeOut
}
interface ToastContextCallbacks {
  //Esto lo que define es el cotenido del context, en este caso, sera el metodo para crear toast
  addToast: (toast: ToastProps) => void;
}
interface ToastProviderProps {
  children: ReactNode;
}

const ToastContext = createContext<ToastContextCallbacks | undefined>(
  undefined
);
export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = (toast: ToastProps) => {
    setToasts((prevToasts) => [...prevToasts, toast]);
    setTimeout(() => setToasts((prevToasts) => prevToasts.slice(1)), 3000);
  };
  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {toasts.map((toast, index) => (
        <Toast key={index} message={toast.message} type={toast.type}></Toast>
      ))}
    </ToastContext.Provider>
  );
};

//Hook
export const useToast = (): ToastContextCallbacks => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("No ToastContext exist exist");
  }
  return context;
};
