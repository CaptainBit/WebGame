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

const styles = theme => ({
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(idTerritoire, Joueur) {
  id += 1;
  return { id, idTerritoire, Joueur };
}

const lstTerritoire = [
  createData(1, "Moi"),
  createData(2, "Ennemie"),
];

const Territoire = [
  {id : 1, description :"Château"},
  {id : 2, description : "Maison"}
]

class ListTerritoire extends Component {

  state = {
    rows : lstTerritoire,
    Territoire : Territoire,
    open: false,
    selectedValue: "Test",
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
  };


  AfficheTerritoire(id) {
    var type = "";
    this.state.Territoire.forEach((item, index) => {
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
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.rows.map(row => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{this.AfficheTerritoire(row.idTerritoire)}</TableCell>
                      <TableCell numeric>{row.Joueur}</TableCell>
                      <TableCell numeric>
                      <Button
                      variant="contained" 
                      color="primary"
                      onClick={this.handleClickOpen}
                      >
                        Attaquer !!!
                      </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ CardContent>
        </Card>
        <ListSoldatAttaque
        selectedValue={this.state.selectedValue}
        open={this.state.open}
        onClose={this.handleClose}
        >
        </ListSoldatAttaque>
      </div>
      
    );
  }
}

ListTerritoire.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListTerritoire);
