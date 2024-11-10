import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const DataTable = () => {
  const data = [
    { device_id: "1", timestamp: "2024-11-01 00:00", temperature: 22, light: 300, motion: "active" },
    { device_id: "2", timestamp: "2024-11-01 00:10", temperature: 21, light: 305, motion: "inactive" },
    // Mock data...
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Device ID</TableCell>
            <TableCell>Timestamp</TableCell>
            <TableCell>Temperature</TableCell>
            <TableCell>Light</TableCell>
            <TableCell>Motion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.device_id}>
              <TableCell>{row.device_id}</TableCell>
              <TableCell>{row.timestamp}</TableCell>
              <TableCell>{row.temperature}</TableCell>
              <TableCell>{row.light}</TableCell>
              <TableCell>{row.motion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
