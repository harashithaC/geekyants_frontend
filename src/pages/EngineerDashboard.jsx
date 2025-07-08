import React, { useState, useEffect } from 'react';
import { getEngineerAssignments, getEngineerCapacity, getEngineerProfile } from '../utils/api';
import { Box, Grid, Card, Typography, LinearProgress, Paper } from '@mui/material';
import HeaderComponent from '../utils/HeaderComponent';

export default function EngineerDashboardPage() {
  const [assignments, setAssignments] = useState([]);
  const [capacity, setCapacity] = useState(0);
  const [engineerInfo, setEngineerInfo] = useState({ name: '', skills: [], seniority: '', availableCapacity: 0 });

  const engineerId = localStorage.getItem('userId'); // Get engineer's ID from localStorage

  useEffect(() => {
    const fetchAssignmentsAndCapacity = async () => {
      try {
        const assignmentsData = await getEngineerAssignments(engineerId);
        setAssignments(assignmentsData);

        const capacityData = await getEngineerCapacity(engineerId);
        setCapacity(capacityData.current_capacity);

        const engineerData = await getEngineerProfile(engineerId);
        setEngineerInfo(engineerData);
      } catch (error) {
        console.error('Error fetching assignments or capacity', error);
      }
    };

    fetchAssignmentsAndCapacity();
  }, [engineerId]);

  return (
    <>
    <HeaderComponent/>
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Engineer Dashboard</Typography>

      {/* Engineer Profile */}
      <Paper sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h6">Engineer Profile</Typography>
        <Typography variant="body1"><strong>Name:</strong> {engineerInfo.name}</Typography>
        <Typography variant="body1"><strong>Seniority:</strong> {engineerInfo.seniority}</Typography>
        <Typography variant="body1"><strong>Skills:</strong> {engineerInfo.skills.join(', ')}</Typography>
        <Typography variant="body1"><strong>Available Capacity:</strong> {engineerInfo.availableCapacity}%</Typography>
      </Paper>

      {/* Capacity Tracking */}
      <Paper sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h6">Current Capacity</Typography>
        <LinearProgress variant="determinate" value={capacity} sx={{ marginTop: 2 }} />
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          {capacity}% Capacity Allocated
        </Typography>
      </Paper>

      {/* Current Assignments */}
      <Typography variant="h5" sx={{ marginBottom: 2 }}>My Assignments</Typography>
      <Grid container spacing={2}>
        {assignments.map((assignment) => (
          <Grid item xs={12} md={4} key={assignment.id}>
            <Card sx={{ padding: 2 }}>
              <Typography variant="h6">{assignment.project_name}</Typography>
              <Typography variant="body1">Assigned for {assignment.allocation_percentage}% from {assignment.start_date} to {assignment.end_date}</Typography>
              <LinearProgress variant="determinate" value={assignment.allocation_percentage} sx={{ marginTop: 2 }} />
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                {assignment.allocation_percentage}% Allocated
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    </>
  );
}
