import { SignedInOrRedirect, SignedOut, SignedOutOrRedirect, Provider } from "@gadgetinc/react";
import { useUser, useSignOut } from "@gadgetinc/react";
import { Suspense, useEffect } from "react";
import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useNavigate, Link } from "react-router";
import { api } from "../api";
import Index from "../routes/index";
import SignedInPage from "../routes/signed-in";
import SignInPage from "../routes/sign-in";
import SignUpPage from "../routes/sign-up";
import ResetPasswordPage from "../routes/reset-password";
import VerifyEmailPage from "../routes/verify-email";
import ChangePassword from "../routes/change-password";
import ForgotPassword from "../routes/forgot-password";
import PaletteGenPage from "../routes/palette-generator";
import "./App.css";
import logo from "../media/chameleon-logo.svg";
import MyPalettesPage from "../routes/my-palettes";

const App = () => {
  useEffect(() => {
    document.title = `${process.env.GADGET_APP}`;
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <SignedOutOrRedirect>
              <Index />
            </SignedOutOrRedirect>
          }
        />
        <Route
          path="signed-in"
          element={
            <SignedInOrRedirect>
              <SignedInPage />
            </SignedInOrRedirect>
          }
        />
        <Route
          path="palette-generator"
          element={
            <SignedInOrRedirect>
              <PaletteGenPage />
            </SignedInOrRedirect>
          }
        />
        <Route
          path="change-password"
          element={
            <SignedInOrRedirect>
              <ChangePassword />
            </SignedInOrRedirect>
          }
        />
        <Route
          path="forgot-password"
          element={
            <SignedOutOrRedirect>
              <ForgotPassword />
            </SignedOutOrRedirect>
          }
        />
        <Route
          path="sign-in"
          element={
            <SignedOutOrRedirect>
              <SignInPage />
            </SignedOutOrRedirect>
          }
        />
        <Route
          path="sign-up"
          element={
            <SignedOutOrRedirect>
              <SignUpPage />
            </SignedOutOrRedirect>
          }
        />
        <Route
          path="reset-password"
          element={
            <ResetPasswordPage />
          }
        />
        <Route
          path="verify-email"
          element={
            <VerifyEmailPage />
          }
        />
        <Route
          path="my-palettes"
          element={
            <SignedInOrRedirect>
              <MyPalettesPage />
            </SignedInOrRedirect>
          }
        />

      </Route>
    )
  );

  return (
    <Suspense fallback={<></>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

const Layout = () => {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <Provider api={api} navigate={navigate} auth={window.gadgetConfig.authentication}>
        <Header />

        <div className="divider"></div>

        {/* <div className="main-container"> */}
        {/* <div className="hero-section"> */}
        {/* <div className="main"> */}
        <Outlet />
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
      </Provider>

    </div>
  );
};

const Header = () => {

  const navigate = useNavigate();
  const signOut = useSignOut();
  
  const handleLogoClick = () => {
    navigate("/signed-in");
  };

  const handleSignOut = () =>{
    signOut();
    navigate("/sign-in");
  };

  const handleMyPalettesClick = () => {
    navigate("/my-palettes");
  };
  
  return (
    // <div className="header">
    //   <a href="/" target="_self" rel="noreferrer" style={{ textDecoration: "none" }}>
    //     <div className="logo">{process.env.GADGET_APP}</div>
    //   </a>
    //   <div className="header-content">
    //    
    //   </div>
    // </div>

    <div className="header-wrapper">
      <img className="logo" src={logo} alt="Chameleon Logo" onClick = {handleLogoClick} style = {{cursor : "pointer" }}/>
      
      <div className="nav-container">
         <SignedOut>
          <Link to="/sign-in" style={{ color: "white" }}>Sign in</Link>
           <Link to="/sign-up" style={{ color: "white" }}>Sign up</Link>
         </SignedOut>
        <button
          className="my-palettes-btn"
          style={{
            background: 'none',  
            border: 'none',     
            color: '#EFEFEE',     
            cursor: 'pointer',   
          }}
          onClick={handleMyPalettesClick}
        >
          My Palettes
        </button>

        <button className="account-btn" aria-label="Account" onClick={handleSignOut} style = {{cursor : "pointer" }}>Sign Out</button>
      </div>
    </div>

  );
};

export default App;
