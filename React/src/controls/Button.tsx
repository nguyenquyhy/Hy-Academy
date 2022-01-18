import * as React from 'react';
import classnames from 'classnames';

interface Props {
    loading?: boolean;
    children: React.ReactNode; 
    onClick?: () => void;   
}

const Button = ({ loading, children, onClick } : Props) => 
    <button type="button" className={classnames("button", "is-primary", { "is-loading": loading })} onClick={onClick}>
        { children }
    </button>

export default Button;