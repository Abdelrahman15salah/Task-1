import React, { useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';

const UserList = ({ users, selectedUser, onSelectUser, onAddUser, adding }) => {
  const [newUser, setNewUser] = useState('');

  const handleAddUser = () => {
    if (newUser.trim()) {
      onAddUser(newUser.trim());
      setNewUser('');
    }
  };

  return (
    <Box>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="user-select-label">User</InputLabel>
        <Select
          labelId="user-select-label"
          value={selectedUser || ''}
          label="User"
          onChange={e => onSelectUser(e.target.value)}
        >
          {users.map(user => (
            <MenuItem key={user._id || user.id} value={user._id || user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box display="flex" gap={1}>
        <TextField
          label="Add User"
          value={newUser}
          onChange={e => setNewUser(e.target.value)}
          size="small"
        />
        <Button variant="contained" onClick={handleAddUser} disabled={!newUser.trim() || adding}>
          {adding ? 'Adding...' : 'Add'}
        </Button>
      </Box>
    </Box>
  );
};

export default UserList; 