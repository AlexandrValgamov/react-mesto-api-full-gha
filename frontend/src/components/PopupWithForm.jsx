export default function PopupWithForm({ title, name, buttonText, isOpen, onClose, onSubmit, children }) {
  return(
    <section className={`popup popup_type_${name}${isOpen ? ' popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close-button" onClick={onClose} aria-label="Закрыть" type="button" />
          <h2 className="popup__title">{title}</h2>
          <form className="popup__form" name={name} onSubmit={onSubmit}>
            <fieldset className="popup__form-set">
              {children}
            </fieldset>
            <button className="popup__save-button" aria-label="Сохранить" type="submit">{buttonText}</button>
          </form>
      </div>
    </section>
  )
}