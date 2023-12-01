import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const inputRef = React.useRef(); 

  useEffect(() => {
    inputRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  };

  return (
    <PopupWithForm
      title='Обновить аватар'
      name='edit-avatar'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText='Сохранить'
    >
      <label className="popup__form-field">
        <input
          ref={inputRef}
          className="popup__input popup__input_edit_description"
          type="url"
          id="input-avatar"
          name="avatar"
          placeholder="Ссылка на аватар"
          required />
        <span className="popup__input-error input-avatar-error"></span>
      </label>
    </PopupWithForm>
  )
}