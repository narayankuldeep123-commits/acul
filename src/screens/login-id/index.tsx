import React, { useState, useEffect } from "react";
import LoginId from '@auth0/auth0-acul-js/login-id';
//import HeadTemplate from "@/shared/HeadTemplate";
import StaticImgTemplate from "@/shared/StaticImgTemplate";
import LoadingSpinner from "@/shared/LoadingSpinner";
import FootTemplate from "@/shared/FootTemplate";

const LoginIdScreen: React.FC = () => {

    const [loginIdManager] = useState(() => new LoginId());
    const [email, setEmail] = useState<string>('');
    const [error, setError ] = useState<string | null>(null);
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
                <div className="login-container">
                    <div className="login-card">
                        <h1 className="fluid-title">Welcome Back</h1>
                        <p className="fluid-subtitle">Enter your email to access your account</p>
                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="input-group">
                                <label htmlFor="email">Username or Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Username or email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <p style={{color:'red'}}>{error}</p>}
                            <button type="submit" className="login-button">Next</button>
                        </form>
                    </div>
                </div>
                <FootTemplate />      
            </main>
            <StaticImgTemplate />
        </div>
    );
}

export default LoginIdScreen;