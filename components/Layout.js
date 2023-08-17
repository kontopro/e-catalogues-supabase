import Header from "@/components/Header"
import Footer from "@/components/Footer"

function Layout( {children} ){

<<<<<<< HEAD
    return (
            <div className="site-app">
                <Header />
=======
    return (<div className="site-app">
                <header className="header">
                    <div className="top-header"><p>top header here</p></div>
                    <p>header here</p>
                </header>
>>>>>>> 6309eff11281c15fc3723517ce630bdb147a1b53
                <div className="container">
                    {children}
                </div>
                <Footer />
            </div>
        )
}

export default Layout