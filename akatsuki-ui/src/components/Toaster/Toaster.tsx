import { cssTransition, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Toaster.scss';

export enum NotificationType {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

export interface ToasterI {
  message: string;
  progress_bar: boolean;
  type: string;
  closeInTime: number;
}

export const SUCCESS = 'success';
export const WARNING = 'warning';
export const ERROR = 'error';

export const dismissToaster = () => {
  toast.dismiss();
};

export const notify = (props: ToasterI) => {
  toast.clearWaitingQueue();
  toast.dismiss();
  /* eslint-disable no-nested-ternary */
console.log('loging')
  toast(
    <div id="toast-container" className="toast-top-right">
      <div className={`toast  toast-${props.type}`}>
        {/* eslint-disable @typescript-eslint/indent */}
        <span
          className={`hevo-${
            props.type === 'success'
              ? 'checked-tick'
              : props.type === 'warning'
              ? 'warning'
              : 'error-filled'
          } hevo-icon toaster-icon`}
        />
        <div className="toast-content">
          <div className="toast-title" />
          <div className="toast-message">
            <div style={{ whiteSpace: 'pre-line' }}>{props.message}</div>
          </div>
        </div>
        <span onClick={() => toast.dismiss()} className="hevo-icon hevo-close toast-close-button" />
      </div>
    </div>,
    {
      position: 'top-right',
      autoClose: props.closeInTime,
      hideProgressBar: props.progress_bar,
      pauseOnHover: true,
      progress: undefined
    }
  );
  toast.clearWaitingQueue();
};

// const Zoom = cssTransition({
//   enter: 'zoomIn',
//   exit: 'zoomOut',
// });

function Toaster() {
  toast.clearWaitingQueue();
  toast.dismiss();

  return (
    <div id="toast-container">
      <ToastContainer
        limit={0}
        hideProgressBar
        closeOnClick={true}
        // transition={Zoom}
        closeButton={false}
      />
    </div>
  );
}

export default Toaster;