import { ShoppingCart } from "lucide-react";

const Product = () => {
    return <div className="">
        <div className="flex gap-2 mt-3">
            <img src="./duplo-da-casa.png" alt="duplo-da-casa" className="h-[83px] w-[100px] md:w-[200px] md:h-[166px]" />
            <div className="flex flex-1 flex-col gap-2">
                <p className="text-sm md:text-lg uppercase font-bold">Duplo da casa</p>
                <p className="text-xs md:text-md text-[#848484] flex-1">Dois suculentos hambúrgueres de 120g, queijo cheddar derretido, maionese da casa e picles no pão brioche tostado.</p>
                <div className="flex gap-2 items-center justify-end">
                    <p className="text-sm md:text-md text-[#F2DAAC]">R$28,90</p>
                    <ShoppingCart size={18} className="cursor-pointer" />
                </div>
            </div>
            
        </div>
    </div>
}

export default Product;