import React from 'react';
import { Link } from 'react-router-dom';

export default function Register({ onRegister, formValue, setFormValue }) {

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  return (
    <div className="auth">
      <h1 className='auth__title'>Регистрация</h1>
      <form className="auth__form" onSubmit={onRegister}>
        <fieldset className="auth__form-set">
          <label className="auth__form-field">
            <input
              className="auth__input auth__input_edit_name"
              type="email"
              id="input-email"
              name="email"
              placeholder="Email"
              value={formValue.email}
              onChange={handleChange}
              minLength="2"
              maxLength="40"
              required />
            <span className="auth__input-error auth-name-error"></span>
          </label>
          <label className="auth__form-field">
            <input
              className="auth__input auth__input_edit_description"
              type="password"
              id="input-password"
              name="password"
              placeholder="Пароль"
              value={formValue.password}
              onChange={handleChange}
              minLength="2"
              maxLength="200"
              required />
            <span className="auth__input-error input-description-error"></span>
          </label>
        </fieldset>
        <button className='auth__save-button'>Зарегистрироваться</button>
      </form>

      <div className='auth__signin'>
        <p className='auth__text'>Уже зарегистрированы?&nbsp;</p>
        <Link to="/sign-in" className='auth__link'>Войти</Link>
      </div>

    </div>
  )
}