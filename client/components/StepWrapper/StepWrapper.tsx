import React from "react";
import { useContextSelector } from "use-context-selector";
import { Step, StepLabel, Stepper } from "@mui/material";
import styles from "./StepWrapper.module.scss";
import { DarkModeContext } from "../../context/ThemesContext";

interface StepWrapperProps {
    activeStep: number;
    children: React.ReactNode;
}

const StepWrapper: React.FC<StepWrapperProps> = ({ activeStep, children }) => {
    const steps: String[] = [ "Info", "Logo", "Audio" ];

    const darkMode = useContextSelector(DarkModeContext,
        (state) => state.darkMode);
    
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

            {children}

        </div>
    );
};

export default StepWrapper;
