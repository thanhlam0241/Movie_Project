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
import movieapi from "api/movie/movieapi.js";
import notificationApi from "api/communication/notificationApi.js";
import { toast } from "react-toastify";
import Loading from "components/MDLoading";
import { useSelector } from "react-redux";

const steps = ["Fill information", "Upload video"];

function ReleaseMovie() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const [genres, setGenres] = useState([]);

  const { username } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    let movieTitle = formDetail.title;
    try {
      if (!movieTitle) {
        toast.error("You must type title!");
      }
      let videoPath = "";
      let poster_path = "";
      let backdrop_path = "";
      if (formFile.video) {
        const formData = new FormData();
        formData.append("file", formFile.video);
        const resVideo = await gcsApi.uploadFileVideo(formData);
        if (resVideo) {
          console.log(resVideo);
          videoPath = resVideo.url;
        }
      }
      if (formFile.poster) {
        const formData = new FormData();
        formData.append("file", formFile.poster);
        const resPoster = await gcsApi.uploadFileImage(formData);
        if (resPoster) {
          console.log(resPoster);
          poster_path = resPoster.url;
        }
      }
      if (formFile.backdrop) {
        const formData = new FormData();
        formData.append("file", formFile.backdrop);
        const resBackdrop = await gcsApi.uploadFileImage(formData);
        if (resBackdrop) {
          console.log(resBackdrop);
          backdrop_path = resBackdrop.url;
        }
      }
      const dataFormMovie = {
        release_date: new Date(),
        genres: formDetail.genres,
        video_path: videoPath,
        poster_path: poster_path,
        backdrop_path: backdrop_path,
        title: formDetail.title,
        overview: formDetail.description,
      };
      movieapi.insert(dataFormMovie).then(() => {
        toast.success("Release movie successfully!");

        notificationApi.sendNotification({
          sender: username,
          text: `The movie ${movieTitle} is released!`,
          type_to: "ALL",
        });

        setFormDetail({
          title: "",
          description: "",
          genres: [],
        });
        setFormFile({
          video: null,
          poster: null,
          backdrop: null,
        });
      });
    } catch (ex) {
      console.log(ex);
      toast.error("Error occur!");
    } finally {
      setLoading(false);
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
    if (completedSteps() === totalSteps() - 1) {
      onSubmit();
      return;
    }
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Loading open={loading} />
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
