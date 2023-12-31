import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

export default function Header({ loggedIn, location, email, onSignOut }) {

  const [linkTo, setLinkTo] = useState("");
  const [linkText, setLinkText] = useState("");

  React.useEffect(() => {
    if (location.pathname === "/sign-in") {
      setLinkTo("/sign-up");
      setLinkText("Регистрация");
    } else if (location.pathname === "/sign-up") {
      setLinkTo("/sign-in");
      setLinkText("Вход");
    } else if (loggedIn) {
      setLinkTo("/sign-in");
      setLinkText("Выход");
    }
  }, [location, loggedIn]);

  return (
    <header className="header">
      <div className="header__logo" />
      <div className="header__nav">
        {loggedIn && <p className="header__user-name">{email}</p>}
        <Link to={linkTo} onClick={onSignOut} className="header__link">{linkText}</Link>
      </div>
    </header>
  )
}

Header.propTypes = {
  loggedIn: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  email: PropTypes.string,
  onSignOut: PropTypes.func,
};
