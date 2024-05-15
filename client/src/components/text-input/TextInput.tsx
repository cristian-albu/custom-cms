import { T_TextInput } from ".";

const TextInput = ({
    label,
    type,
    className,
    ...htmlAttributes
}: T_TextInput) => {
    return (
        <div className="w-full">
            <label className="w-full">
                <div>{label}</div>
                <input
                    type={type || "text"}
                    className={`w-full border-2 border-black p-1 rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
                    {...htmlAttributes}
                />
            </label>
        </div>
    );
};

export default TextInput;
