function FootTemplate( {privacypolicy}: {privacypolicy: any}) {
    return (
        <footer className="content-footer">
            <hr className="divider"/>
            <a href="#" className="privacy-link">{privacypolicy}</a>
        </footer>
    )            
};

export default FootTemplate;