import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, Typography, CardContent, Card } from '@material-ui/core';

const styles = theme => ({
  table: {
    minWidth: 700,
  },
});

class ListJoueur extends Component {

  state = {
    rows : [],
  };

  componentDidMount() {
    this.getAll();
  }

  getAll()
  {
    fetch('http://localhost:8080/WebServices/webresources/Player/GetAllPlayers?')
    .then(result=> result.json()).then((result) => 
    {
      var tempRow = this.state.rows;
      for(var i =0; i < result.length; i++){
        tempRow.push(result[i]);
      }
      this.setState({rows : tempRow});
    });
  }


  

  Edit(item){
    fetch('http://localhost:8080/WebServices/webresources/Player/GetAllPlayers?' + 
    'id=' + item.id +
    '&nom=' + item.nom + 
    '&nourriture=' + item.nourriture +
    '&eau=' + item.eau + 
    '&argent=' + item.argent + 
    '&science=' + item.science + 
    "&force=" + item.force)
    .then(result=> result.json()).then((result) => 
    {
      var message = "Échec";
      if(result === true){
        message = "Modification avec succès";
        this.getAll();
      } 
      this.handleClickOpenAlert("Alerte",message);
    });
  }


  Delete(id) {
    var lstJoueur = this.state.rows;
    lstJoueur.forEach((Joueur, index) => {
      if(Joueur.id === id){
        lstJoueur.splice(index,1);
      }
    })
    this.setState({rows: lstJoueur})
  }
  
  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
        <Typography variant="h6" color="inherit">
            Gérer les joueurs
        </Typography>
        <Table classJoueur={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>UserName</TableCell>
              <TableCell>password</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map(row => {
              return (
                <TableRow>
                  <TableCell>{row.idJoueur}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>{row.userName}</TableCell>
                  <TableCell>{row.password}</TableCell>
                  <TableCell numeric>
                    <Button
                    variant="contained" 
                    color="secondary"
                    onClick={() => this.Delete(row.idJoueur)}
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </ CardContent>
    </Card>
    );
  }
}

ListJoueur.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListJoueur);
