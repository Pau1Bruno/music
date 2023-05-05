import React, { useContext } from "react";
import { Step, StepLabel, Stepper } from "@mui/material";
import styles from "./StepWrapper.module.scss";
import { DarkModeContext } from "../../context/ThemesContext";

interface StepWrapperProps {
    activeStep: number;
    children: React.ReactNode;
}

const StepWrapper: React.FC<StepWrapperProps> = ({ activeStep, children }) => {
    const steps: String[] = [ "Info", "Logo", "Audio" ];
    
    const { darkMode } = useContext(DarkModeContext);
    
    return (
        <div className={darkMode ? styles.dark : styles.light}>
            
            <Stepper className={styles.stepper} activeStep={activeStep}>
                {steps.map((step, index) =>
                    <Step
                        key={index}
                        completed={activeStep > index}
                    >
                        <StepLabel>{step}</StepLabel>
                    </Step>
                )}
            </Stepper>
            
            <div className={styles.track_part}>
                {children}
            </div>
        
        </div>
    );
};

export default StepWrapper;