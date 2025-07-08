import React, { useState, useEffect } from 'react';
import { getEngineers, getProjects } from '../utils/api';
import { Box, Grid, Card, Typography, LinearProgress } from '@mui/material';
import AssignmentForm from '../components/AssignmentForm';
import ProjectForm from '../components/ProjectForm';

export default function ManagerDashboardPage() {
  const [engineers, setEngineers] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const engineersData = await getEngineers();
        setEngineers(engineersData);
        
        const projectsData = await getProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>Manager Dashboard</Typography>

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ marginBottom: 3 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ padding: 2 }}>
            <Typography variant="h6">Total Engineers</Typography>
            <Typography variant="h4">{engineers.length}</Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ padding: 2 }}>
            <Typography variant="h6">Total Projects</Typography>
            <Typography variant="h4">{projects.length}</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Engineers Overview */}
      <Grid container spacing={3}>
        {engineers.map((engineer) => (
          <Grid item xs={12} md={4} key={engineer.id}>
            <Card sx={{ padding: 2 }}>
              <Typography variant="h6">{engineer.name}</Typography>
              <Typography variant="body2" color="textSecondary">{engineer.skills.join(', ')}</Typography>
              <LinearProgress variant="determinate" value={engineer.current_capacity} sx={{ marginTop: 2 }} />
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                {engineer.current_capacity}% Capacity
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create Assignment Form */}
      <AssignmentForm projects={projects} />

      {/* Create Project Form */}
      <ProjectForm />
    </Box>
  );
}
