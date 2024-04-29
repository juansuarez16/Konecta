import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { TurnedInNot } from '@mui/icons-material';
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { setActiveNote } from '../../../store/journal';

let windowSize = window.innerWidth;

export const SideBarItem = ({ title = '', body, id, date, imageUrl = [] }) => {
  const dispatch = useDispatch();
  const onClickNote = () => {
    dispatch(
      setActiveNote({
        title,
        body,
        id,
        date,
        imageUrl,
      })
    );
  };

  const newTitle = useMemo(() => {
    return title.length > 17 ? `${title.substring(0, 17)}...` : title;
  }, [title]);

  let item = () => {
    return windowSize <= 420 ? (
      <ListItemButton onClick={onClickNote}>
        <Grid container>
          <ListItemText primary={`* ${newTitle}`} />
        </Grid>
      </ListItemButton>
    ) : (
      <ListItemButton onClick={onClickNote}>
          <ListItemIcon>
            <TurnedInNot />
          </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    );
  };

  return (
    <ListItem disablePadding>
      {item()}
    </ListItem>
  );
};
