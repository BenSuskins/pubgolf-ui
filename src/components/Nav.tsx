import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import InfoIcon from '@mui/icons-material/Info';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import Paper from '@mui/material/Paper';
import { Link, useLocation } from 'react-router-dom';
import TimerIcon from '@mui/icons-material/Timer';

export default function Nav() {
  const location = useLocation();

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>

      <BottomNavigation
        showLabels
        value={location.pathname}
      >
        <BottomNavigationAction component={Link} to="/" label="Scores" value="/" icon={<SportsBarIcon />} />
        <BottomNavigationAction component={Link} to="/info" label="Info" value="/info" icon={<InfoIcon />} />
        <BottomNavigationAction component={Link} to="/timer" label="Timer" value="/timer" icon={<TimerIcon />} />
      </BottomNavigation>
    </Paper>
  );
}