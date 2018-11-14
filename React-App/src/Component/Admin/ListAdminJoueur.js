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

let id = 0;
function createData(nom) {
  id += 1;
  return { id, nom };
}

const lstJoueur = [
  createData(1, "Paul"),
  createData(2, "Jean"),
  createData(2, "Robin"),
  createData(2, "Thomas"),
  createData(1, "Louis"),
];

class ListJoueur extends Component {

  state = {
    rows : lstJoueur,
  };
  
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
              <TableCell>Joueur</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map(row => {
              return (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.nom}</TableCell>
                  <TableCell numeric>
                    <Button
                    variant="contained" 
                    color="secondary"
                    onClick={() => this.Delete(row.id)}
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
