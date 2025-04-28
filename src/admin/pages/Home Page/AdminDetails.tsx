import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  Modal,
  Snackbar,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { updateCustomerProfile } from "../../../Redux Toolkit/Customer/Customer/CustomerSlice";
import ProfileFildCard from "../../../seller/pages/Account/ProfileFildCard";


// Import the async thunk

const AdminDetails = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: ""
  });

  // Initialize form data with user details when component mounts
  useEffect(() => {
  
    if (user && user.user) {
      setFormData({
        fullName: user.user.fullName || "",
        email: user.user.email || "",
        mobile: user.user.mobile || ""
      });
    }
    
  }, [user.user]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Use the async thunk and properly handle the result
      const resultAction = await dispatch(updateCustomerProfile({
        fullName: formData.fullName,
        email: formData.email,
        mobile: formData.mobile
      }));
      
      // Check if the action was rejected using the unwrapResult helper
      if (resultAction.type === 'home/updateCustomerProfile/fulfilled') {
        // Success case
        setSnackbarMessage("Profile updated successfully!");
        setSnackbarOpen(true);
        handleClose();
        
        // Fetch the updated user data if needed
        // dispatch(fetchUserProfile());
      } else {
        // This is important - log what the actual result is to debug
        console.log("Result action:", resultAction);
        throw new Error('Profile update failed: ' + JSON.stringify(resultAction));
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setSnackbarMessage("Failed to update profile. Please try again.");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center py-10">
      <div className="w-full lg:w-[70%]  ">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600 ">
            Personal Details
          </h1>
          <div>
            <Button
              onClick={handleOpen}
              size="small"
              sx={{ borderRadius: "2.9rem" }}
              variant="contained"
              className="w-16 h-16"
            >
              <EditIcon />
            </Button>
          </div>
        </div>
        <div className="space-y-5">
          {/* <Avatar
            sx={{ width: "10rem", height: "10rem" }}
            src="https://cdn.pixabay.com/photo/2014/11/29/19/33/bald-eagle-550804_640.jpg"
          /> */}
          <div>
            <ProfileFildCard keys={"Name"} value={user.user?.fullName} />
            <Divider />
            <ProfileFildCard keys={"Email"} value={user.user?.email} />
            <Divider />
            <ProfileFildCard keys={"Mobile"} value={user.user?.mobile} />
          </div>
        </div>
      </div>
      
      {/* Update User Profile Modal */}
      <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
  }}>
    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
      Update Profile
    </Typography>
    
    {/* Rest of your form */}
          
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              variant="outlined"
            />
            
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
            />
            
            <TextField
              fullWidth
              margin="normal"
              label="Mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              variant="outlined"
            />
            
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button 
                onClick={handleClose} 
                variant="outlined"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update'}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
      
      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbarMessage.includes("Failed") ? "error" : "success"}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AdminDetails;