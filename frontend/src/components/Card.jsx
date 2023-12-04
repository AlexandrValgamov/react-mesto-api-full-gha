import React from "react";
import PropTypes from 'prop-types';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(i => i === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

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

Card.propTypes = {
  card: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    link: PropTypes.string,
    owner: PropTypes.string,
    likes: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
      })
    ),
  }).isRequired,
  onCardClick: PropTypes.func,
  onCardLike: PropTypes.func,
  onCardDelete: PropTypes.func,
};