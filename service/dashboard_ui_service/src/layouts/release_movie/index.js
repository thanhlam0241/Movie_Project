import { useState, Fragment, useEffect } from "react";
import gcsApi from "api/storage/gcsApi";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Box from "@mui/material/Box";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Info from "./step/info.js";
import Video from "./step/video.js";
import genreapi from "api/movie/genreapi";

const steps = ["Fill information", "Upload video"];

function ReleaseMovie() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const [genres, setGenres] = useState([]);

  const fetchGenre = () => {
    genreapi
      .getAll()
      .then((res) => setGenres(res))
      .catch((ex) => console.log(ex));
  };

  useEffect(() => {
    fetchGenre();
  }, []);

  const [formDetail, setFormDetail] = useState({
    title: "",
    description: "",
    genres: [],
  });

  const [formFile, setFormFile] = useState({
    video: null,
    poster: null,
    backdrop: null,
  });

  const onSubmit = async () => {
    let videoPath = "";
    let poster_path = "";
    let backdrop_path = "";
    if (formFile.video) {
      const formData = new FormData();
      formData.append("file", formFile.video);
      const res = await gcsApi.uploadFileVideo(formData);
      if (res) {
        console.log(res);
      }
    }
    if (formFile.poster) {
      const formData = new FormData();
      formData.append("file", formFile.video);
      const res = await gcsApi.uploadFileVideo(formData);
      if (res) {
        console.log(res);
      }
    }
    if (formFile.backdrop) {
      const formData = new FormData();
      formData.append("file", formFile.video);
      const res = await gcsApi.uploadFileVideo(formData);
      if (res) {
        console.log(res);
      }
    }
  };

  const onChangeFormDetail = (name, value) => {
    setFormDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onChangeFormFile = (name, value) => {
    setFormFile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ width: "100%" }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div style={{ backgroundColor: "#fff", padding: 24 }}>
          {allStepsCompleted() ? (
            <Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </Fragment>
          ) : (
            <Fragment>
              <Typography sx={{ mt: 2, mb: 1, py: 1 }}>Step {activeStep + 1}</Typography>
              {activeStep === 0 && (
                <Info genres={genres} formDetail={formDetail} onChange={onChangeFormDetail} />
              )}
              {activeStep === 1 && <Video formDetail={formFile} onChange={onChangeFormFile} />}
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button
                  disabled={activeStep === steps.length - 1}
                  onClick={handleNext}
                  sx={{ mr: 1 }}
                >
                  Next
                </Button>
                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography variant="caption" sx={{ display: "inline-block" }}>
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button onClick={handleComplete}>
                      {completedSteps() === totalSteps() - 1 ? "Finish" : "Complete"}
                    </Button>
                  ))}
              </Box>
            </Fragment>
          )}
        </div>
      </Box>
    </DashboardLayout>
  );
}

export default ReleaseMovie;
