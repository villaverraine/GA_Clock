import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, IconButton, InputAdornment} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const EditEmployeeModal = ({ open, onClose, employee, onSave }) => {
  const [username, setUsername] = useState(employee ? employee.username : '');
  const [firstName, setFirstName] = useState(employee ? employee.firstName : '');
  const [lastName, setLastName] = useState(employee ? employee.lastName : '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSave = () => {
    onSave({ ...employee, username, firstName, lastName, password });
    setShowPassword(false);
    onClose();
  };
  
  const handleCancel = () => {
    setUsername(employee ? employee.username : '');
    setUsername(employee ? employee.firstName : '');
    setUsername(employee ? employee.lastName : '');
    setPassword(employee ? employee.password : '');
    setShowPassword(false);
    onClose();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  

  return (
    <Modal open={open} onClose={handleCancel}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Edit Profile
        </Typography>

        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="outlined" color="secondary" onClick={handleCancel} sx={{ mr: 2 }}>
            Cancel
          </Button>

          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>

      </Box>
    </Modal>
  );
};

export default EditEmployeeModal;
