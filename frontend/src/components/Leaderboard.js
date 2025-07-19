import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  useTheme
} from '@mui/material';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import { useSpring, animated } from 'react-spring';

const medalIcons = [
  <LooksOneIcon sx={{ color: '#FFD700', fontSize: 32 }} />, // Gold
  <LooksTwoIcon sx={{ color: '#C0C0C0', fontSize: 28 }} />, // Silver
  <Looks3Icon sx={{ color: '#CD7F32', fontSize: 24 }} /> // Bronze
];

function stringAvatar(name) {
  return {
    children: name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?',
  };
}

const AnimatedNumber = ({ value }) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: value,
    config: { tension: 170, friction: 26 },
    reset: false,
  });
  return <animated.span>{number.to(n => Math.floor(n))}</animated.span>;
};

const Leaderboard = ({ users }) => {
  const theme = useTheme();
  const sortedUsers = [...users].sort((a, b) => b.totalPoints - a.totalPoints);
  const top3 = sortedUsers.slice(0, 3);
  const rest = sortedUsers.slice(3);

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #fffbe6 0%, #ffe0e0 100%)',
        borderRadius: 3,
        p: 2,
        boxShadow: 3,
        minHeight: 350,
      }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="end" sx={{ mb: 2 }}>
        {top3.map((user, idx) => (
          <Grid
            item
            xs={12} sm={4}
            key={user._id || user.id}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              zIndex: 2,
            }}
          >
            <Card
              sx={{
                minWidth: 120,
                maxWidth: 180,
                borderRadius: 4,
                boxShadow: idx === 0 ? 8 : 3,
                background: idx === 0 ? 'linear-gradient(135deg, #fffbe6 0%, #ffe066 100%)' : '#fff',
                transform: idx === 0 ? 'scale(1.1)' : 'scale(1)',
                mb: idx === 0 ? 2 : 0,
                position: 'relative',
                textAlign: 'center',
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                  <Avatar
                    {...stringAvatar(user.name)}
                    sx={{ width: 56, height: 56, fontSize: 28, bgcolor: theme.palette.primary.light, mx: 'auto', border: idx === 0 ? '3px solid #FFD700' : undefined }}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
                  {medalIcons[idx]}
                </Box>
                <Typography variant="subtitle1" fontWeight={700} noWrap>
                  {user.name}
                </Typography>
                <Typography variant="h6" color="primary.main" fontWeight={700}>
                  <AnimatedNumber value={user.totalPoints} />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Paper elevation={0} sx={{ mt: 2, background: 'transparent' }}>
        <List>
          {rest.map((user, idx) => (
            <ListItem key={user._id || user.id}>
              <ListItemAvatar>
                <Avatar {...stringAvatar(user.name)} sx={{ bgcolor: theme.palette.grey[300], color: theme.palette.text.primary }} />
              </ListItemAvatar>
              <ListItemText
                primary={<Typography fontWeight={600}>{`${idx + 4}. ${user.name}`}</Typography>}
                secondary={<Typography color="primary.main" fontWeight={700}><AnimatedNumber value={user.totalPoints} /></Typography>}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Leaderboard; 