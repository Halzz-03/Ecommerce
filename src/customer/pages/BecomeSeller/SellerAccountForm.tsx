import { Button, CircularProgress, Step, StepLabel, Stepper, Snackbar, Alert } from "@mui/material";
import React, { useState, useEffect } from "react";
import BecomeSellerFormStep1 from "./BecomeSellerFormStep1";
import BecomeSellerFormStep2 from "./BecomeSellerFormStep2";
import BecomeSellerFormStep3 from "./BecomeSellerFormStep3";
import BecomeSellerFormStep4 from "./BecomeSellerFormStep4";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { createSeller } from "../../../Redux Toolkit/Seller/sellerAuthenticationSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { useFormik } from "formik";

const steps = [
  "Tax Details & Mobile",
  "Pickup Address",
  "Bank Details",
  "Supplier Details",
];

const SellerAccountForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { sellerAuth } = useAppSelector((store) => store);

  const [otp, setOpt] = useState<any>();
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message

  const formik = useFormik({
    initialValues: {
      mobile: "",
      otp: "",
      gstin: "",
      imageUrl: "",
      pickupAddress: {
        name: "",
        mobile: "",
        pincode: "",
        address: "",
        locality: "",
        city: "",
        state: "",
      },
      bankDetails: {
        accountNumber: "",
        ifscCode: "",
        accountHolderName: "",
      },
      sellerName: "",
      email: "",
      businessDetails: {
        businessName: "",
        businessEmail: "",
        businessMobile: "",
        logo: "",
        banner: "",
        businessAddress: "",
      },
      password: "",
    },
    onSubmit: (values: any) => {
      dispatch(createSeller(formik.values)) // Dispatching the createSeller action
        .then(() => {
          // On success, navigate to the login page
          setSnackbarMessage("Account created successfully! You can login now.");
          setOpenSnackbar(true); // Show the snackbar on success
          setTimeout(() => navigate("/become-seller"), 3000); // Redirect after 3 seconds
        })
        .catch((error) => {
          // Handle any errors if necessary
          console.error("Account creation failed:", error);
        });
    },
  });

  const handleStep = (value: number) => {
    setActiveStep(activeStep + value);
  };

  const handleOtpChange = (otpValue: string) => {
    setOpt(otpValue);
  };

  const handleSubmit = () => {
    formik.handleSubmit();
    console.log("Form Submitted");
  };

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className="mt-20 space-y-10">
        <div>
          {activeStep === 0 ? (
            <BecomeSellerFormStep1 formik={formik} handleOtpChange={handleOtpChange} />
          ) : activeStep === 1 ? (
            <BecomeSellerFormStep2 formik={formik} />
          ) : activeStep === 2 ? (
            <BecomeSellerFormStep3 formik={formik} />
          ) : (
            <BecomeSellerFormStep4 formik={formik} />
          )}
        </div>

        <div className="flex items-center justify-between">
          <Button
            disabled={activeStep === 0}
            onClick={() => handleStep(-1)}
            variant="contained"
          >
            Back
          </Button>
          <Button
            disabled={sellerAuth.loading}
            onClick={
              activeStep === steps.length - 1
                ? handleSubmit
                : () => handleStep(1)
            }
            variant="contained"
          >
            {activeStep === steps.length - 1
              ? sellerAuth.loading
                ? <CircularProgress size="small" sx={{ width: "27px", height: "27px" }} />
                : "Create Account"
              : "Continue"}
          </Button>
        </div>
      </div>

      {/* Snackbar for success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ backgroundColor: "#388e3c" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SellerAccountForm;
