import React from "react";
import DeviceForm from "../components/DeviceMetadata/DeviceForm";
import FilterPanel from "../components/Filter/FilterPanel";
import DataTable from "../components/DataTable/DataTable";
import Pagination from "../components/Pagination/Pagination";

const HomePage = () => {
  return (
    <div>
      <h1>Instahub Data Filtering App</h1>

      <DeviceForm /> {/* Form for managing device metadata */}
      <FilterPanel /> {/* Panel for applying filters */}
      <DataTable /> {/* Table to display data */}
      <Pagination /> {/* Pagination controls */}
    </div>
  );
};

export default HomePage;
