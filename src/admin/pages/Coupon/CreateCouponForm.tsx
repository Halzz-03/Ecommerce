import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Box,
  Grid,
  Alert,
  Snackbar,
  CircularProgress,
  Typography,
  Paper,
  Divider,
  InputAdornment,
  createTheme,
  ThemeProvider,
  alpha,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import PercentIcon from "@mui/icons-material/Percent";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import EventIcon from "@mui/icons-material/Event";
import { useDispatch } from "react-redux";
import store, {
  useAppDispatch,
  useAppSelector,
} from "../../../Redux Toolkit/Store";
import { createCoupon } from "../../../Redux Toolkit/Admin/AdminCouponSlice";
import { teal } from "@mui/material/colors";

// Create teal theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#008080",
      light: "#33a3a3",
      dark: "#005959",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#00635b",
      light: "#338f89",
      dark: "#00453f",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    h5: {
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: "0.9rem",
      color: "#666",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          boxShadow: "none",
          padding: "10px 24px",
          fontWeight: 600,
          "&:hover": {
            boxShadow: "0px 4px 8px rgba(0, 128, 128, 0.2)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#008080",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderWidth: 2,
            },
          },
          "& .MuiInputLabel-root": {
            "&.Mui-focused": {
              color: "#008080",
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.08)",
        },
      },
    },
  },
});

interface CouponFormValues {
  code: string;
  discountPercentage: number;
  validityStartDate: Dayjs | null;
  validityEndDate: Dayjs | null;
  minimumOrderValue: number;
}

const CouponForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { coupone, adminCoupon } = useAppSelector((store) => store);
  const [snackbarOpen, setOpenSnackbar] = useState(false);

  const formik = useFormik<CouponFormValues>({
    initialValues: {
      code: "",
      discountPercentage: 0,
      validityStartDate: null,
      validityEndDate: null,
      minimumOrderValue: 0,
    },
    validationSchema: Yup.object({
      code: Yup.string()
        .required("Coupon code is required")
        .min(3, "Code should be at least 3 characters")
        .max(20, "Code should be at most 20 characters"),
      discountPercentage: Yup.number()
        .required("Discount percentage is required")
        .min(1, "Discount should be at least 1%")
        .max(100, "Discount cannot exceed 100%"),
      validityStartDate: Yup.date()
        .nullable()
        .required("Start date is required")
        .typeError("Invalid date"),
      validityEndDate: Yup.date()
        .nullable()
        .required("End date is required")
        .typeError("Invalid date")
        .min(
          Yup.ref("validityStartDate"),
          "End date cannot be before start date"
        ),
      minimumOrderValue: Yup.number()
        .required("Minimum order value is required")
        .min(1, "Minimum order value should be at least 1"),
    }),
    onSubmit: (values) => {
      const formattedValues = {
        ...values,
        validityStartDate: values.validityStartDate
          ? values.validityStartDate.toISOString()
          : null,
        validityEndDate: values.validityEndDate
          ? values.validityEndDate.toISOString()
          : null,
      };
      console.log("Form Values:", formattedValues);
      dispatch(
        createCoupon({
          coupon: formattedValues,
          jwt: localStorage.getItem("jwt") || "",
        })
      );
      // Submit form values to the backend
    },
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (adminCoupon.couponCreated) {
      setOpenSnackbar(true);
    }
  }, [adminCoupon.couponCreated]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          py: 4,
          px: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: "800px",
            overflow: "hidden",
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          <Box
            sx={{
              bgcolor: teal[500],
              py: 3,
              px: 4,
              color: "white",
            }}
          >
            <Typography variant="h5" component="h2">
              Create New Coupon
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 0.5, color: "white", opacity: 0.8 }}>
              Fill out the form to create a new coupon for your customers
            </Typography>
          </Box>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              sx={{ p: 4 }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="code"
                    name="code"
                    label="Coupon Code"
                    value={formik.values.code}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.code && Boolean(formik.errors.code)}
                    helperText={formik.touched.code && formik.errors.code}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocalOfferIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="discountPercentage"
                    name="discountPercentage"
                    label="Discount Percentage"
                    type="number"
                    value={formik.values.discountPercentage}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.discountPercentage &&
                      Boolean(formik.errors.discountPercentage)
                    }
                    helperText={
                      formik.touched.discountPercentage &&
                      formik.errors.discountPercentage
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PercentIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }}>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        color: "text.secondary", 
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      <EventIcon fontSize="small" color="primary" />
                      Validity Period
                    </Typography>
                  </Divider>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Validity Start Date"
                    value={formik.values.validityStartDate}
                    onChange={(date) =>
                      formik.setFieldValue("validityStartDate", date)
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error:
                          formik.touched.validityStartDate &&
                          Boolean(formik.errors.validityStartDate),
                        helperText:
                          formik.touched.validityStartDate &&
                          (formik.errors.validityStartDate as React.ReactNode),
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Validity End Date"
                    value={formik.values.validityEndDate}
                    onChange={(date) =>
                      formik.setFieldValue("validityEndDate", date)
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error:
                          formik.touched.validityEndDate &&
                          Boolean(formik.errors.validityEndDate),
                        helperText:
                          formik.touched.validityEndDate &&
                          (formik.errors.validityEndDate as React.ReactNode),
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="minimumOrderValue"
                    name="minimumOrderValue"
                    label="Minimum Order Value"
                    type="number"
                    value={formik.values.minimumOrderValue}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.minimumOrderValue &&
                      Boolean(formik.errors.minimumOrderValue)
                    }
                    helperText={
                      formik.touched.minimumOrderValue &&
                      formik.errors.minimumOrderValue
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachMoneyIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ mt: 2 }}>
                    <Button
                      color="primary"
                      variant="contained"
                      type="submit"
                      fullWidth
                      disabled={adminCoupon.loading}
                      sx={{
                        py: 1.5,
                        fontSize: "1rem",
                        "&:hover": {
                          bgcolor: "primary.dark",
                        },
                      }}
                    >
                      {adminCoupon.loading ? (
                        <CircularProgress
                          size={24}
                          sx={{ color: "white" }}
                        />
                      ) : (
                        "Create Coupon"
                      )}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </LocalizationProvider>
        </Paper>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={adminCoupon.error ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%", boxShadow: 3 }}
        >
          {adminCoupon.error ? adminCoupon.error : "Coupon created successfully"}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default CouponForm;