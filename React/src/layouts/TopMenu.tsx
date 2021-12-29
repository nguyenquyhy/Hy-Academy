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

const TopMenu = () => (
    <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
            <a className="navbar-item" href="/">
                <img src="https://via.placeholder.com/112x28?text=Logo" width="112" height="28" alt="Hy Academy" />
            </a>

            <button className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </button>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
                {menu.map(item => item.items ? 
                    (
                        <div className="navbar-item has-dropdown is-hoverable">
                            <span className="navbar-link">
                                {item.text}
                            </span>
                            <div className="navbar-dropdown">
                                {item.items.map(subItem => subItem.text === '-' ?
                                (
                                    <hr className="navbar-divider" />
                                ):
                                (
                                    <a className="navbar-item" href={subItem.link}>
                                        {subItem.text}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ) :
                    (
                        <a key={item.text} href={item.link} className="navbar-item">
                            {item.text}
                        </a>
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
                    </div>
                </div>
            </div>
        </div>
    </nav>
)

export default TopMenu;