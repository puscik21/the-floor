interface ToastMessageProps {
    title: string;
    details?: string;
}

const ToastMessage = ({title, details}: ToastMessageProps) => (
    <div>
        <strong>{title}</strong>
        {details && (
            <div style={{marginTop: '10px', fontSize: '0.85em', opacity: 0.9}}>
                {details}
            </div>
        )}
    </div>
)

export default ToastMessage;
