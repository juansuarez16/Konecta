import { Box, Toolbar } from '@mui/material';
import { NavBar, SideBar } from '../../components';

export const JournalLayout = ({ children }) => {
  let drawerWidth = 0;
  let sxConfig = {};

  window.innerWidth > 415
    ? ((drawerWidth = 320),
      (sxConfig = {
        flexGrow: 1,
        p: 3,
      }))
    : ((drawerWidth = window.innerWidth / 3.5),
      (sxConfig = {
        flexGrow: 1,
        p: 3,
        paddingLeft: drawerWidth / 6,
      }));
      
  return (
    <Box
      className="animate__animated animate__fadeIn animate__faster"
      sx={{ display: 'flex' }}
    >
      <NavBar drawerWidth={drawerWidth} />
      <SideBar drawerWidth={drawerWidth} />
      <Box component="main" sx={sxConfig}>
        <Toolbar></Toolbar>
        {children}
      </Box>
    </Box>
  );
};
