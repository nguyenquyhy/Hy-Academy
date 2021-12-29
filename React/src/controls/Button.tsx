import * as React from 'react';
import classnames from 'classnames';

interface Props {
    loading?: boolean;
    children: React.ReactNode;
}

const Button = ({ loading, children } : Props) => 
    <button type="button" className={classnames("button", "is-primary", { "is-loading": loading })}>
        { children }
    </button>

export default Button;