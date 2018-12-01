import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, Typography, CardContent, Card, CardActions } from '@material-ui/core';

const styles = theme => ({
  table: {
    minWidth: 700,
  },
});

class ListArmure extends Component {

  state = {
    rows : [],
    types : []
  };

  componentDidMount() {
    this.getType();
    this.getPlayerArmure();
  }

  getType()
  {
    fetch('http://localhost:8080/WebServices/webresources/Armure/Type')
    .then(result=> result.json()).then((result) => this.setState({types : result}));
  }

  getPlayerArmure()
  {
    fetch('http://localhost:8080/WebServices/webresources/Armure/ArmurePlayer?userName='+
    this.props.UserName)
    .then(result=> result.json()
    .then((result) => this.setState({rows : result})));
  }

  Add(item){
    var check = false;
    check = this.props.CheckCanBuy(item.nourriture,item.eau, item.argent, item.science);
    
     if(check === true)
     {
      fetch('http://localhost:8080/WebServices/webresources/Armure/AddArmure' + 
      '?userName='+ this.props.UserName + 
      '&idType=' + item.id)
      .then(result=> result.json()
      .then((result) => this.getPlayerArmure()));
      this.props.UpdateRessource();
     }else{
       this.props.OpenAlert("Alerte","Vous n'avez pas les fonds disponible pour obtenir cette armure !");
     }
   }
  
   Delete(id) {
    fetch('http://localhost:8080/WebServices/webresources/Armure/DeleteArmure?idArmure='+ id)
    .then(result=> result.json()
    .then((result) => this.getPlayerArmure()));
  }

  AfficheType(row) {
    var armureViewModel = {};
    armureViewModel.id = row.id;
    this.state.types.forEach((item, index) => {
      if(row.idType === item.id){
        armureViewModel = item;
      }
    })
    return armureViewModel;
  }
  
  render() {
    const { classes } = this.props;

    return (
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
                  onClick={() => this.Delete(itemViewModel.id)}
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
            onClick={() => this.Add(type)}
            >
            Acheter {type.nom}
          </Button>
          );
          })
        }
      </CardActions>
    </Card>
    );
  }
}

ListArmure.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListArmure);
