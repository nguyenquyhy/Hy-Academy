import * as React from 'react';
import classnames from 'classnames';

export enum ButtonType {
    Primary,
    Secondary
}

interface Props {
    loading?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
    type: ButtonType;
}

function typeToColor(type: ButtonType) {
    switch (type) {
        case ButtonType.Secondary:
            return "is-light";
        default:
            return "is-primary";
    }
}

const Button = ({ loading, children, onClick, type } : Props) => (
    <button type="button" className={classnames("button", typeToColor(type), { "is-loading": loading })} onClick={onClick}>
        { children }
    </button>
);

Button.defaultProps = {
    type: ButtonType.Primary
}

export default Button;