import React, { useState } from "react";
import styles from "../../styles/signup/Signup.module.scss";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { useRouter } from "next/router";
import MainLayout from "../../layouts/MainLayout";

const Signup = () => {
    const [ visible, setVisible ] = useState(false);
    const [ user, setUser ] = useState({ username: "", password: "" });
    const [ passwordCheck, setPasswordCheck ] = useState("");
    const router = useRouter();
    
    const handleUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    
    const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordCheck(e.target.value);
    };
    
    const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!( user.username && user.password ) || user.password !== passwordCheck) return;
        
        const response = await fetch("http://localhost:5000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        
        if (response.ok) {
            await router.push("/login");
        } else {
            alert("Problem with adding to database");
        }
    };
    
    console.log(user);
    
    return (
        <MainLayout title={"Sign Up"}>
            <div className={styles.signup}>
                <form className={styles.form_container}>
                    
                    <input
                        className={styles.username_input}
                        name="username"
                        type="text"
                        placeholder="Username"
                        onChange={(e) => handleUser(e)}
                    />
                    
                    <div className={styles.password}>
                        <input
                            className={styles.password_input}
                            name="password"
                            type={visible ? "text" : "password"}
                            placeholder="Password"
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
                        onChange={(e) => handlePasswordCheck(e)}
                    />
                    
                    <button
                        className={styles.sign_up}
                        onClick={(e) => handleSignup(e)}
                    >
                        Sign Un
                    </button>
                    
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