import "./StylesUi.css";

const Button = ({ text, onClick, icon, iconPosition, disabled }) => {
  return (
    <button className="ButtonStyle" onClick={onClick} disabled={disabled}>
      {icon && iconPosition === "left" && (
        <>
          <div className="IconLeft">{icon}</div>
        </>
      )}
      {text}
      {icon && iconPosition === "right" && (
        <>
          <div className="IconRight">{icon}</div>
        </>
      )}
    </button>
  );
};

export default Button;
