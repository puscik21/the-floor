import {toast} from "react-toastify";
import {defaultToastOptions} from "./toastOptions.ts";
import ToastMessage from "./ToastMessage.tsx";

export const notifySuccess = (message: string, details?: string) =>
    toast.success(prepareToastMessage(message, details), defaultToastOptions())

export const notifyWarning = (message: string, details?: string) =>
    toast.warning(prepareToastMessage(message, details), defaultToastOptions())

export const notifyError = (message: string, error?: unknown) =>
    toast.error(prepareErrorMessage(message, error), defaultToastOptions())

const prepareErrorMessage = (message: string, error?: unknown) => {
    if (!error) {
        return message
    }

    if (error instanceof Error) {
        return prepareToastMessage(message, error.message)
    } else {
        return prepareToastMessage(message, "Nieznany błąd")
    }
}

const prepareToastMessage = (message: string, details?: string) => {
    return <ToastMessage title={message} details={details}/>
}
