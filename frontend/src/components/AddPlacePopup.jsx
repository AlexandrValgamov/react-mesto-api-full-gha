import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  };

  return (
    <PopupWithForm
      title='Новое место'
      name='add'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText='Создать'
    >
      <label className="popup__form-field">
        <input
          className="popup__input popup__input_edit_name"
          type="text"
          id="input-place"
          name="name"
          value={name}
          onChange={handleChangeName}
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required />
        <span className="popup__input-error input-place-error"></span>
      </label>
      <label className="popup__form-field">
        <input
          className="popup__input popup__input_edit_description"
          type="url"
          id="input-link"
          name="link"
          value={link}
          onChange={handleChangeLink}
          placeholder="Ссылка на картинку"
          required />
        <span className="popup__input-error input-link-error"></span>
      </label>
    </PopupWithForm>
  )
}