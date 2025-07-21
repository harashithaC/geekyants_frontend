import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, FormControl, InputLabel, Select, MenuItem, Chip, Box } from '@mui/material';
import { createProject } from '../utils/api'; // API function to create a project

export default function ProjectForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [skills, setSkills] = useState([]);
  const [availableSkills] = useState(['React', 'Node.js', 'Python', 'JavaScript', 'Java', 'Go', 'Ruby']); // List of skills
  const handleSkillChange = (event) => {
    const { value } = event.target;
    setSkills(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = {
      name,
      description,
      start_date: startDate,
      end_date: endDate,
      required_skills: skills,
      manager_id: 4,
    };

    try {
      await createProject(projectData);
      alert('Project created successfully!');
    } catch (error) {
      alert('Error creating project');
    }
  };
  const today = new Date().toISOString().split("T")[0];
  console.log("today===>", today)
  const handleStartDateChange = (e) => {
    const selectedDate = e.target.value;

    if (selectedDate < today) {
      alert("Start date cannot be in the past.");
      return;
    }

    setStartDate(selectedDate);
  };
  const handleEndDateChange = (e) => {
    const selectedDate = e.target.value;

    if (selectedDate < today) {
      alert("End date cannot be in the past.");
      return;
    }
    setEndDate(selectedDate)
  };
  return (
    <Box sx={{ padding: 3, marginBottom: 3 }}>
      <Typography variant="h6">Create New Project</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Project Name"
              variant="outlined"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          {/* <Grid item xs={12} md={6}>
            <TextField
              label="Status Of Project"
              variant="outlined"
              fullWidth
              required
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </Grid> */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Start Date"
              type="date"
              variant="outlined"
              fullWidth
              required
              value={startDate}
              // onChange={(e) => setStartDate(e.target.value)}
              onChange={handleStartDateChange}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                min: today,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="End Date"
              type="date"
              variant="outlined"
              fullWidth
              required
              value={endDate}
              // onChange={(e) => setEndDate(e.target.value)}
              onChange={handleEndDateChange}
              InputLabelProps={{
                shrink: true,
              }}
               InputProps={{
                min: today,
              }}
            />
          </Grid>
          <Grid size={{ xs: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Required Skills</InputLabel>
              <Select
                multiple
                value={skills}
                onChange={handleSkillChange}
                renderValue={(selected) => selected.join(', ')}
              >
                {availableSkills.map((skill) => (
                  <MenuItem key={skill} value={skill}>
                    <Chip label={skill} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Create Project
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
