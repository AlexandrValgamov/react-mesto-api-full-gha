import PropTypes from 'prop-types';

export default function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <section className={`popup ${isOpen ? ' popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          onClick={onClose}
          aria-label="Закрыть"
          type="button"
        />
        <img
          className="popup__image_type_icon"
          src={isSuccess ? "../src/images/success-icon.svg" : "../src/images/error-icon.svg"}
        />
        <h2 className="popup__message">
          {isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </section>
  )
}

InfoTooltip.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  isSuccess: PropTypes.bool,
};
