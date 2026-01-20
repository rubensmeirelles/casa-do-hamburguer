import { useState } from "react";
import CardPedido from "../components/CardPedido";

const Pedidos = () => {
  const [category, setCategory] = useState("Pendente");
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
  return (
    <div className="text-white">
      <div className="md:px=0 mx-auto w-full px-3 text-white md:w-[737px]">
        <div className="my-1 flex gap-2 md:my-3">
          <div
            className={getcategoryClass("Pendente")}
            onClick={() => handleChangeCategory("Pendente")}
          >
            Pendente
          </div>
          <div
            className={getcategoryClass("Retirado")}
            onClick={() => handleChangeCategory("Retirado")}
          >
            Retirado
          </div>
          <div
            className={getcategoryClass("Cancelado")}
            onClick={() => handleChangeCategory("Cancelado")}
          >
            Cancelado
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
            <CardPedido id={"2"} name="Rubens Meirelles" date="13/01/2026" orderTime="15:23" deliveredTime="14:20" total={152.25}/>
          

        </div>
      </div>
    </div>
  );
};

export default Pedidos;
