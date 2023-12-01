import React, { useEffect } from "react";
import { Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
import ProtectedRouteElement from "./ProtectedRoute";
import * as auth from '../utils/auth';
import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import Footer from "./Footer";
import InfoTooltip from "./InfoTooltip";
import ImagePopup from "./ImagePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupConfirmDelete from "./PopupConfirmDelete";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [email, setEmail] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();
  let location = useLocation();

  const tokenCheck = (jwt) => {
    auth.getContent(jwt)
      .then((res) => {
        handleAuthorize(res.data.email)
      })
      .catch(() => {
        setLoggedIn(false);
      });
  };

  function handleLogin(e) {
    e.preventDefault();
    const { password, email } = formValue;
    auth.authorize(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
        }
      })
      .then(() => {
        handleAuthorize(email);
        resetForm();
        navigate('/', { replace: true });
      })
      .catch(() => {
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
        console.error;
      });
  };

  function handleRegister(e) {
    e.preventDefault();
    const { password, email } = formValue;
    auth.register(password, email)
      .then(() => {
        navigate('/sign-in');
        resetForm();
        setIsSuccess(true);
        setIsInfoTooltipOpen(true);
      })
      .catch(() => {
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
        console.error;
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) tokenCheck(token);
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch(console.error);
    }
  }, [loggedIn]);

  function handleSignOutClick() {
    if (loggedIn) {
      localStorage.removeItem('jwt');
      setLoggedIn(false);
    }
    resetForm();
  }

  function resetForm() {
    setFormValue({ email: '', password: '' });
  }

  function handleAuthorize(email) {
    setLoggedIn(true);
    setEmail(email);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(console.error);
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(console.error);
  };

  function handleUpdateUser({ name, about }) {
    api.updateUserInfo(name, about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(console.error);
  };

  function handleUpdateAvatar({ avatar }) {
    api.updateAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(console.error);
  };

  function handleAddPlaceSubmit({ name, link }) {
    api.postCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          location={location}
          email={email}
          onSignOut={handleSignOutClick}
        />
        <Routes >
          <Route
            path="/sign-in"
            element={loggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} formValue={formValue} setFormValue={setFormValue} />}
          />
          <Route
            path="/sign-up"
            element={loggedIn ? <Navigate to="/" /> : <Register onRegister={handleRegister} formValue={formValue} setFormValue={setFormValue} />}
          />
          <Route
            path="/"
            element={<ProtectedRouteElement
              element={Main}
              loggedIn={loggedIn}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              cards={cards}
              onCardDelete={handleCardDelete}
            />}
          />
          <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />} />
        </Routes>
        <Footer />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupConfirmDelete />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
