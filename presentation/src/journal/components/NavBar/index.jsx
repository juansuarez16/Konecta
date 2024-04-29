import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { LoginOutlined, MenuOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../../store';

export const NavBar = ({ drawerWidth }) => {
  let windowSize = window.innerWidth;
  let sxConfig = {};

  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(startLogout());
  };

  windowSize > 415
    ? (sxConfig = {
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      })
    : (sxConfig = {
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        paddingLeft: drawerWidth / 8,
      });

  return (
    <AppBar position="fixed" sx={sxConfig}>
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuOutlined />
        </IconButton>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" noWrap component="div">
            Mi Diario
          </Typography>
          <IconButton onClick={onLogout} color="error">
            <LoginOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
