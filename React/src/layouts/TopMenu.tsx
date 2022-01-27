import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import classNames from 'classnames';
import Icon from 'images/icon-95x56.png';
import SignInButton from 'layouts/SignInButton'
import SignOutButton from 'layouts/SignOutButton'
import EditProfileButton from 'layouts/EditProfileButton';

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
                    <UnauthenticatedTemplate>
                        <div className="navbar-item">
                            <SignInButton/>
                        </div>
                    </UnauthenticatedTemplate>
                    <AuthenticatedTemplate>
                        <div className="navbar-item">
                            <EditProfileButton/>
                        </div>
                        <div className="navbar-item">
                            <SignOutButton/>
                        </div>
                    </AuthenticatedTemplate>                        
                </div>
            </div>
        </nav>
    );
}

export default TopMenu;