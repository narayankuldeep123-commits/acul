function HeadTemplate() {
    const logo_uri = "https://docs.dev.login.jnj.com/auth0/jj/logo/logo.png"
    
    return (
        <header className="page-header">
            <div className="header-inner">
                <img src={logo_uri} className='logo' alt='logo' />
                <hr className="header-divider" />
            </div>
        </header>
    )            
};

export default HeadTemplate;