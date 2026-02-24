import React, { useState, useEffect } from "react";
import LoginId from '@auth0/auth0-acul-js/login-id';
import StaticImgTemplate from "@/shared/StaticImgTemplate";
import LoadingSpinner from "@/shared/LoadingSpinner";
import FootTemplate from "@/shared/FootTemplate";
import HeadTemplate from "@/shared/HeadTemplate";
import ErrorIcon from "../../assets/Vector.svg"

const LoginIdScreen: React.FC = () => {

    const [loginIdManager] = useState(() => new LoginId());
    const [email, setEmail] = useState<string>('');
    const [error, setError ] = useState<string | null>(null);
    const [blankerror, setBlankError] = useState<string | null>(null);
    const [trans, setTrans] = useState<any>(null);

    useEffect(() => {
        const curLocale = loginIdManager.transaction?.locale || 'en';
        const loadLocale = async () => {
            try {
                const data = await import(`./locale/${curLocale}.json`);
                setTrans(data.default);
            }
            catch (err)
            {
                console.error("Could not load locale! Falling back to English");
                const fallback = await import('./locale/en.json');
                setTrans(fallback.default);
            }
        };
        loadLocale();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setBlankError(null);

        if(email.trim() === '')
        {
            console.log("inside if blank error");
            return;
        }
        
        try {
            await loginIdManager.login({ username: email });
        }
        catch (err) {
            const errors = loginIdManager.getErrors();
            setError(errors?.[0]?.message || "An unexpected error occured! Please refer logs for more details");
        }
    };

    if(!trans)
        return <div><LoadingSpinner /></div>;

    return (
        <div className="page-wrapper">
            <main className="main-content">
                <HeadTemplate />
                <div className="login-container">
                    <div className="login-card">
                        <p className="powered-with">{trans.header.titlepart1}<span className="identity-bold">{trans.header.titlepart2}</span>{trans.header.titlepart3}</p>
                        <h3 className="signin-app">{trans.header.description} {loginIdManager.client.name}</h3>
                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="input-group">
                                <label htmlFor="email">{trans.form.fields.identifier.label}</label>
                                <input
                                    type="email"
                                    className={`email-input ${(blankerror || error) ? 'input-error' : ''}`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            {blankerror && (
                                <div className="error-box">
                                    <img src={ErrorIcon} className="error-icon"/>
                                    <p>{trans.form.fields.identifiererror.blankerrormsg}</p>
                                </div>
                            )}
                            {error && <p style={{color:'red'}}>{error}</p>}
                            <button type="submit" className="login-button">{trans.form.button}</button>
                            <div className="form-links">
                                <p>{trans.form.needhelpsignin}<a className="email-us" href="#">{trans.form.emailus}</a></p>
                                <p>{trans.form.donthaveanaccount}<a className="sign-up" href="#">{trans.form.signup}</a></p>
                            </div>
                        </form>
                    </div>
                </div>
                <FootTemplate privacypolicy={trans.footer.privacypolicy} />      
            </main>
            <StaticImgTemplate />
        </div>
    );
}

export default LoginIdScreen;