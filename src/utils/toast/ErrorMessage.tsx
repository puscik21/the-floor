interface ErrorMessageProps {
    title: string;
    errorDetails: string;
}

const ErrorMessage = ({title, errorDetails}: ErrorMessageProps) => (
    <div>
        <strong>{title}</strong>
        <div style={{marginTop: '10px', fontSize: '0.85em', opacity: 0.9}}>
            {errorDetails}
        </div>
    </div>
)

export default ErrorMessage;
