import React, {useState} from "react";
import MainLayout from "../../layouts/MainLayout";
import StepWrapper from "../../components/StepWrapper";
import {Button, Grid, TextField} from "@mui/material";
import FileUpload from "../../components/FileUpload";

const Create = () => {
    const [ activeStep, setActiveStep ] = useState(0);
    const [ picture, setPicture ] = useState(null);
    const [ audio, setAudio ] = useState(null);

    const next = () => {
        if (activeStep !== 2) {
            setActiveStep(step => step + 1);
        }
    };
    const back = () => {
        setActiveStep(step => step - 1);
    };

    return (
        <MainLayout>
            <StepWrapper activeStep={activeStep}>
                {activeStep === 0 &&
                    <Grid p={2} gap={"10px"} container justifyContent={"center"} direction={"column"}>
                        <TextField
                            label={"Song"} />
                        <TextField
                            label={"Artist"} />
                        <TextField
                            label={"Text"}
                            multiline
                            rows={4}
                        />
                    </Grid>
                }
                {activeStep === 1 &&
                    <FileUpload
                        setFile={setPicture}
                        accept={"image/*"}>
                        <Button style={{ height: "100%", width: "100%" }}>Upload logo</Button>
                    </FileUpload>
                }
                {activeStep === 2 &&
                    <FileUpload
                        setFile={setAudio}
                        accept={"audio/*"}>
                        <Button style={{ height: "100%", width: "100%" }}>Upload audio</Button>
                    </FileUpload>
                }

            </StepWrapper>
            <Grid container justifyContent="space-around" marginTop={"30px"}>
                <Button onClick={back} disabled={activeStep < 1}>previous</Button>
                <Button onClick={next}>next</Button>
            </Grid>
        </MainLayout>
    );
};

export default Create;
