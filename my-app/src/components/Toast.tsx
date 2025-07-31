import React from 'react';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Configure default options (optional)
const toastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
};

export const showSuccessToast = (message: string): void => {
  toast.success(message, toastOptions);
};

export const showErrorToast = (message: string): void => {
  toast.error(message, toastOptions);
};

export const showInfoToast = (message: string): void => {
  toast.info(message, toastOptions);
};

export const showWarningToast = (message: string): void => {
  toast.warning(message, toastOptions);
};

// You should render the ToastContainer component in your App.js or root component
export { ToastContainer };
