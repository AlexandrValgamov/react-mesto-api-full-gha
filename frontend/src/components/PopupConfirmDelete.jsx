import PopupWithForm from "./PopupWithForm";

export default function PopupConfirmDelete() {
  return(
    <PopupWithForm
      title='Вы уверены?'
      name='delete'
      buttonText='Да'
    />
  )
}