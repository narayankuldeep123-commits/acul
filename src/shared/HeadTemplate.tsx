function HeadTemplate() {
    const logo_uri = "https://docs.dev.login.jnj.com/auth0/jj/logo/logo.png"
    
    return (
        <div className='authContainer'>
            <div className='authHeader'>
                <h1>
                    <img src={logo_uri} className='authLogo' alt='logo' />
                </h1>
                <div datatype='beacon-container' className="authBeaconContainer"></div>
            </div>
        </div>
    )            
};

export default HeadTemplate;