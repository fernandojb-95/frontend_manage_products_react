import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header className="bg-slate-800 text-white">
        <div className=" mx-auto max-w-6xl py-10">
          <h1 className="font-extrabold text-4xl">
            Administrador de productos
          </h1>
        </div>
      </header>
      <main className="mt-10 mx-auto max-w-6xl p-10 bg-white shadow-lg">
        <Outlet />
      </main>
      <footer>

      </footer>
    </>
  );
};

export default Layout;
