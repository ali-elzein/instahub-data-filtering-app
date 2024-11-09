import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const DeviceForm = () => {
  const [formData, setFormData] = useState({
    buildingName: "",
    roomName: "",
    location: "",
    roomType: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you'd send the form data to your backend, for now it's just logged
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Building Name"
        name="buildingName"
        value={formData.buildingName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Room Name"
        name="roomName"
        value={formData.roomName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Room Type"
        name="roomType"
        value={formData.roomType}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Save Device
      </Button>
    </form>
  );
};

export default DeviceForm;
