import React, { Component } from 'react';

import {List, ListItemText, ListItemIcon, ListItem} from '@material-ui/core';

import { AccountCircle,RestaurantMenu, FlashOn, People, Security} from '@material-ui/icons';

import { Link } from 'react-router-dom';

class DrawerListAdmin extends Component {
  render() {
    return (
        <List>
          <ListItem button component={Link} to="/ListAdminJoueur">
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Gérer les utilisateurs" />
          </ListItem>
          <ListItem button component={Link} to="/ListAdminTypeSoldat">
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Gérer les soldats" />
          </ListItem>
          <ListItem button component={Link} to="/ListAdminTypeArme">
            <ListItemIcon>
              <FlashOn />
            </ListItemIcon>
            <ListItemText primary="Gérer les armes" />
          </ListItem>
          <ListItem button component={Link} to="/ListAdminTypeArmure">
            <ListItemIcon>
              <Security />
            </ListItemIcon>
            <ListItemText primary="Gérer les armures" />
          </ListItem>
          <ListItem button component={Link} to="/ListAdminTerritoire">
            <ListItemIcon>
              <RestaurantMenu />
            </ListItemIcon>
            <ListItemText primary="Gérer les territoires" />
          </ListItem>
        </List>
    );
  }
}

export default DrawerListAdmin;