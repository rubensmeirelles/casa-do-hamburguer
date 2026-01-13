import { Link, useLocation } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect } from "react";
import { LogOut, ShoppingCart, Box, LayoutDashboard, Plus } from "lucide-react";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();

  const handleAuthUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/me", {
        credentials: "include",
      });

      if (response.status !== 200) {
        console.log("Usuário não autenticado");
        return;
      }

      const data = await response.json();
      console.log(data);
      setUser(data);
    } catch (error) {
      console.log("Erro: ", error);
      return;
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        credentials: "include",
        method: "POST",
      });

      if (!response.ok) {
        console.log("Erro ao deslogar");
        return;
      }
      setUser(null);
    } catch (error) {
      console.log("Erro: ", error);
      return;
    }
  };

  useEffect(() => {
    handleAuthUser();
  }, []);

  const getNavItemClass = (path: string) => {
    const baseClass =
      "flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-md border-1";

    if (location.pathname === path) {
      return `${baseClass} text-[#161410] bg-[#F2DAAC]`;
    } else {
      return baseClass;
    }
  };

  return (
    <div>
      <div className="bg-[#161410]">
        <div className="mx-auto flex w-full items-center justify-between p-3 md:w-[737px]">
          <Link to={"/"}>
            <img src="./logo.png" alt="" />
          </Link>
          {user ? (
            <div className="flex items-center gap-8 text-white">
              {user.admin && (
                <div className="flex items-center gap-2 text-[#F2DAAC] hidden md:flex">
                  <Link to={"/"}>
                    <div className={getNavItemClass("/")}>
                      <Box size={18} />
                    </div>
                  </Link>
                  <Link to={"/pedidos"}>
                    <div className={getNavItemClass("/pedidos")}>
                      <LayoutDashboard size={18} />
                    </div>
                  </Link>
                  <div className="flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-md border-1">
                    <Plus size={18} />
                  </div>
                </div>
              )}
              <div className="relative cursor-pointer">
                <ShoppingCart size={18} />
                <p className="absolute -top-6 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#F2DAAC] p-1 text-[#161410]">
                  1
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p>{user?.name}</p>
                <LogOut
                  size={18}
                  className="cursor-pointer"
                  onClick={() => handleLogout()}
                />
              </div>
            </div>
          ) : (
            <Link to="/login">
              <div className="flex h-[35px] w-[130px] cursor-pointer items-center justify-center rounded-sm bg-[#F2DAAC]">
                Entrar
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
