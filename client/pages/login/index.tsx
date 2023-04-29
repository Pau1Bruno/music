import React, { useState } from "react";
import styles from "../../styles/login/Login.module.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/router";
import MainLayout from "../../layouts/MainLayout";
import Link from "next/link";
import Modal from "../../components/Modal/Modal";

const Login = () => {
    const [ visible, setVisible ] = useState<boolean>(false);
    const [ modal, setModal ] = useState<boolean>(false);
    const [ user, setUser ] =
        useState(
            { username: "", password: "" }
        );
    const router = useRouter();
    
    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    
    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        if (!( user.username && user.password )) {
            setModal(true);
            return;
        }
        
        try {
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });
            
            if (!( response.ok )) {
                setModal(true);
                return;
            }
            
            const { access_token } = await response.json();
            localStorage.setItem("jwt", access_token);
            await router.push("/tracks");
        } catch (error) {
            console.error(error);
        }
        
    };
    
    return (
        <MainLayout title={"Login"}>
            <div className={styles.login_page}>
                <form className={styles.form_container}>
                    <div className={styles.username}>
                        <input
                            className={styles.username_input}
                            name="username"
                            type="text"
                            placeholder="Username"
                            maxLength={20}
                            minLength={6}
                            onChange={(e) => handleInput(e)}
                        />
                    </div>
                    
                    <div className={styles.password}>
                        <input
                            className={styles.password_input}
                            name="password"
                            type={visible ? "text" : "password"}
                            placeholder="Password"
                            maxLength={20}
                            minLength={8}
                            onChange={(e) => handleInput(e)}
                        />
                        
                        <div
                            className={styles.password_icon}
                            onClick={() => setVisible(!visible)}
                        >
                            {visible
                                ? <VisibilityOffIcon />
                                : <VisibilityIcon />
                            }
                        </div>
                    </div>
                    
                    {/*Modal window if user doesn't provide any data*/}
                    {!( user.username && user.password ) &&
                        <Modal modal={modal} setModal={setModal}>
                            <p>Please check all fields for data</p>
                        </Modal>
                    }
                    
                    {/*Modal window if user doesn't provide any data*/}
                    {user.username && user.password &&
                        <Modal modal={modal} setModal={setModal}>
                            <ul>We can't find you :(
                                <li>You provide wrong username or password</li>
                                <li>You don't have an account</li>
                            </ul>
                        </Modal>
                    }
                    
                    <button
                        className={styles.log_in}
                        onClick={(e) => handleLogin(e)}
                    >
                        Log In
                    </button>
                    
                    
                    <div className={styles.links}>
                        <Link
                            href={"/signup"}
                            className={styles.register_link}
                        >
                            Sign Up
                        </Link>
                        <Link
                            href={"/login"}
                            className={styles.forgot_link}
                        >
                            Forgot Password?
                        </Link>
                    </div>
                
                </form>
            </div>
        </MainLayout>
    )
        ;
};

export default Login;
