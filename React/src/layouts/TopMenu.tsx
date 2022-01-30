import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import classNames from 'classnames';
import Icon from 'images/icon-95x56.png';
import SignInButton from 'layouts/SignInButton';
import SignOutButton from 'layouts/SignOutButton';
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
];

const DropDownItem = ({ text, link }: { text: string, link?: string }) => {
    if (text === '-' || !link) {
        return <hr className="navbar-divider" />;
    }
    return <Link className="navbar-item" to={link}>{text}</Link>;
};

const TopMenu = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const { accounts } = useMsal();

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/" title="Hy Academy">
                    <img src={Icon} height="28" alt="Hy Academy" />
                </Link>

                <button
                    className={classNames('navbar-burger', { 'is-active': isMenuOpen })}
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                    onClick={() => setMenuOpen(!isMenuOpen)}
                >
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                </button>
            </div>

            <div id="navbarBasicExample" className={classNames('navbar-menu', { 'is-active': isMenuOpen })}>
                <div className="navbar-start">
                    {menu.map(item => (item.items ?
                        (
                            <div key={item.text} className="navbar-item has-dropdown is-hoverable">
                                <span className="navbar-link">
                                    {item.text}
                                </span>
                                <div className="navbar-dropdown">
                                    {item.items.map((subItem, index) => <DropDownItem key={subItem.text !== '-' ? subItem.text : index} text={subItem.text} link={subItem.link} />)}
                                </div>
                            </div>
                        ) :
                        (
                            <Link key={item.text} to={item.link} className="navbar-item">
                                {item.text}
                            </Link>
                        )
                    ))}
                </div>

                <div className="navbar-end">
                    <UnauthenticatedTemplate>
                        <div className="navbar-item">
                            <SignInButton />
                        </div>
                    </UnauthenticatedTemplate>
                    <AuthenticatedTemplate>
                        <div className="navbar-item">
                            <h2>{accounts && accounts.length > 0 ? `Welcome ${accounts[0].name}` : 'Welcome!'}</h2>
                        </div>
                        <div className="navbar-item">
                            <div className="buttons">
                                <EditProfileButton />
                                <SignOutButton />
                            </div>
                        </div>
                    </AuthenticatedTemplate>
                </div>
            </div>
        </nav>
    );
};

export default TopMenu;
