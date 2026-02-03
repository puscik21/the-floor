import {toast} from "react-toastify";
import {defaultToastOptions} from "./toastOptions.ts";

export const notifySuccess = (message: string) => toast.success(message, defaultToastOptions())

export const notifyWarning = (message: string) => toast.warning(message, defaultToastOptions())

export const notifyError = (message: string, error?: unknown) =>
    toast.error(prepareErrorMessage(message, error), defaultToastOptions())

const prepareErrorMessage = (message: string, error?: unknown) => {
    if (!error) {
        return message
    }

    if (error instanceof Error) {
        return `${message}: \n\n ${error.message}`
    } else {
        return `${message}: \n\n Nieznany błąd`
    }
}
