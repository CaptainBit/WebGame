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
    console.log(item);
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
    fetch('http://localhost:8080/WebServices/webresources/Guns/Type')
    .then(result=> result.json()).then((result) => this.setState({lstTypeArme : result}));
  }

  getTypeArmure()
  {
    fetch('http://localhost:8080/WebServices/webresources/Armure/Type')
    .then(result=> result.json()).then((result) => this.setState({lstTypeArmure : result}));
  }

  getPlayerTerritoire()
  {
    fetch('http://localhost:8080/WebServices/webresources/Territoire/getTerritoirePlayer' + 
    '?userName=' + this.props.UserName)
    .then(result=> result.json()).then((result) => this.setState({lstTerritoire : result}));
  }

  getPlayerArme()
  {
    fetch('http://localhost:8080/WebServices/webresources/Guns/GunPlayer' + 
    '?userName=' + this.props.UserName)
    .then(result=> result.json()).then((result) => this.setState({lstArmePlayer : result}));
  }

  getPlayerArmure()
  {
    fetch('http://localhost:8080/WebServices/webresources/Armure/getArmurePlayer' + 
    '?userName=' + this.props.UserName)
    .then(result=> result.json()).then((result) => this.setState({lstArmurePlayer : result}));
  }

  getPlayerSoldat()
  {
    fetch('http://localhost:8080/WebServices/webresources/Soldat/getSoldatPlayer' + 
    '?userName=' + this.props.UserName)
    .then(result=> result.json()).then((result) => this.setState({rows : result}));
  }

  Add(typeSoldat){
    console.log(typeSoldat);
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

   Edit(event, itemViewModel){
     console.log(itemViewModel);
     console.log(event.target.value);
    // fetch('http://localhost:8080/WebServices/webresources/Soldat/EditSoldat?' +
    // 'idArmure='+ itemViewModel.id +
    // '&idType=' + itemViewModel.idType +
    // '&userName=' + this.props.UserName)
    // .then(() => {
    //   this.Refresh();
    //   this.props.UpdateRessource();
    // });
   }
  
   Delete(itemViewModel) {
    console.log(itemViewModel);
    fetch('http://localhost:8080/WebServices/webresources/Soldat/DeleteSoldat?' +
    'idArmure='+ itemViewModel.id +
    '&idType=' + itemViewModel.idType +
    '&userName=' + this.props.UserName)
    .then(() => {
      this.Refresh();
      this.props.UpdateRessource();
    });
  }

  AfficheRow(row){
    var itemViewModel = {};
    Object.assign(itemViewModel, row);

    itemViewModel.vie = 0;
    itemViewModel.force = 0;

    this.state.lstTypeSoldat.forEach((typeSoldat, index) => {
      if(row.idTypeSoldat === typeSoldat.id){
        itemViewModel.nom = typeSoldat.nom;
        itemViewModel.force += typeSoldat.force;
        itemViewModel.vie += typeSoldat.vie;

        itemViewModel.nourriture = typeSoldat.nourriture;
        itemViewModel.argent = typeSoldat.argent;
        itemViewModel.eau = typeSoldat.eau;
        itemViewModel.science = typeSoldat.science;

      }
    })
    
    this.state.lstArmePlayer.forEach((armeSoldat, index) => {
      if(row.idArme === armeSoldat.id){
        this.state.lstTypeArme.forEach((typeArme, index) => {
          if(armeSoldat.idType === typeArme.id){
            itemViewModel.force += typeArme.force;
          }
        })
      }
    })

    this.state.lstArmurePlayer.forEach((armureSoldat, index) => {
      if(row.idArmure === armureSoldat.id){
        this.state.lstTypeArmure.forEach((typeArmure, index) => {
          if(armureSoldat.idType === typeArmure.id){
            itemViewModel.vie += typeArmure.vie;
          }
        })
      }
    })

    return itemViewModel;
  }

  AfficheNomTypeArme(idType){
    var Retour = "Introuvable";
    this.state.lstTypeArme.forEach((typeArme, index) => {
      if(typeArme.id === idType){
        Retour = typeArme.nom;
      }
    })
    return Retour;
  }

  AfficheNomTypeArmure(idType){
    var Retour = "Introuvable";
    this.state.lstTypeArmure.forEach((typeArmure, index) => {
      if(typeArmure.id === idType){
        Retour = typeArmure.nom;
      }
    })
    return Retour;
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
                    <TableCell>{itemViewModel.nom}</TableCell>
                    <TableCell>
                    <FormControl>
                      <Select
                      value={itemViewModel.idTerritoire}
                      onChange={(event) => this.Edit(event, itemViewModel)}
                      inputProps={{
                        name: "idTerritoire",
                        id: itemViewModel.id
                      }}
                      >
                        <MenuItem value={0}>
                          <em>Aucun</em>
                        </MenuItem>
                        {this.state.lstTerritoire.map(territoire => {
                          return (
                          <MenuItem value={territoire.id}>{territoire.nom}</MenuItem>
                          )})
                        }
                      </Select>
                    </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControl>
                        <Select
                          value={itemViewModel.idArme}
                          onChange={(event) => this.Edit(event, itemViewModel)}
                          inputProps={{
                            name: "idArme",
                            id: itemViewModel.id
                          }}
                        >
                          <MenuItem value={0}>
                            <em>Aucun</em>
                          </MenuItem>
                          {this.state.lstArmePlayer.map(armePlayer => {
                              return (
                                <MenuItem value={armePlayer.id}>{this.AfficheNomTypeArme(armePlayer.idType)}</MenuItem>
                                )
                              }
                          )}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControl>
                        <Select
                          value={itemViewModel.idArmure}
                          onChange={(event) => this.Edit(event, itemViewModel)}
                          inputProps={{
                            name: "idArmure",
                            id: itemViewModel.id
                          }}
                        >
                          <MenuItem value={0}>
                            <em>Aucun</em>
                          </MenuItem>
                          {this.state.lstArmurePlayer.map(armurePlayer => {
                              return (
                                <MenuItem value={armurePlayer.id}>{this.AfficheNomTypeArmure(armurePlayer.idType)}</MenuItem>
                                )
                              }
                          )}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell numeric>{itemViewModel.force}</TableCell>
                    <TableCell numeric>{itemViewModel.vie}</TableCell>
                    <TableCell numeric>
                    <Button
                    variant="contained" 
                    color="secondary"
                    onClick={() => this.handleClickOpenAlert("Vendre un soldat", "Vendre", itemViewModel)}
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
              Acheter {typeSoldat.nom}
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
