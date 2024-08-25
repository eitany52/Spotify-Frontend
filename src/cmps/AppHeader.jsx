import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { login, logout, signup } from "../store/actions/user.actions";
import { utilService } from "../services/util.service.js";

import { LoginSignup } from "./LoginSignup.jsx";
import { SvgIcon } from "../cmps/SvgIcon";
import { AppSearch } from "../cmps/AppSearch";

export function AppHeader({ backgroundColor = null }) {
  const user = useSelector((storeState) => storeState.userModule.user);
  const [isSearchDisplayed, setIsSearchDisplayed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  //   console.log("user", user);

  useEffect(() => {
    getLocation();
  }, [location]);

  function getLocation() {
    if (location.pathname.includes("search")) {
      setIsSearchDisplayed(true);
    } else {
      setIsSearchDisplayed(false);
    }
    // if (location.pathname === "/") {
    //   setIsHomePageDisplayed(true);
    // } else {
    //   setIsHomePageDisplayed(false);
    // }
  }

  async function onLogin(credentials) {
    try {
      const user = await login(credentials);
      showSuccessMsg(`Welcome: ${user.fullname}`);
      navigate("/");
    } catch (err) {
      showErrorMsg("Cannot login");
    }
  }
  async function onSignup(credentials) {
    try {
      const user = await signup(credentials);
      showSuccessMsg(`Welcome new user: ${user.fullname}`);
      navigate("/");
    } catch (err) {
      showErrorMsg("Cannot signup");
    }
  }
  async function onLogout() {
    try {
      await logout();
      navigate("/");
      showSuccessMsg(`Bye now`);
    } catch (err) {
      showErrorMsg("Cannot logout");
    }
  }

  const userLatter =  user ? utilService.getFirstChar(user.name) : null
  console.log("-----------------------------");
  console.log(backgroundColor);
  const darkenedBackground_50 = utilService.darkenColor(
    "rgba(173,152,151,1)",
    50
  );

  //const darkenedBackground_50 = "rgba(255,5,5,1)";
  // const darkenedBackground_50 =
  //   backgroundColor === null
  //     ? "rgba(255,255,255,1)"
  //     : utilService.darkenColor(backgroundColor, 50);

  return (
    <header className="app-header" style={{ backgroundColor: backgroundColor }}>
      {
        <>
          <section>
            <button className="icon-type-1 big">
              <SvgIcon iconName={"back"} />
            </button>
            <button className="icon-type-1 big">
              <SvgIcon iconName={"forward"} />
            </button>
          </section>
          <section className="user-info">
            {/* <span>{backgroundColor} </span>
            <span>{darkenedBackground_50} </span> */}

            <span style={{ backgroundColor: darkenedBackground_50 }}>
              <small
                style={{
                  backgroundColor: backgroundColor,
                }}
              >
                {userLatter}
              </small>
            </span>
          </section>
          {isSearchDisplayed && <AppSearch />}
        </>

        /* <nav>
                <NavLink to="">Home 🏠</NavLink>
                <NavLink to="about">About</NavLink>
                <NavLink to="car">Cars</NavLink>
                <NavLink to="chat">Chat</NavLink>
                <NavLink to="review">Review</NavLink>
                <NavLink to="board">Boards</NavLink>

                {user &&
                    <span className="user-info">
                        <Link to={`user/${user._id}`}>
                            {user.imgUrl && <img src={user.imgUrl} />}
                            {user.fullname}
                        </Link>
                        <span className="score">{user.score?.toLocaleString()}</span>
                        <button onClick={onLogout}>Logout</button>
                    </span>
                }
                {!user &&
                    <section className="user-info">
                        <LoginSignup onLogin={onLogin} onSignup={onSignup} />
                    </section>
                }
            </nav>
            <h1>My App</h1> */
      }
    </header>
  );
}
