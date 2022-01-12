import { Link } from 'react-router-dom';
import Icon from 'images/icon-95x56.png';
import { useState } from 'react';
import classNames from 'classnames';
import SignInButton from '../components/SignInButton'

const menu = [
    {
        text: 'Documentation',
        link: '#'
    },
    {
        text: 'More',
        items: [
            {
                text: 'About',
                link: '/about'
            },
            {
                text: 'Contact',
                link: '/contact'
            },
            {
                text: '-'
            },
            {
                text: 'Report an issue',
                link: '/report'
            }
        ]
    }
]

const TopMenu = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/" title="Hy Academy">
                    <img src={Icon} height="28" alt="Hy Academy" />
                </Link>

                <button 
                    className={classNames("navbar-burger", { "is-active": isMenuOpen })} 
                    aria-label="menu" 
                    aria-expanded="false" 
                    data-target="navbarBasicExample"
                    onClick={() => setMenuOpen(!isMenuOpen)}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </button>
            </div>

            <div id="navbarBasicExample" className={classNames("navbar-menu", { "is-active": isMenuOpen })}>
                <div className="navbar-start">
                    {menu.map(item => item.items ? 
                        (
                            <div key={item.text} className="navbar-item has-dropdown is-hoverable">
                                <span className="navbar-link">
                                    {item.text}
                                </span>
                                <div className="navbar-dropdown">
                                    {item.items.map((subItem, index) => subItem.text === '-' || !subItem.link ?
                                    (
                                        <hr key={index} className="navbar-divider" />
                                    ):
                                    (
                                        <Link key={subItem.text} className="navbar-item" to={subItem.link}>
                                            {subItem.text}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) :
                        (
                            <Link key={item.text} to={item.link} className="navbar-item">
                                {item.text}
                            </Link>
                        )
                    )}
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <a className="button is-primary" href="/signup">
                                <strong>Sign up</strong>
                            </a>
                            <a className="button is-light" href="/signin">
                                Log in
                            </a>
                            <SignInButton/>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default TopMenu;