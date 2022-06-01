import './Input.css';

interface InputProps {
    label: string
    name: string
    placeholder: string
    hideHeader?: boolean
    loading?: boolean
    required?: boolean
    multiline?: boolean
    value: string
    onChange: (name: string, value: string) => void
}

const Input = ({ label, name, placeholder, hideHeader, loading, required, multiline, value, onChange }: InputProps) => (
    <div className="field">
        {!hideHeader && <label htmlFor={name} className="label">{label}</label>}
        <p className="control">
            {!multiline ? (
                <input
                    name={name}
                    className="input"
                    type="text"
                    title={label}
                    placeholder={placeholder}
                    disabled={!!loading}
                    required={required}
                    value={value}
                    onChange={e => onChange(name, e.target.value)}
                />
            ) : (
                <textarea
                    name={name}
                    className="input"
                    title={label}
                    placeholder={placeholder}
                    disabled={!!loading}
                    required={required}
                    value={value}
                    onChange={e => onChange(name, e.target.value)}
                />
            )}
        </p>
    </div>
);

export default Input;
