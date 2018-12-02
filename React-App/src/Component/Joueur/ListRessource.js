import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, Typography, CardContent, Card} from '@material-ui/core';

import ListSoldatAttaque from './ListSoldatAttaque';
import AlertDialog from '../Shared/AlertDialog';


const styles = theme => ({
  table: {
    minWidth: 700,
  },
});

class ListTerritoire extends Component {

  state = {
    rows : [],
    open: false,
    territoireSelected: 0,

    openAlert: false,
    titreAlert: "Erreur",
    descriptionAlert: "Erreur",
    itemAlert: {}
  };

  handleClickOpenAlert = (titre, description, item) => {
    this.setState({ openAlert: true, titreAlert : titre, descriptionAlert : description, itemAlert: item });
  };

  handleCloseAlert = () => {
    this.setState({ openAlert: false });
  };

  handleClickOpen(id) {
    this.setState({ territoireSelected: id, open: true });
  };

  handleClose = value => {
    this.setState({ territoireSelected: 0, open: false });
    this.getAll();
  };

  componentDidMount() {
    this.getAll();
  }

  getAll()
  {
    fetch('http://localhost:8080/WebServices/webresources/Territoire/All?')
    .then(result=> result.json()).then((result) => 
    {
      this.setState({rows : result});
    });
  }
  
  render() {
    const { classes } = this.props;

    return (
        <div>
          <Card className={classes.card}>
            <CardContent>
            <Typography variant="h6" color="inherit">
                Liste des territoires
            </Typography>
            <Table classsoldat={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>Territoire</TableCell>
                  <TableCell>Nourriture</TableCell>
                  <TableCell>Eau</TableCell>
                  <TableCell>Argent</TableCell>
                  <TableCell>Science</TableCell>
                  <TableCell numeric>Joueur</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.rows.map(row => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.nom}</TableCell>
                      <TableCell>{row.nourriture}</TableCell>
                      <TableCell>{row.eau}</TableCell>
                      <TableCell>{row.argent}</TableCell>
                      <TableCell>{row.science}</TableCell>
                      <TableCell numeric>{row.joueur}</TableCell>
                      <TableCell numeric>
                      {
                        row.joueur !== this.props.UserName ? 
                        <Button
                        variant="contained" 
                        color="primary"
                        onClick={() => this.handleClickOpen(row.id)}
                        >
                          Attaquer !!!
                        </Button>
                        : 
                        <div></div>
                      }
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ CardContent>
        </Card>
        <ListSoldatAttaque
        UserName={this.props.UserName}
        territoireSelected={this.state.territoireSelected}
        open={this.state.open}
        onClose={this.handleClose}
        >
        </ListSoldatAttaque>
        <AlertDialog
        openAlert={this.state.openAlert}
        titreAlert={this.state.titreAlert}
        descriptionAlert={this.state.descriptionAlert}
        handleCloseAlert={this.handleCloseAlert.bind(this)}
      >
      </AlertDialog>
      </div>
      
    );
  }
}

ListTerritoire.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListTerritoire);
