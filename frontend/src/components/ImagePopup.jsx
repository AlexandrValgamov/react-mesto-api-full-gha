export default function ImagePopup({ card, onClose }) {
  return(
    <section className={`popup popup_type_zoom${Object.keys(card).length ? ' popup_opened' : ''}`} aria-label="Фото">
      <div className="popup__photo-container">
        <button className="popup__close-button" onClick={onClose} aria-label="Закрыть" type="button"></button>
        <figure className="popup__photo-block">
          <img className="popup__image" src={card.link}  alt={card.name} />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
      </div>
    </section>
  )
}