import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import restaurantConfig from './restaurantConfig.json';

import './App.css';
// import CssBaseline from '@mui/material/CssBaseline';
import {
  Typography,
  CssBaseline,
  Container,
  AppBar,
  Grid,
  Button,
  Toolbar,
  Link
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Routes from './routes/Routes';

const App = () => {
  console.debug('App');
  console.log(restaurantConfig);

  const theme = createTheme({});

  return (
    <div className="App">
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            style={{ margin: '10px' }}
            sx={{ flexGrow: 1 }}
            gutterBottom
          >
            Tapntable
          </Typography>
          <Link
            color="inherit"
            sx={{ mr: 2 }}
            component={RouterLink}
            to="/pin"
            underline="none"
          >
            Pin
          </Link>
          <Link
            color="inherit"
            sx={{ mr: 2 }}
            component={RouterLink}
            to="/"
            underline="none"
          >
            Home
          </Link>
          <Link
            color="inherit"
            sx={{ mr: 2 }}
            component={RouterLink}
            to="/servers"
            underline="none"
          >
            Servers
          </Link>
          <Link
            color="inherit"
            sx={{ mr: 2 }}
            component={RouterLink}
            to="/payments"
            underline="none"
          >
            Payments
          </Link>
          <Link
            color="inherit"
            sx={{ mr: 2 }}
            component={RouterLink}
            to="/cashout"
            underline="none"
          >
            Cash Out
          </Link>
          <Link
            color="inherit"
            sx={{ mr: 2 }}
            component={RouterLink}
            to="/kitchen"
            underline="none"
          >
            Kitchen Hot
          </Link>
          <Link
            color="inherit"
            sx={{ mr: 2 }}
            component={RouterLink}
            to="/kitchencold"
            underline="none"
          >
            Kitchen Cold
          </Link>
          <Link
            color="inherit"
            sx={{ mr: 2 }}
            component={RouterLink}
            to="/servicebar"
            underline="none"
          >
            Service Bar
          </Link>
          <Link
            color="inherit"
            component={RouterLink}
            to="/items"
            underline="none"
          >
            Items
          </Link>
        </Toolbar>
      </AppBar>

      <Routes />
    </div>
  );
};

export default App;
