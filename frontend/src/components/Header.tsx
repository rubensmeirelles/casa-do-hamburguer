import { Link } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { LogOut, ShoppingCart, Box, LayoutDashboard, Plus } from "lucide-react";

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <div className="bg-[#161410]">
        <div className="mx-auto flex w-full items-center justify-between p-3 md:w-[737px]">
          <img src="./logo.png" alt="" />

          {user ? (
            <div className="flex items-center gap-8 text-white">
              <div className="flex items-center gap-2 text-[#F2DAAC]">
                <div className="flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-md border-1">
                  <Box size={18} />
                </div>
                <div className="flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-md border-1">
                  <LayoutDashboard size={18} />
                </div>
                <div className="flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-md border-1">
                  <Plus size={18} />
                </div>
              </div>

              <div className="relative cursor-pointer">
                <ShoppingCart size={18} />
                <p className="absolute -top-6 -right-3 h-5 w-5 rounded-full bg-[#F2DAAC] p-1 flex justify-center items-center text-[#161410]">
                  1
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p>{user?.name}</p>
                <LogOut size={18} className="cursor-pointer" />
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
