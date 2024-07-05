import { createContext, useContext } from "react";

const StringContext = createContext();

export const useStringContext = () => {
  return useContext(StringContext);
};

const StringProvider = ({ children }) => {
  const globalString = {
    fname__label: "First Name",
    fname__prop: "firstName",
    lname__label: "Last Name",
    lname__prop: "lastName",
    email__label: "Email",
    email__prop: "email",
    password__label: "Password",
    password__prop: "password",
    confirmpassword__label: "Confirm Password",
    confirmpassword__prop: "confirmPassword",
    submit__button: "Submit",
    error__password__pattern:
      "Password must be at least 8 characters long, contain an uppercase and lowercase letter, a number, and a special character.",
    error__password__mismatch: "Password must match.",
    error__invalid__email: "Please enter a valid email",
    error__empty__field: "Please fill out field.",
    app__title: "User Management App",
  };

  const signInString = {
    str__login: "Login",
    str__signIn: "Sign In",
    str__register__label: "No Account Yet? ",
    str__register__button: "Register Here",
    str__welcome: "Welcome",
    str__welcome__1: "This is a sasample application to demo user management",
    str__welcome__2: "Sign in to start the dom or sign up to create an account",
    str__author__label: "Created By: ",
    str__author: "Roy Stephen A. Hernandez",
    str__author__email: "rshernandez15@gmail.com",
    str__email__label: "Email: ",
  };

  const signUpString = {
    str__signUp: "Sign Up",
  };

  const navbarString = {
    str__tooltip: "Open Settings",
  };

  const value = { globalString, signInString, signUpString, navbarString };

  return <StringContext.Provider value={value}>{children}</StringContext.Provider>;
};

export default StringProvider;
