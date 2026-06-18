function Button({ value, onClick }) {
  return (
    <button
      className="calc-btn"
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
}

export default Button;