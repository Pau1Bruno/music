import React, { useState } from "react";
import styles from "../../styles/login/Login.module.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/router";
import MainLayout from "../../layouts/MainLayout";

const Login = () => {
    const [ visible, setVisible ] = useState<boolean>(false);
    const [ user, setUser ] = useState({ username: "", password: "" });
    const router = useRouter();
    
    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    console.log({ "username": user.username, "password": user.password });
    
    const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        const response = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        
        if (response.ok) {
            const { access_token } = await response.json();
            localStorage.setItem("jwt", access_token);
            router.push("/");
        } else {
            console.error("Invalid username or password");
        }
    };
    
    return (
        <MainLayout title={"Login"}>
            <div className={styles.login}>
                <form className={styles.form_container}>
                    <div className={styles.username}>
                        <input
                            className={styles.username_input}
                            name="username"
                            type="text"
                            placeholder="username"
                            onChange={(e) => handleInput(e)}
                        />
                    </div>
                    
                    <div className={styles.password}>
                        <input
                            className={styles.password_input}
                            name="password"
                            type={visible ? "text" : "password"}
                            placeholder="password"
                            onChange={(e) => handleInput(e)}
                        />
                        <div className={styles.password_icon} onClick={() => setVisible(!visible)}>
                            {visible
                                ? <VisibilityOffIcon />
                                : <VisibilityIcon />
                            }
                        </div>
                    </div>
                    
                    <button className={styles.sign_in} onClick={(e) => handleSignIn(e)}>Sign In</button>
                </form>
            </div>
        </MainLayout>
    );
};

export default Login;
