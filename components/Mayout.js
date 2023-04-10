import React from "react"


function Mayout( {children} ){

    return (<div className="site-app">
                <header className="header">
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