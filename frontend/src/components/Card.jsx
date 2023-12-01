import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  };

  function handleLikeClick() {
    onCardLike(card);
  };

  function handleDeleteClick() {
    onCardDelete(card);
  };

  return (
    <article className="cards__card">
      {isOwn && <button className='cards__trash-button' onClick={handleDeleteClick} aria-label="Удалить" type="button" />}
      <div className="cards__image" onClick={handleClick} style={{ backgroundImage: `url(${card.link})` }} />
      <div className="cards__widget">
        <h2 className="cards__title">{card.name}</h2>
        <div className="cards__like-group">
          <button className={`cards__like-button ${isLiked ? 'cards__like-button_active' : ''}`} onClick={handleLikeClick} aria-label="Лайк" type="button" />
          <p className="cards__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}