import React from 'react';
import PropTypes from 'prop-types';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from './Card.jsx';

export default function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">

      <section className="profile">
        <div className="profile__avatar-group">
          <img className="profile__avatar" src={currentUser.avatar} alt={currentUser.name} />
          <button className="profile__avatar-button" onClick={onEditAvatar}></button>
        </div>
        <h1 className="profile__title">{currentUser.name}</h1>
        <button className="profile__edit-button" onClick={onEditProfile} aria-label="Редактировать профиль" type="button"></button>
        <p className="profile__subtitle">{currentUser.about}</p>
        <button className="profile__add-button" onClick={onAddPlace} aria-label="Добавить карточку" type="button"></button>
      </section>

      <section className="cards" aria-label="Галерея">
        {cards.map(
          card => <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        )}
      </section>

    </main>
  )
}

Main.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string,
    about: PropTypes.string,
  }),
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
    })
  ),
  onEditAvatar: PropTypes.func,
  onEditProfile: PropTypes.func,
  onAddPlace: PropTypes.func,
  onCardClick: PropTypes.func,
  onCardLike: PropTypes.func,
  onCardDelete: PropTypes.func,
};

