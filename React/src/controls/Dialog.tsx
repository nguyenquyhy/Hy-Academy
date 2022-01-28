import { useState } from 'react';
import classNames from 'classnames';

interface DialogProps {
    title: string;
    message: string;
}

const Dialog = ({ title, message }: DialogProps) => {
    const [isOpen, setOpen] = useState(true);

    return (
        <div className={classNames('modal', { 'is-active': isOpen })}>
            <div className="modal-background" data-testid="dialog-background" onClick={() => setOpen(false)}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{title}</p>
                    <button className="delete" aria-label="close" onClick={() => setOpen(false)}></button>
                </header>
                <section className="modal-card-body">
                    {message}
                </section>
            </div>
        </div>
    );
};

export default Dialog;