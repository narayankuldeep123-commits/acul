import React, { useState, useEffect } from "react";
import LoginId from '@auth0/auth0-acul-js/login-id';
import HeadTemplate from "@/shared/HeadTemplate";
import FootTemplate from "@/shared/FootTemplate";
import StaticImgTemplate from "@/shared/StaticImgTemplate";

const LoginIdScreen: React.FC = () => {

    const [loginIdManager] = useState(() => new LoginId());
    const [identifier, setIdentifier] = useState('');
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
            await loginIdManager.login({ username: identifier });
        }
        catch (err) {
            const errors = loginIdManager.getErrors();
            setError(errors?.[0]?.message || "An unexpected error occured! Please refer logs for more details");
        }
    };

    if(!trans)
        return <div>Loading...</div>;

    return (
        <>
        <StaticImgTemplate />
        <HeadTemplate />
        <div className="loginFormDiv">
            <h2 className="signinHeading">{trans.header.description}</h2>
            <form onSubmit={handleSubmit}>
                <div className="formDiv">
                    <label className="identifierLabel" htmlFor="identifier">{trans.form.fields.identifier.label}</label>
                    <input 
                        className="identifierInput"
                        id="identifier" 
                        type="text" 
                        value={identifier} 
                        onChange={(e) => setIdentifier(e.target.value)} 
                        placeholder={trans.form.fields.identifier.placeholder} 
                        required 
                    />
                </div>

                {error && <p style={{color:'red'}}>{error}</p>}

                <button className="btnSubmit" type="submit">
                    {trans.form.button}
                </button>
            </form>
            
            {loginIdManager.transaction?.alternateConnections?.map((conn) =>
            (
                <button key={conn.name} onClick={() => loginIdManager.federatedLogin({ connection: conn.name})}
                style={{marginTop: '10px', display: 'block', width: '100%'}}
                >
                    {trans.social.continueWith} {conn.name}
                </button>
            )
            )}
        </div>
        <FootTemplate />
        </>
    );
;}

export default LoginIdScreen;