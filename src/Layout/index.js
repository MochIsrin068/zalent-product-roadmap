import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <main className="layout">
      <Sidebar />
      <section>
        <Header />
        {children}
      </section>
    </main>
  );
};

export default Layout;
