import React from "react";
import { Button } from "@mui/material";

const Pagination = () => {
  return (
    <div>
      <Button variant="contained" color="primary">
        Previous
      </Button>
      <Button variant="contained" color="primary">
        Next
      </Button>
    </div>
  );
};

export default Pagination;
