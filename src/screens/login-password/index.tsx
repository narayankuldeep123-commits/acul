import React, {useState, useEffect} from "react";
import LoginPassword from "@auth0/auth0-acul-js/login-password";
import HeadTemplate from "@/shared/HeadTemplate";
import FootTemplate from "@/shared/FootTemplate";
import StaticImgTemplate from "@/shared/StaticImgTemplate";


const LoginPasswordScreen: React.FC = () => {
    
    const passwordManager = new LoginPassword();
    const [password, setPassword] = useState('');
    const [trans, setTrans] = useState<any>(null);
    const [error] = useState<String | null>(null);

    const username = passwordManager.user.username || "";
    
    useEffect(() => {
        const loadLocale = async () => {
            const curLocale = passwordManager.transaction?.locale || 'en';
            try {
                const data = await import(`./locale/${curLocale}.json`);
                setTrans(data.default);
            }
            catch {
                const fallback = await import('./locale/en.json');
                setTrans(fallback.default);
            }
        };
        loadLocale();
    }, []);

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        try {
            await passwordManager.login({ username, password });
        }
        catch (err) {
            console.log("Login Failed...", err);
        }
    };

    if(!trans)
        return <div>Loading....</div>
    
    return (
        <>
        <StaticImgTemplate />
        <HeadTemplate />
        <div className="loginFormDiv">
             <h2 className="signinHeading">{trans.header.description}</h2>
             <form onSubmit={handleSubmit}>
                <div className="formDiv">
                    <label className="identifierLabel" htmlFor="identifier">{trans.form.fields.password.label}</label>
                    <input 
                        className="identifierInput"
                        id="identifier" 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder={trans.form.fields.password.placeholder} 
                        required 
                    />
                </div>
                {error && <p style={{color:'red'}}>{error}</p>}
                <button className="btnSubmit" type="submit">
                    {trans.form.button}
                </button>
            </form>

            <button onClick={() =>
                window.history.back()}
                style={{ background: "none", border: "none", color: "blue", cursor: "pointer", marginTop:"10px"}}>
                    Clicked Backed
            </button>
        </div>
        <FootTemplate />
        </>
    );
};

export default LoginPasswordScreen;

