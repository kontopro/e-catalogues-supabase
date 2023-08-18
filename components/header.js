import Link from "next/link"

export default function Header(){
    return(
            <header className="header">
                    <div className="top-header">
                        <div className="top-header-left"><p>ΚΕΥ</p></div>
                        <div className="top-header-center"><p>e-Catalogues</p></div>
                        <div className="top-header-right"><p>2023</p></div>
                    </div>
                    <div className="nav-header">
                        <nav className="main-nav">
                            <ul>
                                <li><Link href="/home">Αρχική</Link></li>
                                <li><Link href="/oximata">Οχήματα</Link></li>
                                <li><Link href="/armata">Άρματα</Link></li>
                                <li><Link href="/oplismos">Οπλισμός</Link></li>
                                <li><Link href="/pirovola">Πυροβόλα</Link></li>
                                <li><Link href="/sa">Σ/Α</Link></li>
                                <li><Link href="/dioptres">Διόπτρες</Link></li>
                                <li><Link href="/genika">Γενικά Υλικά</Link></li>
                                <li><Link href="/search">Αναζήτηση</Link></li>
                            </ul>
                        </nav>
                    </div>
            </header>
    )
}