import React from 'react';
import { List, ListItem, ListItemText, Paper, Fade } from '@mui/material';

const History = ({ history }) => {
  return (
    <Paper sx={{ 
      maxHeight: 200, 
      overflow: 'auto', 
      transition: 'all 0.3s ease-in-out', 
      '&:hover': { boxShadow: 6 },
      '& .MuiListItem-root': {
        transition: 'all 0.2s ease-in-out',
        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
      }
    }}>
      <List>
        {history.length === 0 ? (
          <ListItem>
            <ListItemText primary="No claim history yet." />
          </ListItem>
        ) : (
          <>
            <Fade in timeout={600} appear>
              <ListItem key={0}>
                <ListItemText
                  primary={`${history[0].userName} claimed ${history[0].points} points`}
                  secondary={new Date(history[0].date).toLocaleString()}
                />
              </ListItem>
            </Fade>
            {history.slice(1).map((item, idx) => (
              <ListItem key={idx + 1}>
                <ListItemText
                  primary={`${item.userName} claimed ${item.points} points`}
                  secondary={new Date(item.date).toLocaleString()}
                />
              </ListItem>
            ))}
          </>
        )}
      </List>
    </Paper>
  );
};

export default History; 