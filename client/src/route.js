import React, { lazy, useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { AuthContext } from "./context/authC/AuthContext";

const delayLoad = (importComponent, fallbackComponent) => {
  const LazyComponent = lazy(() => {
    return importComponent;
  });

  return () => (
    <React.Suspense fallback={fallbackComponent ? fallbackComponent : null}>
      <LazyComponent />
    </React.Suspense>
  );
};

function componentLoader(importComponent, attemptsLeft = 3, interval = 1500) {
  return new Promise((resolve, reject) => {
    importComponent.then(resolve).catch((error) => {
      setTimeout(() => {
        if (attemptsLeft === 1) {
          alert("일시적인 오류입니다. 메인페이지로 이동합니다.");
          window.location.href = "/";
        }
        componentLoader(importComponent, attemptsLeft - 1);
      }, interval);
    });
  });
}

const progressBar = <div>로딩중...</div>;

// component
const Home = delayLoad(
  componentLoader(import("./pages/home/Home")),
  progressBar
);
const Login = delayLoad(
  componentLoader(import("./pages/login/Login")),
  progressBar
);
const Profile = delayLoad(
  componentLoader(import("./pages/profile/Profile")),
  progressBar
);
const Register = delayLoad(
  componentLoader(import("./pages/register/Register"), progressBar)
);
const Messenger = delayLoad(
  componentLoader(import("./pages/messenger/Messenger"), progressBar)
);
const Error = delayLoad(componentLoader(import("./pages/errorPage/ErrorPage")));

export default function RouterSwitch(props) {
  const { user } = useContext(AuthContext);
  const location = props.location;

  const RedirectMain = () => <Redirect to={"/"} />;

  return (
    <>
      <Switch location={location}>
        <Route exact path="/" component={user ? Home : Register} />
        <Route exact path="/login" component={user ? RedirectMain : Login} />
        <Route
          exact
          path="/register"
          component={user ? RedirectMain : Register}
        />
        <Route exact path="/profile/:username" component={Profile} />
        <Route exact path="/messenger" component={user ? Messenger : Login} />
        <Route exact path="*" component={Error} />
      </Switch>
    </>
  );
}
