import React, {
  useEffect,
  useState,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const ctx = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const email_reducer = (state, action) => {
    if (action.type === "USER_INPUT_EMAIL") {
      return {
        value: action.val,
        isValid: state.value.includes("@"),
      };
    }
    if (action.type === "INPUT_BLUR_EMAIL") {
      return {
        value: state.value,
        isValid: state.value.includes("@"),
      };
    }

    return {
      value: "",
      isValid: false,
    };
  };

  const password_reducer = (state, action) => {
    if (action.type === "USER_INPUT_PW") {
      return {
        value: action.val,
        isValid: action.val.length > 6,
      };
    }
    if (action.type === "INPUT_BLUR_PW") {
      return {
        value: state.value,
        isValid: state.value.length > 6,
      };
    }
    return {
      value: "",
      isValid: false,
    };
  };

  const [emailState, dispatchEmail] = useReducer(email_reducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(password_reducer, {
    value: "",
    isValid: null,
  });

  const validateEmailHandler = () => {
    //setEmailIsValid(emailState.value.includes("@"));
    dispatchEmail({
      type: "INPUT_BLUR_EMAIL",
    });
  };

  const validatePasswordHandler = () => {
    //setPasswordIsValid(passwordState.value.trim().length > 6);
    dispatchPassword({
      type: "INPUT_BLUR_PW",
    });
  };
  const emailChangeHandler = (event) => {
    //setEnteredEmail(event.target.value);
    dispatchEmail({
      type: "USER_INPUT_EMAIL",
      val: event.target.value,
    });
    setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    //setpasswordState.value(event.target.value);
    dispatchPassword({
      type: "USER_INPUT_PW",
      val: event.target.value,
    });
    setFormIsValid(event.target.value.trim().length > 6 && emailState.isValid);
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        emailState.value.includes("@") && passwordState.value.length > 6
      );
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [emailState.value, passwordState.value]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      ctx.onLogin(emailState.value, passwordState.value);
    } else if (!emailState.isValid) {
      //
      emailInputRef.current.focus();
    } else {
      //
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          value={emailState.value}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          value={passwordState.value}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
