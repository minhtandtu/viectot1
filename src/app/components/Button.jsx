import React from "react";

const Button = (props) => {
  const { text } = props;
  return (
    <button
      type="button"
      className="rounded-full w-full bg-cyan-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {text}
    </button>
  );
};

export default Button;
