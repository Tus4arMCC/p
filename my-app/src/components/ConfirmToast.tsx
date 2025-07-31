import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ConfirmToastProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmToast: React.FC<ConfirmToastProps> = ({ message, onConfirm, onCancel }) => {
  const handleClickYes = () => {
    onConfirm();
    toast.dismiss(); // Dismiss the toast after action
  };

  const handleClickNo = () => {
    onCancel();
    toast.dismiss(); // Dismiss the toast after action
  };

  return (
    <>
      <div>
        <p>{message}</p>
        <button className="btn btn-primary mx-2" onClick={handleClickYes}>Yes</button>
        <button className="btn btn-secondary" onClick={handleClickNo}>No</button>
      </div>
    </>
  );
};

export const showConfirmToast = (
  message: string,
  onConfirm: () => void,
  onCancel: () => void
) => {
  toast.info(<ConfirmToast message={message} onConfirm={onConfirm} onCancel={onCancel} />, {
    position: "top-center",
    autoClose: false,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  });
};

export default ConfirmToast;