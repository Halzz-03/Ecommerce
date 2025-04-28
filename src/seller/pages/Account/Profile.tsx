import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  Modal,
  Snackbar,
  IconButton,
} from "@mui/material";
import ProfileFildCard from "./ProfileFildCard";
import EditIcon from "@mui/icons-material/Edit";
import PersonalDetailsForm from "./PersionalDetailsForm";
import BusinessDetailsForm from "./BussinessDetailsForm";
import PickupAddressForm from "./PickupAddressForm";
import BankDetailsForm from "./BankDetailsForm";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { updateSellerImage } from "../../../Redux Toolkit/Seller/sellerSlice";

export const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Profile = () => {
  const { sellers } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [selectedForm, setSelectedForm] = useState("personalDetails");
  const handleClose = () => setOpen(false);
  const [snackbarOpen, setOpenSnackbar] = useState(false);

  const handleOpen = (formName: string) => {
    setOpen(true);
    setSelectedForm(formName);
  };

  const renderSelectedForm = () => {
    switch (selectedForm) {
      case "personalDetails":
        return <PersonalDetailsForm onClose={handleClose} />;
      case "businessDetails":
        return <BusinessDetailsForm onClose={handleClose} />;
      case "pickupAddress":
        return <PickupAddressForm onClose={handleClose} />;
      case "bankDetails":
        return <BankDetailsForm onClose={handleClose} />;
      case "profileImage":
        return <ProfileImageForm onClose={handleClose} />;
      default:
        return null;
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (sellers.profileUpdated || sellers.error) {
      setOpenSnackbar(true);
    }
  }, [sellers.profileUpdated, sellers.error]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      dispatch(updateSellerImage(formData));
    }
  };

  const ProfileImageForm = ({ onClose }: { onClose: () => void }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
      }
    };

    const handleSubmit = () => {
      if (selectedFile) {
        const formData = new FormData();
        
        // Make sure the file is being added correctly
        formData.append("image", selectedFile, selectedFile.name);
        
        // Debug - check what's in the FormData
        console.log("File being uploaded:", selectedFile.name, selectedFile.type, selectedFile.size);
        
        dispatch(updateSellerImage(formData));
        onClose();
      }
    };

    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Update Profile Image</h2>
        <div className="flex flex-col items-center">
          {previewUrl ? (
            <Avatar
              src={previewUrl}
              sx={{ width: "8rem", height: "8rem", mb: 2 }}
            />
          ) : (
            <Avatar
              src={sellers.profile?.imageUrl || ""}
              sx={{ width: "8rem", height: "8rem", mb: 2 }}
            />
          )}
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="image-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="image-upload">
            <Button
              variant="contained"
              component="span"
              startIcon={<PhotoCameraIcon />}
            >
              Choose Image
            </Button>
          </label>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!selectedFile}
          >
            Save
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="lg:p-20 space-y-20">
      <div className="w-full lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600">Personal Details</h1>
          <div>
            <Button
              onClick={() => handleOpen("personalDetails")}
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
          <div className="relative">
            <Avatar
              sx={{ width: "10rem", height: "10rem" }}
              src={sellers.profile?.imageUrl || ""}
            />
            <IconButton
              onClick={() => handleOpen("profileImage")}
              className="absolute bottom-0 right-0 bg-white"
              size="small"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </div>
          <div>
            <ProfileFildCard
              keys={"Seller Name"}
              value={sellers.profile?.sellerName}
            />
            <Divider />
            <ProfileFildCard
              keys={"Seller Email"}
              value={sellers.profile?.email}
            />
            <Divider />
            <ProfileFildCard
              keys={"Seller Mobile"}
              value={sellers.profile?.mobile}
            />
          </div>
        </div>
      </div>
      <div className="mt-10 lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600">Business Details</h1>
          <div>
            <Button
              onClick={() => handleOpen("businessDetails")}
              size="small"
              sx={{ borderRadius: "2.9rem" }}
              variant="contained"
              className="w-16 h-16"
            >
              <EditIcon />
            </Button>
          </div>
        </div>

        <div>
          <ProfileFildCard
            keys={"Business Name/Brand Name"}
            value={sellers.profile?.businessDetails?.businessName}
          />
          <Divider />
          <ProfileFildCard
            keys={"GSTIN"}
            value={sellers.profile?.gstin || "not provided"}
          />
          <Divider />
          <ProfileFildCard
            keys={"Account Status"}
            value={sellers.profile?.accountStatus}
          />
        </div>
      </div>
      <div className="mt-10 lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600">Pickup Address</h1>
          <div>
            <Button
              onClick={() => handleOpen("pickupAddress")}
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
          <div>
            <ProfileFildCard
              keys={"Address"}
              value={sellers.profile?.pickupAddress?.address}
            />
            <Divider />
            <ProfileFildCard
              keys={"City"}
              value={sellers.profile?.pickupAddress?.city || "not provided"}
            />
            <Divider />
            <ProfileFildCard
              keys={"State"}
              value={sellers.profile?.pickupAddress?.state}
            />
            <Divider />
            <ProfileFildCard
              keys={"Mobile"}
              value={sellers.profile?.pickupAddress?.mobile}
            />
          </div>
        </div>
      </div>
      <div className="mt-10 lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600">Bank Details</h1>
          <div>
            <Button
              onClick={() => handleOpen("bankDetails")}
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
          <div>
            <ProfileFildCard
              keys={"Account Holder Name"}
              value={sellers.profile?.bankDetails?.accountHolderName}
            />
            <Divider />
            <ProfileFildCard
              keys={"Account Number"}
              value={
                sellers.profile?.bankDetails?.accountNumber || "not provided"
              }
            />
            <Divider />
            <ProfileFildCard
              keys={"IFSC CODE"}
              value={sellers.profile?.bankDetails?.ifscCode}
            />
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{renderSelectedForm()}</Box>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={sellers.error ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {sellers.error ? sellers.error : "Profile Updated Successfully"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Profile;