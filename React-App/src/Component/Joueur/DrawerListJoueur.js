import React, { Component } from 'react';

import {List, ListItemText, ListItemIcon, ListItem} from '@material-ui/core';

import { AccountCircle,RestaurantMenu, FlashOn, People, Security} from '@material-ui/icons';

import { Link } from 'react-router-dom';

class DrawerListJoueur extends Component {
  render() {
    return (
        <List>
          {/* <ListItem button component={Link} to="/Profil">
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Profil" />
          </ListItem> */}
          <ListItem button component={Link} to="/ListSoldat">
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Armée" />
          </ListItem>
          <ListItem button component={Link} to="/ListArme">
            <ListItemIcon>
              <FlashOn />
            </ListItemIcon>
            <ListItemText primary="Armes" />
          </ListItem>
          <ListItem button component={Link} to="/ListArmure">
            <ListItemIcon>
              <Security />
            </ListItemIcon>
            <ListItemText primary="Armures" />
          </ListItem>
          <ListItem button component={Link} to="/ListRessource">
            <ListItemIcon>
              <RestaurantMenu />
            </ListItemIcon>
            <ListItemText primary="Territoires" />
          </ListItem>
        </List>
    );
  }
}

export default DrawerListJoueur;