import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AlertDialog from '../Shared/AlertDialog';
import { Checkbox, Dialog, DialogTitle, Button, Typography, CardContent, Card, CardActions } from '@material-ui/core';

const styles = theme => ({

});

class ListSoldatAttaque extends Component {

  state = {
    rows : [],
    selected: [],
    openAlert: false,
    titreAlert: "Erreur",
    descriptionAlert: "Erreur",
  };

  componentDidMount() {
    this.getAll();
  }

  handleClickOpenAlert = (titre, description) => {
    this.setState({ openAlert: true, titreAlert : titre, descriptionAlert : description });
  };

  handleCloseAlert = () => {
    this.setState({ openAlert: false, selected : [] });
  };

  getAll()
  {
    var userName = this.props.UserName;
    fetch('http://10.2.0.116:8080/ClashTerritoireWS/webresources/Soldat/getSoldatPlayerSansTerritoire?userName=' + userName)
    .then(result=> result.json()).then((result) => 
      {
        this.setState({rows : result});
      });
  }

  handleClose = () => {
    this.getAll();
    this.props.onClose(this.props.territoireSelected);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  Confirmation(){
    if(this.state.selected.length  > 0){
      var userName = this.props.UserName;
      fetch('http://10.2.0.116:8080/ClashTerritoireWS/webresources/Territoire/Attaque?' +
      'idSoldats=' + this.state.selected + 
      '&idTerritoire=' + this.props.territoireSelected +
      '&userName=' + userName)
      .then(result=> result.json())
      .then((result) =>
        {
          var victoire = "Défaite"
          var description = "Vous avez perdu la bataille et tous vos attaquants sont morts..."
          if(result){
            victoire = "Victoire"
            description = "Aucun soldat a été tué et vous avez gagné le territoire. Félicitation !"
          } 
          this.handleClickOpenAlert(victoire, description)
          this.getAll();
          this.handleClose();
        }
      );
    }
    else{
      this.handleClickOpenAlert("Alerte", "Choisir un soldat pour l'attaque");
    }
  }

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;
  
  render() {
    const { classes, onClose, territoireSelected, ...other } = this.props;

    return (
      <div>
      <Dialog 
      onClose={this.handleClose} 
      aria-labelledby="simple-dialog-title" {...other}
      fullScreen
      >
          <DialogTitle id="simple-dialog-title">Attaque un territoire</DialogTitle>
              <div>
                  <Card>
                      <CardContent>
                      <Typography variant="h6" color="inherit">
                          Choisir les soldats à envoyer
                      </Typography>
                      <Table>
                      <TableHead>
                          <TableRow>
                              <TableCell></TableCell>
                              <TableCell>Soldat</TableCell>
                              <TableCell>Arme</TableCell>
                              <TableCell>Armure</TableCell>
                              <TableCell numeric>Force Totale</TableCell>
                              <TableCell numeric>Vie Totale</TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {this.state.rows.map(row => {
                          const isSelected = this.isSelected(row.id);
                          return (
                              <TableRow 
                              hover
                              onClick={event => this.handleClick(event, row.id)}
                              role="checkbox"
                              aria-checked={isSelected}
                              tabIndex={-1}
                              key={row.id}
                              selected={isSelected}
                              >
                                  <TableCell padding="checkbox">
                                      <Checkbox checked={isSelected} />
                                  </TableCell>
                                  <TableCell>{row.soldat}</TableCell>
                                  <TableCell>{row.arme}</TableCell>
                                  <TableCell>{row.armure}</TableCell>
                                  <TableCell numeric>{row.forceTotal}</TableCell>
                                  <TableCell numeric>{row.vieTotal}</TableCell>                  
                              </TableRow>
                          );
                          })}
                      </TableBody>
                      </Table>
                  </ CardContent>
                  <CardActions>
                      <Button
                      variant="contained" 
                      color="primary"
                      onClick={() => this.Confirmation()}
                      >
                          Confirmation de l'attaque
                      </Button>
                      <Button
                      variant="contained" 
                      color="secondary"
                      onClick={() => this.handleClose()}
                      >
                          Annuler
                      </Button>
                  </CardActions>
              </Card>
          </div>
        </Dialog>
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

ListSoldatAttaque.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    territoireSelected: PropTypes.number,
    UserName: PropTypes.string
  };

export default withStyles(styles)(ListSoldatAttaque);
