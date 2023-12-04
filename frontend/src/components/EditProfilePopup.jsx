import React from "react";
import PropTypes from 'prop-types';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  
  React.useEffect(() => {
    setName(currentUser.name ?? '');
    setDescription(currentUser.about ?? '');
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  } 

  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='edit'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText='Сохранить'
    >
      <label className="popup__form-field">
        <input
          className="popup__input popup__input_edit_name"
          type="text"
          id="input-name"
          name="name"
          placeholder="Имя"
          value={name}
          onChange={e => setName(e.target.value)}
          minLength="2"
          maxLength="40"
          required />
        <span className="popup__input-error input-name-error"></span>
      </label>
      <label className="popup__form-field">
        <input
          className="popup__input popup__input_edit_description"
          type="text"
          id="input-description"
          name="info"
          placeholder="О себе"
          value={description}
          onChange={e => setDescription(e.target.value)}
          minLength="2"
          maxLength="200"
          required />
        <span className="popup__input-error input-description-error"></span>
      </label>
    </PopupWithForm>
  )
}

EditProfilePopup.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onUpdateUser: PropTypes.func,
};