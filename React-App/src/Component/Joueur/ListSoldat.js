import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Select, MenuItem, FormControl, Button, Typography, CardContent, Card, CardActions } from '@material-ui/core';

import AlertDialog from '../Shared/AlertDialog';

const styles = theme => ({
  table: {
    minWidth: 700,
  },
});

class ListSoldat extends Component {

  state = {
    rows : [],
    lstTypeSoldat : [],
    lstTypeArme : [],
    lstTypeArmure : [],

    lstTerritoire: [],
    lstArmePlayer : [],
    lstArmurePlayer : [],

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
  
  componentDidMount() {
    this.getTypeSoldat();
    this.getTypeArme();
    this.getTypeArmure();

    this.Refresh();
  }

  Refresh(){
    this.getPlayerTerritoire();
    this.getPlayerArmure();
    this.getPlayerArme();
    this.getPlayerSoldat();
  }


  getTypeSoldat()
  {
    fetch('http://localhost:8080/WebServices/webresources/Soldat/Type')
    .then(result=> result.json()).then((result) => this.setState({lstTypeSoldat : result}));
  }

  getTypeArme()
  {
    fetch('http://localhost:8080/WebServices/webresources/Arme/Type')
    .then(result=> result.json()).then((result) => this.setState({lstTypeArme : result}));
  }

  getTypeArmure()
  {
    fetch('http://localhost:8080/WebServices/webresources/Armure/Type')
    .then(result=> result.json()).then((result) => this.setState({lstTypeArmure : result}));
  }

  getPlayerTerritoire()
  {
    fetch('http://localhost:8080/WebServices/webresources/Territoire/getPlayerTerritoire')
    .then(result=> result.json()).then((result) => this.setState({lstTerritoire : result}));
  }

  getPlayerArme()
  {
    fetch('http://localhost:8080/WebServices/webresources/Arme/getAllGuns')
    .then(result=> result.json()).then((result) => this.setState({lstArmePlayer : result}));
  }

  getPlayerArmure()
  {
    fetch('http://localhost:8080/WebServices/webresources/Armure/getArmurePlayer')
    .then(result=> result.json()).then((result) => this.setState({lstArmurePlayer : result}));
  }

  getPlayerSoldat()
  {
    fetch('http://localhost:8080/WebServices/webresources/Soldat/getSoldatPlayer')
    .then(result=> result.json()).then((result) => this.setState({rows : result}));
  }

  Add(typeSoldat){
    var check = false;
    check = this.props.CheckCanBuy(typeSoldat.nourriture,typeSoldat.eau, typeSoldat.argent, typeSoldat.science);
    
     if(check === true)
     {
      fetch('http://localhost:8080/WebServices/webresources/Soldat/AddSoldat' + 
      '?userName='+ this.props.UserName + 
      '&idType=' + typeSoldat.id)
      .then(() => {
        this.Refresh();
        this.props.UpdateRessource();
      });
     }else{
       this.handleClickOpenAlert("Alerte","Vous n'avez pas les fonds disponible pour obtenir cette armure !");
     }
   }

   Edit(itemViewModel){
    fetch('http://localhost:8080/WebServices/webresources/Soldat/EditSoldat?' +
    'idArmure='+ itemViewModel.id +
    '&idType=' + itemViewModel.idType +
    '&userName=' + this.props.UserName)
    .then(() => {
      this.Refresh();
      this.props.UpdateRessource();
    });
   }
  
   Delete(itemViewModel) {
    fetch('http://localhost:8080/WebServices/webresources/Soldat/DeleteSoldat?' +
    'idArmure='+ itemViewModel.id +
    '&idType=' + itemViewModel.idType +
    '&userName=' + this.props.UserName)
    .then(() => {
      this.Refresh();
      this.props.UpdateRessource();
    });
  }

  AfficheRow(){
    
  }
  
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
          <Typography variant="h6" color="inherit">
              Gérer vos soldats
          </Typography>
          <Table classsoldat={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>Soldat</TableCell>
                <TableCell>Territoire</TableCell>
                <TableCell>Arme</TableCell>
                <TableCell>Armure</TableCell>
                <TableCell numeric>Force Totale</TableCell>
                <TableCell numeric>Vie Totale</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rows.map(row => {
                var itemViewModel = this.AfficheRow(row);
                return (
                  <TableRow key={itemViewModel.id}>
                    <TableCell>{itemViewModel.id}</TableCell>
                    <TableCell>{this.AfficherTpyeSoldat(itemViewModel.idTypeSoldat)}</TableCell>
                    <TableCell>
                    <FormControl>
                      <Select
                      value={itemViewModel.territoire}
                      onChange={(event) => this.Edit(event, itemViewModel.id)}
                      inputProps={{
                        name: "territoire",
                        id: itemViewModel.id
                      }}
                      >
                        <MenuItem value={0}>
                          <em>Aucun</em>
                        </MenuItem>
                        {this.state.lstTerritoire.map(territoire => {
                          return (
                          <MenuItem value={territoire.id}>{territoire.description}</MenuItem>
                          )})
                        }
                      </Select>
                    </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControl>
                        <Select
                          value={itemViewModel.arme}
                          onChange={(event) => this.Edit(event, itemViewModel.id)}
                          inputProps={{
                            name: "arme",
                            id: itemViewModel.id
                          }}
                        >
                          <MenuItem value={0}>
                            <em>Aucun</em>
                          </MenuItem>
                          <MenuItem value={0}>
                          <em>Aucun</em>
                          </MenuItem>
                          {this.state.lstTypeArme.map(typeArme => {
                            return (
                            <MenuItem value={typeArme.id}>{typeArme.description}</MenuItem>
                            )})
                          }
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControl>
                        <Select
                          value={itemViewModel.armure}
                          onChange={(event) => this.Edit(event, itemViewModel.id)}
                          inputProps={{
                            name: "armure",
                            id: itemViewModel.id
                          }}
                        >
                          <MenuItem value={0}>
                            <em>Aucun</em>
                          </MenuItem>
                          {this.state.lstArmure.map(typeArmure => {
                            return (
                            <MenuItem value={typeArmure.id}>{typeArmure.description}</MenuItem>
                            )})
                          }
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell numeric>{itemViewModel.Totalforce}</TableCell>
                    <TableCell numeric>{itemViewModel.Totalvie}</TableCell>
                    <TableCell numeric>
                    <Button
                    variant="contained" 
                    color="secondary"
                    onClick={() => this.Delete(itemViewModel)}
                    >
                      Vendre
                    </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </ CardContent>
        <CardActions>
          {
            this.state.lstTypeSoldat.map(typeSoldat => {
            return(
              <Button
              variant="contained" 
              color="primary"
              onClick={() => this.handleClickOpenAlert("Acheter un soldat", "Acheter", typeSoldat)}
              >
              Acheter {typeSoldat.description}
            </Button>
            );
            })
          }
        </CardActions>
      </Card>
      <AlertDialog
        openAlert={this.state.openAlert}
        titreAlert={this.state.titreAlert}
        descriptionAlert={this.state.descriptionAlert}
        itemAlert={this.state.itemAlert}
        handleCloseAlert={this.handleCloseAlert.bind(this)}
        Add={this.Add.bind(this)}
        Delete={this.Delete.bind(this)}
      >
      </AlertDialog>
    </div>
    );
  }
}

ListSoldat.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListSoldat);
