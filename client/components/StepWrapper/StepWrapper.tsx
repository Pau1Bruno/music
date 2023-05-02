import React from "react";
import { Step, StepLabel, Stepper } from "@mui/material";
import styles from "./StepWrapper.module.scss";

interface StepWrapperProps {
    activeStep: number;
    children: React.ReactNode;
}

const StepWrapper: React.FC<StepWrapperProps> = ({ activeStep, children }) => {
    const steps: String[] = [ "Info", "Logo", "Audio" ];
    
    return (
        <div className={styles.create_page}>
            
            <Stepper activeStep={activeStep}>
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
