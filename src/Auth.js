import React from 'react';


export default function Auth({ loginUser, registerUser }) {
    return (
        <>
        <div className="register">
            <h2>Registrera dig</h2>
            <form onSubmit={registerUser}>
                <label>Mejl:</label><br />
                <input type="email" placeholder="exempel@exempel.com" /><br />
                <br />
                <br />
                <label>Lösenord:</label><br />
                <input type="password" /><br />
                <br />
                <br />
                <input type="submit" className="registerBtn" value="Registrera" />
            </form>
            <br />
            <br />
        </div>
        <div className="login">
            <h2>Logga in</h2>
            <form onSubmit={loginUser}>
                <label>Mejl:</label><br />
                <input type="email" placeholder="exempel@exempel.com"/><br />
                <br />
                <br />
                <label>Lösenord:</label><br />
                <input type="password" /><br />
                <br />
                <br />
                <input type="submit" className="loginBtn" value="Logga in" />
            </form>
            <br />
            <br />
        </div>
        </>
    );
}