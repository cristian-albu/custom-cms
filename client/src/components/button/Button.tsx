import { T_Button } from ".";

const Button = ({ children, btnOutline, ...htmlAttributes }: T_Button) => {
    return (
        <button
            className={`${
                btnOutline
                    ? "hover:bg-black hover:text-white"
                    : "bg-black text-white"
            } border-2 border-black px-2 py-1 rounded-md transition-all hover:scale-[1.02] active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-[1]`}
            {...htmlAttributes}
        >
            {children}
        </button>
    );
};

export default Button;
