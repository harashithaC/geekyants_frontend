import React, { useEffect, useState } from 'react';
import { createAssignment, getEngineers, getProjects } from '../utils/api';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Typography, Paper } from '@mui/material';

export default function AssignmentForm({ projects }) {
  const [engineerId, setEngineerId] = useState('');
  const [projectId, setProjectId] = useState('');
  const [allocationPercentage, setAllocationPercentage] = useState(50);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const assignmentData = { engineer_id: engineerId, project_id: projectId, allocation_percentage: allocationPercentage };

    try {
      await createAssignment(assignmentData);
      alert("Assignment created successfully!");
    } catch (error) {
      alert("Error creating assignment");
    }
  };
  const [engineers, setEngineers] = useState([]);
  console.log("engineers===>", engineers)
  const [allProjects, setAllProjects] = useState([]);
  console.log("allProjects===>",allProjects)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const engineersData = await getEngineers();
        setEngineers(engineersData);

        const projectsData = await getProjects();
        setAllProjects(projectsData);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);
  return (
    <Paper sx={{ padding: 3, marginBottom: 3 }}>
      <Typography variant="h6">Create Assignment</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Engineer</InputLabel>
              <Select
                value={engineerId}
                onChange={(e) => setEngineerId(e.target.value)}
                label="Engineer"
                required
              >
                {engineers.length > 0 ? (
                  engineers.map((engineer) => (
                    <MenuItem key={engineer.id} value={engineer.id}>
                      {engineer.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No engineers available</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid item size={{ xs: 6, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Project</InputLabel>
              <Select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                label="Project"
                required
              >
                {allProjects.map((project) => (
                  <MenuItem key={project.id} value={project.id}>
                    {project.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item >
            <TextField
              label="Allocation Percentage"
              type="number"
              value={allocationPercentage}
              onChange={(e) => setAllocationPercentage(e.target.value)}
              fullWidth
              inputProps={{ min: 0, max: 100 }}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" type="submit" fullWidth>Create Assignment</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
