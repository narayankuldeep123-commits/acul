function StaticImgTemplate() {
    const static_img_uri = "https://docs.dev.login.jnj.com/assets/jj/customizations/undefined/static_signin_image.png"
    return (
        <div className="sidebar-image-container">
            <img src={static_img_uri} alt="Side Decoration" />
        </div>
    )            
};

export default StaticImgTemplate;