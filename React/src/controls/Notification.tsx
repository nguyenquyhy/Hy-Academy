import classNames from 'classnames';
import { useState } from 'react';

export enum NotificationType {
    Default,
    Error
}

function typeToClassName(type?: NotificationType) {
    switch (type) {
        case NotificationType.Error:
            return 'is-danger';
        default:
            return 'is-primary';
    }
}

const Notification = ({ message, type }: { message: string, type?: NotificationType }) => {
    const [show, setShow] = useState(true);

    return show ? (
        <div className={classNames('notification', typeToClassName(type))}>
            <button className="delete" aria-label="close" onClick={() => setShow(false)} />
            {message}
        </div>
    ) : null;
};

export default Notification;
