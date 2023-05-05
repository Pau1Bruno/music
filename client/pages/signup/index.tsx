import React, { useState } from "react";
import styles from "../../styles/signup/Signup.module.scss";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { useRouter } from "next/router";
import MainLayout from "../../layouts/MainLayout";
import Modal from "../../components/Modal/Modal";

const Signup = () => {
    const [ visible, setVisible ] = useState<boolean>(false);
    const [ modal, setModal ] = useState<boolean>(false);
    const [ passwordCheck, setPasswordCheck ] = useState<string>("");
    const [ user, setUser ] =
        useState(
            { username: "", password: "" }
        );
    const router = useRouter();
    const [ busy, setBusy ] = useState(false);
    
    const handleUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    
    const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordCheck(e.target.value);
    };
    
    const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setBusy(false);
        setModal(false);
        e.preventDefault();
        if (!( user.username && user.password )) {
            setModal(true);
            return;
        }
        
        if (user.password !== passwordCheck) {
            setModal(true);
            return;
        }
        
        const response = await fetch("http://localhost:5000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        
        if (response.status === 409) {
            // document.body.querySelector('[name = "username"]').style.border = "red 2px solid"
            setBusy(true);
            setModal(true);
            
            return;
        }
        
        if (response.ok) {
            await router.push("/login");
            return;
        }
    };
    
    return (
        <MainLayout title={"Sign Up"}>
            <div className={styles.signup}>
                <form className={styles.form_container}>
                    
                    <input
                        className={styles.username_input}
                        name="username"
                        type="text"
                        placeholder="Username"
                        maxLength={20}
                        minLength={6}
                        onChange={(e) => handleUser(e)}
                    />
                    
                    <div className={styles.password}>
                        <input
                            className={styles.password_input}
                            name="password"
                            type={visible ? "text" : "password"}
                            placeholder="Password"
                            maxLength={20}
                            minLength={8}
                            onChange={(e) => handleUser(e)}
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
                    
                    <input
                        name="password"
                        type={visible ? "text" : "password"}
                        placeholder="Confirm Password"
                        maxLength={20}
                        minLength={8}
                        onChange={(e) => handlePasswordCheck(e)}
                    />
                    
                    <button
                        className={styles.sign_up}
                        onClick={(e) => handleSignup(e)}
                    >
                        Sign Up
                    </button>
                    
                    
                    {/*User didn't provide any data*/}
                    {!busy && !( user.username && user.password ) &&
                        <Modal modal={modal} setModal={setModal}>
                            <p>Please check all fields for data</p>
                        </Modal>
                    }
                    
                    {/*User entered different passwords*/}
                    {!busy && user.username && user.password !== passwordCheck &&
                        <Modal modal={modal} setModal={setModal}>
                            <p>Your passwords do not match</p>
                        </Modal>
                    }
                    
                    {busy &&
                        <Modal modal={modal} setModal={setModal}>
                            <p>This username is busy</p>
                        </Modal>
                    }
                    
                    <div className={styles.links}>
                        
                        <Link
                            href={"/login"}
                            className={styles.register_link}
                        >
                            <ArrowBackIcon />
                            Log In
                        </Link>
                    </div>
                
                </form>
            </div>
        </MainLayout>
    );
};

export default Signup;