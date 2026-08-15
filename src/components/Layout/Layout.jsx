import NavBar from "../NavBar/NavBar.jsx";

function Layout({ children }) {
    return (
        <>
            <NavBar />
            <main className="main-content">{children}</main>
        </>
    );
}

export default Layout;
