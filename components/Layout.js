import React from "react"


function Layout( {children} ){

    return (<div className="site-app">
                <header className="header">
                    <div className="top-header"><p>top header here</p></div>
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

export default Layout