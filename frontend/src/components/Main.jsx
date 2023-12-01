import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from './Card.jsx';

export default function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">

      <section className="profile">
        <div className="profile__avatar-group">
          <img className="profile__avatar" src={currentUser.avatar} alt={currentUser.name} />
          <button className="profile__avatar-button" onClick={props.onEditAvatar}></button>
        </div>
        <h1 className="profile__title">{currentUser.name}</h1>
        <button className="profile__edit-button" onClick={props.onEditProfile} aria-label="Редактировать профиль" type="button"></button>
        <p className="profile__subtitle">{currentUser.about}</p>
        <button className="profile__add-button" onClick={props.onAddPlace} aria-label="Добавить карточку" type="button"></button>
      </section>

      <section className="cards" aria-label="Галерея">
        {props.cards.map(
          card => <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        )}
      </section>

    </main>
  )
}