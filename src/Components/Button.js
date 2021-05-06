const Button = ({ onAction, type = "primary", label }) => {
  return (
    <button className={`button ${type}`} onClick={onAction}>
      {label}
    </button>
  );
};

export default Button;
