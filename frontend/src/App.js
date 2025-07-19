import React from 'react';
import { Container, Typography, Box, Paper, Grid, Fade, CircularProgress } from '@mui/material';
import './App.css';
import UserList from './components/UserList';
import ClaimButton from './components/ClaimButton';
import Leaderboard from './components/Leaderboard';
import History from './components/History';
import { getUsers, addUser, claimPoints, getClaimHistory } from './api';
import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const [claiming, setClaiming] = useState(false);
  const [adding, setAdding] = useState(false);
  const [lastClaimPoints, setLastClaimPoints] = useState(null);
  const socketRef = useRef(null);

  // Fetch users and history
  const fetchAll = async () => {
    try {
      const [usersData, historyData] = await Promise.all([
        getUsers(),
        getClaimHistory()
      ]);
      setUsers(usersData);
      setHistory(historyData);
    } catch (err) {
      setError(err.message || 'Error loading data');
    }
  };

  useEffect(() => {
    fetchAll();
    socketRef.current = io('http://localhost:3000');
    socketRef.current.on('leaderboardUpdate', () => {
      fetchAll();
    });
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
    // eslint-disable-next-line
  }, []);

  const handleSelectUser = (userId) => {
    setSelectedUser(userId);
    setLastClaimPoints(null);
  };

  const handleAddUser = async (name) => {
    setAdding(true);
    setError('');
    // Optimistically add user
    const tempId = Date.now().toString();
    setUsers((prev) => [...prev, { id: tempId, name, totalPoints: 0 }]);
    try {
      await addUser(name);
      // Let socket event update the real data
    } catch (err) {
      setError(err.message || 'Failed to add user');
      // Revert optimistic update
      setUsers((prev) => prev.filter((u) => u.id !== tempId));
    }
    setAdding(false);
  };

  const handleClaim = async (userId) => {
    setClaiming(true);
    setError('');
    // Optimistically update points
    setUsers((prev) => prev.map((u) =>
      u.id === userId || u._id === userId ? { ...u, totalPoints: (u.totalPoints || 0) + 1 } : u
    ));
    try {
      const res = await claimPoints(userId);
      setLastClaimPoints(res.points);
      // Let socket event update the real data
    } catch (err) {
      setError(err.message || 'Failed to claim points');
      // Revert optimistic update (refetch real data)
      fetchAll();
    }
    setClaiming(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, transition: 'box-shadow 0.3s', '&:hover': { boxShadow: 8 } }}>
        <Typography variant="h4" align="center" gutterBottom>
          User Points Claim & Leaderboard
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              {/* User List and Add User */}
              <Box mb={2}>
                <Typography variant="h6">Select User</Typography>
                <UserList
                  users={users}
                  selectedUser={selectedUser}
                  onSelectUser={handleSelectUser}
                  onAddUser={handleAddUser}
                  adding={adding}
                />
              </Box>
              {/* Claim Button */}
              <Box mb={2}>
                <ClaimButton
                  userId={selectedUser}
                  onClaim={handleClaim}
                  disabled={!selectedUser || claiming}
                />
                {claiming && <CircularProgress size={24} sx={{ ml: 2, verticalAlign: 'middle' }} />}
                <Fade in={lastClaimPoints !== null} timeout={{ enter: 500, exit: 500 }} unmountOnExit>
                  <Typography sx={{ mt: 1 }} color="primary">
                    You claimed {lastClaimPoints} points!
                  </Typography>
                </Fade>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Leaderboard */}
              <Typography variant="h6">Leaderboard</Typography>
              <Leaderboard users={users} />
            </Grid>
            <Grid item xs={12}>
              {/* History */}
              <Typography variant="h6">Claim History</Typography>
              <History history={history} />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default App;
