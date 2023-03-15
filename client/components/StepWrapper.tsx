import React from "react";
import {Container} from "@mui/system";
import {Card, Grid, Step, StepLabel, Stepper} from "@mui/material";


interface StepWrapperProps {
    activeStep: number;
    children: React.ReactNode;
}

const steps: String[] = [ "Track Info", "Upload logo", "Upload audio" ];
const StepWrapper: React.FC<StepWrapperProps> = ({ activeStep, children }) => {
    return (
        <Container>
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
            <Grid container justifyContent={"center"} style={{ height: "300px", marginTop: "20px" }}>
                <Card style={{ width: "500px" }}>
                    {children}
                </Card>
            </Grid>
        </Container>
    );
};

export default StepWrapper;
