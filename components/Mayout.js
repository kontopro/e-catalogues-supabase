import React from "react"


function Mayout( {children} ){

    return (<div className="site-app">
                <header className="header">
                    <div className="top-header"></div>
                    <p>header here</p>
                </header>
                <div className="container">
                    {children}
                </div>
                <footer className="footer">
                    <p>2023</p>
                </footer>
            </div>)
}

export default Mayout