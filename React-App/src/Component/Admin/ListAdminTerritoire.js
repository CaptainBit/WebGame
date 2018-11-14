import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, Typography, CardContent, Card, CardActionArea} from '@material-ui/core';

const styles = theme => ({
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(idTerritoire, joueur) {
  id += 1;
  return { id, idTerritoire, joueur };
}

const lstJoueur = [
  createData(1, "Moi", 1),
  createData(2, "Ennemie", 2),
];

const lstTerritoire = [
  {id : 1, description :"Château", idJoueur : 1},
  {id : 2, description : "Maison", idJoueur : 2}
]

class ListAdminTerritoire extends Component {

  state = {
    rows : lstTerritoire,

  };

  AfficheTerritoire(id) {
    var type = "";
    this.state.rows.forEach((item, index) => {
      if(item.id === id){
        type = item.description;
      }
    })
    return type;
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
                  <TableCell>Arme</TableCell>
                  <TableCell numeric>Joueur</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.rows.map(row => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{this.AfficheTerritoire(row.idTerritoire)}</TableCell>
                      <TableCell numeric>{row.Joueur}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ CardContent>
          <CardActionArea>
            <Button
              
            >
              Ajouter un territoire
            </Button>
          </CardActionArea>
        </Card>
      </div>
      
    );
  }
}

ListAdminTerritoire.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListAdminTerritoire);
