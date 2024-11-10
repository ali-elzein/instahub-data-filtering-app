import React from "react";
import { TextField, Button } from "@mui/material";

const FilterPanel = () => {
  return (
    <div>
      <h3>Filter Data</h3>
      <TextField label="Search by Device ID" fullWidth margin="normal" />
      <TextField label="Search by Timestamp" fullWidth margin="normal" />
      {/* Add more filter inputs as needed */}
      <Button variant="contained" color="secondary">
        Apply Filters
      </Button>
    </div>
  );
};

export default FilterPanel;
