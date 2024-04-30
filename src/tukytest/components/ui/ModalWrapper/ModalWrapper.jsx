import Button from "../Button";
import "./ModalWrapper.css";
const ModalWrapper = ({ title, subtitle, icon, buttonTitle, onClick }) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        {icon}
        <h6 className="modal-title">{title}</h6>
        <p className="modal-subtitle">{subtitle}</p>
        <Button text={buttonTitle} onClick={onClick} />
      </div>
    </div>
  );
};

export default ModalWrapper;
