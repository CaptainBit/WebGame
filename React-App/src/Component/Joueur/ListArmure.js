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
    .then(result=> result.json()).then((result) => this.setState({types:result}));
  }

  getPlayerArmure()
  {
    fetch('http://localhost:8080/WebServices/webresources/Armure/ArmurePlayer?userName='+
    this.props.UserName)
    .then(result=> result.json()
    .then((result) => this.setState({rows : result})));
  }

  GetIndexTypeArmure(idType)
  {
    var i = 0;
    this.state.types.forEach((type, index) => {
      if(type.id === idType){
        i = index;
      }
    });
    return i;
  }

  Add(item){
    var check = false;
    check = this.props.SubsRessource(0,item.eau, item.argent, item.science);
    
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
    this.state.rows.forEach((armure, index) => {
      if(armure.id === id){
        var i = this.GetIndexTypeArme(armure.idTypeArmure);
        var mytypeArmures = this.state.types[i];
        this.props.AddRessource(0,mytypeArmures.eau * 0.5,
          mytypeArmures.argent * 0.5,
          mytypeArmures.science * 0.5);
          fetch('http://localhost:8080/WebServices/webresources/Armure/DeleteArmure?idArmure='+
          id)
          .then(result=> result.json()
          .then((result) => this.getPlayerArmure()));
      }
    })
    ;
    
  }

  Edit = (event, id) => {
    var lstArmure = this.state.rows;
    lstArmure.forEach((arme, index) => {
      if(arme.id === id){
        arme[event.target.name] = event.target.value;
        lstArmure[index] = arme;
      }
    })
    this.setState({rows: lstArmure})
  };

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
              var item = this.AfficheType(row);
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.nom}</TableCell>
                  <TableCell numeric>{item.vie}</TableCell>
                  <TableCell numeric>
                  <Button
                  variant="contained" 
                  color="secondary"
                  onClick={() => this.Delete(item.id)}
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
