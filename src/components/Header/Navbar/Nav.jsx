const d = new Date();
const yearDate = d.getFullYear();

export default function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="./">
                    Simple loan calculator
                </a>
                <div className="my-2 my-lg-0">
                    <span className="navbar-text">
                        &copy; Sargis Kirakosyan {yearDate}
                    </span>
                </div>
            </div>
        </nav>
    );
}
