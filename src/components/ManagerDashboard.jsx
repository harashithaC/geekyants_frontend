import React, { useEffect, useState } from 'react';
import { getEngineers, getProjects, createAssignment, createProject, getEngineerAssignments } from '../utils/api';
import { Box, Grid, Card, Typography, LinearProgress, Button, Paper } from '@mui/material';
import AssignmentForm from './AssignmentForm';
import ProjectForm from './ProjectForm';

export default function ManagerDashboardPage() {
  const [engineers, setEngineers] = useState([]);
  console.log('engineers====>',engineers)
  const [projects, setProjects] = useState([]);
  const [assignments, setAssignments] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const engineersData = await getEngineers();
        setEngineers(engineersData);
        
        const projectsData = await getProjects();
        setProjects(projectsData);

        // Assuming assignments are needed as well
        const assignmentsData = await getEngineerAssignments();
        setAssignments(assignmentsData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>Manager Dashboard</Typography>

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ marginBottom: 3 }}>
        <Grid size={{xs:12,md:3}}>
          <Card sx={{ padding: 2 }}>
            <Typography variant="h6">Total Engineers</Typography>
            <Typography variant="h4">{engineers.length}</Typography>
          </Card>
        </Grid>

        <Grid size={{xs:12,md:3}}>
          <Card sx={{ padding: 2 }}>
            <Typography variant="h6">Total Projects</Typography>
            <Typography variant="h4">{projects.length}</Typography>
          </Card>
        </Grid>

        <Grid size={{xs:12,md:3}}>
          <Card sx={{ padding: 2 }}>
            <Typography variant="h6">Active Assignments</Typography>
            <Typography variant="h4">{assignments.length}</Typography>
          </Card>
        </Grid>

        <Grid size={{xs:12,md:3}}>
          <Card sx={{ padding: 2 }}>
            <Typography variant="h6">Available Engineers</Typography>
            <Typography variant="h4">{engineers.filter(e => e.current_capacity === 0).length}</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Engineers Overview */}
      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>Engineers Overview</Typography>
        <Grid container spacing={2}>
          {engineers.map((engineer) => (
            <Grid size={{xs:12,md:4}} key={engineer.id}>
              <Card sx={{ padding: 2 }}>
                <Typography variant="h6">{engineer?.name}</Typography>
                {/* <Typography variant="body2" color="textSecondary">{engineer?.skills.join(', ')}</Typography> */}
                <LinearProgress variant="determinate" value={engineer?.current_capacity} sx={{ marginTop: 2 }} />
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  {engineer?.current_capacity}% Capacity
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Create Assignment Form */}
      <AssignmentForm projects={projects} />

      {/* Create Project Form */}
      <ProjectForm />
    </Box>
  );
}
