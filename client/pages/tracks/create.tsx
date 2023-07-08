import React, { useState } from "react";
import { useContextSelector } from "use-context-selector";
import MainLayout from "../../layouts/MainLayout";
import StepWrapper from "../../components/StepWrapper/StepWrapper";
import FileUpload from "../../components/StepWrapper/FileUpload";
import { useInput } from "../../hooks/useInput";
import { useRouter } from "next/router";
import { useAddTrackMutation } from "../../store/reducers/apiSlice";
import styles from "../../styles/track/TrackCreate.module.scss";
import { DarkModeContext } from "../../context/ThemesContext";

const Create = () => {
    const [ activeStep, setActiveStep ] = useState(0);
    const [ picture, setPicture ] = useState("");
    const [ audio, setAudio ] = useState("");
    const router = useRouter();
    const name = useInput("");
    const artist = useInput("");
    const text = useInput("");
    const [ addTrack ] = useAddTrackMutation();

    const darkMode = useContextSelector(DarkModeContext,
        (state) => state.darkMode);

    const next = () => {
        const nextButton = document.getElementsByName("navigation_button")[1];
        if (activeStep === 1) nextButton.innerText = "publish";

        if (activeStep !== 2) {
            setActiveStep(step => step + 1);
        } else {
            const formData = new FormData();
            formData.append("name", name.value);
            formData.append("artist", artist.value);
            formData.append("text", text.value);
            formData.append("picture", picture);
            formData.append("audio", audio);
            
            // Отправка на сервер поста и переход на страницу со всеми треками
            addTrack(formData);
            router.push("/tracks").then();
        }
    };
    const back = () => {
        const nextButton = document.getElementsByName("navigation_button")[1];
        if (activeStep === 2) nextButton.innerText = "next";
        
        setActiveStep(step => step - 1);
    };
    
    return (
        <MainLayout title={"Upload Track"}>
            <div className={darkMode ? styles.dark : styles.light}>
                <div className={styles.page}>
                    <div className={styles.container}>
                        <StepWrapper activeStep={activeStep}>
                            {activeStep === 0 &&
                                <div className={styles.track_info}>
                                    <input
                                        placeholder={"song"}
                                        {...name}
                                    />
                                    <input
                                        placeholder={"artist"}
                                        {...artist}
                                    />
                                    <input
                                        placeholder={"text"}
                                        {...text}
                                    />
                                </div>
                            }

                            {activeStep === 1 &&
                                <FileUpload
                                    setFile={setPicture}
                                    accept={"image/*"}>
                                    <button className={styles.upload}>Upload logo</button>
                                </FileUpload>
                            }

                            {activeStep === 2 &&
                                <FileUpload
                                    setFile={setAudio}
                                    accept={"audio/*"}>
                                    <button className={styles.upload}>Upload audio</button>
                                </FileUpload>
                            }

                        </StepWrapper>

                        <div className={styles.buttons}>
                            <button
                                name={"navigation_button"}
                                onClick={back}
                                disabled={activeStep < 1}
                            >
                                previous
                            </button>
                            <button
                                name={"navigation_button"}
                                onClick={next}
                            >
                                next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Create;
