import React, { useRef } from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import IdleTimer from "react-idle-timer";
import { useHistory } from "react-router-dom";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  const idleTimerRef = useRef(null);
  const sessionTimeoutRef = useRef(null);
  const history = useHistory();

  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
      // history.push('/login')
    }
  };

  const onIdle = () => {
    var confirm = window.confirm(
      "You've been idle for a while! You will be logged out soon.\nDo you want to stay signed in ?"
    );

    if (confirm) {
      stayActive();
    } else {
      logOut();
    }
  };

  const logOut = () => {
    clearTimeout(sessionTimeoutRef.current);
    auth.signOut();
    history.push("/login");
  };

  const stayActive = () => {
    clearTimeout(sessionTimeoutRef.current);
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <Link to={!user && "/login"}>
          <div onClick={handleAuthenticaton} className="header__option">
            <span className="header__optionLineOne">
              Hello {!user ? "Guest" : user.email}
            </span>
            <span className="header__optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        <Link to="/orders">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>

        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
      <div>
        {user && (
          <IdleTimer ref={idleTimerRef} timeout={1000 * 20} onIdle={onIdle} />
        )}
      </div>
    </div>
  );
}

export default Header;
