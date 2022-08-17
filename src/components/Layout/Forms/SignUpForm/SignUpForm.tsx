import router from "next/router";
import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { TopToastMessage } from "src/components/Messages/Toasts";
import { PATH } from "src/utils/consts";
import { messageSignUp } from "src/utils/text";
import Swal from "sweetalert2";
import styles from "./SignUpForm.module.css";

import { Input, useInput } from "@nextui-org/react";

//

export default function SignUpForm() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failedAllFields, setFailedAllFields] = useState(false);
  const [message, setMessage] = useState(messageSignUp.base);

  const { value, reset, bindings } = useInput("");

  const validateEmail = (value: string) => {
    return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  };

  const helper = React.useMemo(() => {
    if (!value)
      return {
        text: "",
        color: "",
      };
    const isValid = validateEmail(value);
    return {
      text: isValid ? "Correct email" : "Enter a valid email",
      color: isValid ? "success" : "error",
    };
  }, [value]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // reset error and message
    setFailedAllFields(false);
    setMessage("");

    // fields check
    if (!userName || !email || !password) {
      setFailedAllFields(true);
      return Swal.fire("Ouups!", messageSignUp.allFieldsAreRequired, "error");
    }
    // user structure
    const user = {
      userName,
      email,
      password,
    };
    // save the post
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(user),
    });

    // get the data
    const data = await response.json();

    if (data.success) {
      setUserName("");
      setEmail("");
      setPassword("");
      TopToastMessage.fire({
        icon: "success",
        title: "Account Created! Now sign in with it",
      });
      router.push(PATH.SIGN_IN);
    } else {
      // set the error
      return '404';
    }
  };
  return (
    <>
      {message && <p className={styles.message}>{message}</p>}
      <form className={styles.formulario} onSubmit={handleSubmit}>
        <div className={styles.inputBig}>
          <div className={styles.inputIcon}>
            <AiOutlineUser size={18} />
          </div>
          <Input
            {...bindings}
            clearable
            shadow={false}
            onClearClick={reset}
            autoComplete="current-username"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            helperText={helper.text}
            type="text"
            labelPlaceholder="Username"
            className={
              failedAllFields && userName.length === 0
                ? styles.inputError
                : styles.input
            }
          />
        </div>
        <div className={styles.inputBig}>
          <div className={styles.inputIcon}>
            <HiOutlineMail size={18} />
          </div>
          <Input
            {...bindings}
            clearable
            shadow={false}
            onClearClick={reset}
            autoComplete="current-email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            helperText={helper.text}
            type="email"
            labelPlaceholder="Email"
            className={
              failedAllFields && email.length === 0
                ? styles.inputError
                : styles.input
            }
          />
        </div>
        <div className={styles.inputBig}>
          <div className={styles.inputIcon}>
            <RiLockPasswordLine size={18} />
          </div>
          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className={
              failedAllFields && password.length === 0
                ? styles.inputError
                : styles.input
            }
          />
        </div>

        <input
          onClick={handleSubmit}
          type={"submit"}
          value="Create account"
          className={styles.CreateAccountButton}
        />
      </form>
    </>
  );
}
