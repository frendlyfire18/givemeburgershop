import { useState } from "react";

export default function Input({ set, leftItem, Change, title, type }) {
  const [value, setValue] = useState("");

  const handlInput = (e) => {
    if (set) {
      set(e.target.value);
    }
    setValue(e.target.value);
  };
  return (
    <div>
      <label>{title}</label>
      <br />
      <div className="flex items-center">
        {leftItem && <div className="px-6 bg-indigo-600 rounded-l-lg">{leftItem}</div>}
        <input
          onChange={handlInput}
          className={`px-2 color-white my-3 bg-gray-600 ${
            type === "address" ? "w-80" : type==="phone"?"w-80":"w-96"
          } ${type === "address" && "py-1"}`}
          type={type}
          value={value}
        />
        {type === "address" && (
          <button
            onClick={Change(value)}
            className="bg-indigo-600 hover:bg-indigo-800 px-2 py-1 rounded-r-lg"
          >
            Поиск
          </button>
        )}
      </div>
    </div>
  );
}
