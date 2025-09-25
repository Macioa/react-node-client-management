import { Close } from "@mui/icons-material";
import { Autocomplete, IconButton, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import { updateUser } from "../../redux/action/user";
import { useDispatch, useSelector } from "react-redux";
import {
  PiHandCoins,
  PiHouseLine,
  PiImage,
  PiImages,
  PiMapPinLine,
  PiNotepad,
  PiRuler,
  PiXLight,
} from "react-icons/pi";
import { Divider, Dialog, DialogContent, DialogTitle, Slide, DialogActions } from "@mui/material";
import { pakistanCities } from "../../constant";
import { CFormSelect } from "@coreui/react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const EditModal = ({ open, setOpen, userType = "employee" }) => {
  /////////////////////////////////////// VARIABLES ///////////////////////////////////////
  const dispatch = useDispatch();
  const { currentEmployee, isFetching, error } = useSelector((state) => state.user);
  const initialEmployeeState = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    city: "",
    CNIC: "",
  };

  /////////////////////////////////////// STATES ///////////////////////////////////////
  const [employeeData, setEmployeeData] = useState(currentEmployee);
  const [errors, setErrors] = useState({});
  /////////////////////////////////////// USE EFFECT ///////////////////////////////////////
  useEffect(() => {
    setEmployeeData(currentEmployee);
  }, [currentEmployee]);

  /////////////////////////////////////// FUNCTIONS ///////////////////////////////////////
  const validateForm = () => {
    const newErrors = {};
    
    if (!employeeData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }
    
    if (!employeeData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }
    
    if (!employeeData.username.trim()) {
      newErrors.username = "Username is required";
    }
    
    if (!employeeData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    dispatch(updateUser(currentEmployee._id, employeeData, employeeData?.role));
    setEmployeeData(initialEmployeeState);
    setErrors({});
    setOpen(false);
  };

  const handleInputChange = (field, value) => {
    setEmployeeData((prevFilters) => ({ ...prevFilters, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prevErrors => ({ ...prevErrors, [field]: '' }));
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEmployeeData(initialEmployeeState);
    setErrors({});
  };

  return (
    <Dialog
      scroll={"paper"}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth="sm"
      maxWidth="sm"
      aria-describedby="alert-dialog-slide-description">
      <DialogTitle className="flex items-center justify-between">
        <div className="text-sky-400 font-primary">Edit {userType === "client" ? "Client" : "Employee"}</div>
        <div className="cursor-pointer" onClick={handleClose}>
          <PiXLight className="text-[25px]" />
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
          <div className="text-xl flex justify-start items-center gap-2 font-normal">
            <PiNotepad size={23} />
            <span>{userType === "client" ? "Client" : "Employee"} Details</span>
          </div>
          <Divider />
          <table className="mt-4">
            <tr>
              <td className="pb-4 text-lg">First Name </td>
              <td className="pb-4">
                <TextField
                  size="small"
                  fullWidth
                  value={employeeData?.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </td>
            </tr>
            <tr>
              <td className="pb-4 text-lg">Last Name </td>
              <td className="pb-4">
                <TextField
                  size="small"
                  fullWidth
                  value={employeeData?.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </td>
            </tr>
            <tr>
              <td className="pb-4 text-lg">User Name </td>
              <td className="pb-4">
                <TextField
                  size="small"
                  fullWidth
                  value={employeeData?.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  error={!!errors.username}
                  helperText={errors.username}
                />
              </td>
            </tr>
            <tr>
                <td className="pb-4 text-lg">Email </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Optional"
                    value={employeeData?.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </td>
              </tr>
            <tr>
              <td className="flex items-start pt-2 text-lg">Password </td>
              <td className="pb-4">
                <TextField
                  type="password"
                  value={employeeData?.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  size="small"
                  fullWidth
                  placeholder="Leave blank to keep current password"
                />
              </td>
            </tr>
            <tr>
              <td className="flex items-start pt-2 text-lg">Phone </td>
              <td className="pb-4">
                <TextField
                  type="number"
                  size="small"
                  value={employeeData?.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone}
                />
              </td>
            </tr>
            <tr>
              <td className="flex items-start pt-2 text-lg">City </td>
              <td className="pb-4">
                <CFormSelect
                  size="sm"
                  value={employeeData?.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="w-full"
                >
                  <option value="">Select City</option>
                  {pakistanCities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </CFormSelect>
              </td>
            </tr>
            <tr>
              <td className="flex items-start pt-2 text-lg">CNIC </td>
              <td className="pb-4">
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Optional"
                  value={employeeData?.CNIC}
                  onChange={(e) => handleInputChange("CNIC", e.target.value)}
                />
              </td>
            </tr>
          </table>
        </div>
      </DialogContent>
      <DialogActions>
        <button
          onClick={handleClose}
          variant="contained"
          type="reset"
          className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          variant="contained"
          className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
          {isFetching ? "Submitting..." : "Submit"}
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
