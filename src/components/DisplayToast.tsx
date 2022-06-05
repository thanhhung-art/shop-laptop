import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DisplayToast = () => {

  return (
    <ToastContainer
      position={"top-right"}
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  )
};
 
export const notify = (message: string) => toast(message);

export default DisplayToast;
