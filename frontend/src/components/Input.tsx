const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className="w-[350px] rounded-md bg-[#FFFFFF] bg-blue-100 px-2 py-[10px] text-sm text-[#32343E] placeholder-[#32343E] outline-none"
    />
  );
};

export default Input;
