import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import CommentIcon from '@mui/icons-material/Comment';
import PostAddIcon from '@mui/icons-material/PostAdd';
import  { Link } from "react-router-dom"


export const mainListItems = (
    <React.Fragment>
      <ListItemButton component={Link} to='/posts'>
      <ListItemIcon>
        <PostAddIcon />
      </ListItemIcon>
      <ListItemText primary="Posts"/>
      </ListItemButton>
      <ListItemButton component={Link} to='/users/show'>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users"/>
    </ListItemButton>
    </React.Fragment>
);