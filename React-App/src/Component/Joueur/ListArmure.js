import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AlertDialog from '../Shared/AlertDialog';
import { Button, Typography, CardContent, Card, CardActions } from '@material-ui/core';

const styles = theme => ({
  table: {
    minWidth: 700,
  },
});

class ListArmure extends Component {

  state = {
    rows : [],
    types : [],
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

  Refresh(){
    this.getPlayerArmure();
  }

  componentDidMount() {
    this.getType();
    this.Refresh();
  }

  getType()
  {
    fetch('http://localhost:8080/WebServices/webresources/Armure/Type')
    .then(result=> result.json()).then((result) => this.setState({types : result}));
  }

  getPlayerArmure()
  {
    fetch('http://localhost:8080/WebServices/webresources/Armure/getArmurePlayer?userName='+
    this.props.UserName)
    .then(result=> result.json()
    .then((result) => 
    {
      this.setState({rows : result});
    }));
  }

  Add(type){
    var check = false;
    check = this.props.CheckCanBuy(type.nourriture,type.eau, type.argent, type.science);
    
     if(check === true)
     {
      fetch('http://localhost:8080/WebServices/webresources/Armure/AddArmure' + 
      '?userName='+ this.props.UserName + 
      '&idType=' + type.id)
      .then(() => {
        this.Refresh();
        this.props.UpdateRessource();
      });
     }else{
       this.handleClickOpenAlert("Alerte","Vous n'avez pas les fonds disponible pour obtenir cette armure !");
     }
   }
  
   Delete(itemViewModel) {
    fetch('http://localhost:8080/WebServices/webresources/Armure/DeleteArmure?' +
    'idArmure='+ itemViewModel.id +
    '&idType=' + itemViewModel.idType +
    '&userName=' + this.props.UserName)
    .then(() => {
      this.Refresh();
      this.props.UpdateRessource();
    });
  }

  AfficheType(row) {
    var armureViewModel = {};
    this.state.types.forEach((item, index) => {
      if(row.idType === item.id){
         Object.assign(armureViewModel, item);
      }
    })

    armureViewModel.id = row.id;
    armureViewModel.idType = row.idType;

    return armureViewModel;
  }
  
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
          <Typography variant="h6" color="inherit">
              Gérer vos armures
          </Typography>
          <Table classsoldat={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>Armure</TableCell>
                <TableCell numeric>Vie</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rows.map((row) => {
                var itemViewModel = this.AfficheType(row);
                return (
                  <TableRow key={itemViewModel.id}>
                    <TableCell>{itemViewModel.id}</TableCell>
                    <TableCell>{itemViewModel.nom}</TableCell>
                    <TableCell numeric>{itemViewModel.vie}</TableCell>
                    <TableCell numeric>
                    <Button
                    variant="contained" 
                    color="secondary"
                    onClick={() => this.handleClickOpenAlert("Vendre une armure", "Vendre", itemViewModel)}
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
            this.state.types.map(type => {
            return(
              <Button
              variant="contained" 
              color="primary"
              onClick={() => this.handleClickOpenAlert("Acheter une armure", "Acheter", type)}
              >
              Acheter {type.nom}
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

ListArmure.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListArmure);
