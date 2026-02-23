function HeadTemplate() {
    const logo_uri = "https://docs.dev.login.jnj.com/auth0/jj/logo/logo.png"
    
    return (
        <header className="fixed-header">
            <img src={logo_uri} className='brand-logo' alt='logo' />
            <hr className="header-line" />
        </header>
    )            
};

export default HeadTemplate;