import React from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  Paper, 
  Fade, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip,
  Avatar,
  useTheme
} from '@mui/material';
import { 
  EmojiEvents as TrophyIcon,
  TrendingUp as PointsIcon,
  Person as UserIcon
} from '@mui/icons-material';

const History = ({ history }) => {
  const theme = useTheme();

  const getRandomColor = (name) => {
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      '#FF6B6B',
      '#4ECDC4',
      '#45B7D1',
      '#96CEB4',
      '#FFEAA7',
      '#DDA0DD',
      '#98D8C8',
      '#F7DC6F'
    ];
    return colors[name.length % colors.length];
  };

  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      borderRadius: 3,
      p: 2,
      boxShadow: 3,
      minHeight: 300
    }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.palette.text.primary }}>
        🏆 Claim History
      </Typography>
      
      {history.length === 0 ? (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          height: 200,
          color: theme.palette.text.secondary
        }}>
          <TrophyIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
          <Typography variant="body1">No claim history yet.</Typography>
          <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
            Start claiming points to see your history here!
          </Typography>
        </Box>
      ) : (
        <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
          {history.map((item, idx) => (
            <Fade in timeout={600 + (idx * 100)} key={idx}>
              <Card 
                sx={{ 
                  mb: 2, 
                  borderRadius: 2,
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': { 
                    transform: 'translateY(-2px)',
                    boxShadow: 6,
                    background: 'rgba(255, 255, 255, 0.95)'
                  }
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: getRandomColor(item.userName),
                          width: 40,
                          height: 40,
                          fontSize: 16
                        }}
                      >
                        <UserIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {item.userName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(item.date).toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PointsIcon sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                      <Chip 
                        label={`+${item.points} points`}
                        color="primary"
                        variant="filled"
                        size="small"
                        sx={{ 
                          fontWeight: 600,
                          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
                        }}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default History; 