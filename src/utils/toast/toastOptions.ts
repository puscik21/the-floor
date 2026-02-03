import {Bounce, type ToastOptions, type ToastPosition} from "react-toastify";

export const defaultToastOptions = (position: ToastPosition = "top-right"): ToastOptions => {
    return ({
            position: position,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            rtl: false,
            pauseOnFocusLoss: true,
            draggable: true,
            pauseOnHover: true,
            theme: "dark",
            transition: Bounce,
            style: {whiteSpace: 'pre-line'}
        }
    )
}
