import { useState } from "react";
import Product from "../components/Product";

const Home = () => {
  const [category, setCategory] = useState("Hamburguer");

  const handleChangeCategory = (newCategory: string) => {
    setCategory(newCategory);
  };

  const getcategoryClass = (categoryName: string) => {
    const elementoSelecionado =
      "md:text-md flex h-7 w-24 cursor-pointer items-center justify-center rounded-md border-1 border-[#F2DAAC] bg-[#F2DAAC] text-sm font-bold text-[#161410] md:h-9 md:w-32";
    const elementoNaoSelecionado =
      "md:text-md flex h-7 w-24 cursor-pointer items-center justify-center rounded-md border-1 border-[#F2DAAC] text-sm font-bold text-[#F2DAAC] hover:bg-[#F2DAAC] hover:text-[#161410] md:h-9 md:w-32";

    if (category === categoryName) {
      return elementoSelecionado;
    } else {
      return elementoNaoSelecionado;
    }
  };

  console.log(category);

  return (
    <div className="md:px=0 mx-auto w-full px-3 text-white md:w-[737px]">
      <div className="my-1 flex gap-2 md:my-3">
        <div
          className={getcategoryClass("Hamburguer")}
          onClick={() => handleChangeCategory("Hamburguer")}
        >
          Hamburguer
        </div>
        <div
          className={getcategoryClass("Bebidas")}
          onClick={() => handleChangeCategory("Bebidas")}
        >
          Bebidas
        </div>
        <div
          className={getcategoryClass("Porções")}
          onClick={() => handleChangeCategory("Porções")}
        >
          Porções
        </div>
      </div>
      <p className="my-2 font-bold text-[#F2DAAC] uppercase">{category}</p>
      <div className="flex flex-col gap-1 md:gap-3">
        <Product />
        <Product />
        <Product />
      </div>
    </div>
  );
};

export default Home;
