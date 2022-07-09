
export default function LinkCustom({onClick,size, children }) {
    return (
      <div
      onClick={onClick}
        className={
          "flex justify-center items-center py-1 px-4 m-4 text-center text-lg rounded-lg cursor-pointer hover:bg-indigo-600 bg-indigo-500"
        }
      >
        {children}
      </div>
    );
  }