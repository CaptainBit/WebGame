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

let id = 0;
function createData(idTypeArme, vie) {
  id += 1;
  return { id, idTypeArme, vie };
}

const lstArmes = [
  createData(1, 1),
  createData(2, 2),
  createData(1, 1),
  createData(2, 2),
  createData(1, 1),
];

const TypeArmes = [
  {id : 1, description :"Épée"},
  {id : 2, description : "Arc"}
]

class ListArme extends Component {

  state = {
    rows : lstArmes,
    typeArmes : TypeArmes
  };

  Add(idType){
    var lstArmes = this.state.rows;
    lstArmes.push(createData(idType, 1));
    this.setState({rows: lstArmes})
  }
  
  Delete(id) {
    var lstArmes = this.state.rows;
    lstArmes.forEach((soldat, index) => {
      if(soldat.id === id){
        lstArmes.splice(index,1);
      }
    })
    this.setState({rows: lstArmes})
  }

  Edit = (event, id) => {
    var lstArmes = this.state.rows;
    lstArmes.forEach((soldat, index) => {
      if(soldat.id === id){
        soldat[event.target.name] = event.target.value;
        lstArmes[index] = soldat;
      }
    })
    this.setState({rows: lstArmes})
  };

  AfficheTypeArme(id) {
    var type = "";
    this.state.typeArmes.forEach((item, index) => {
      if(item.id === id){
        type = item.description;
      }
    })
    return type;
  }
  
  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
        <Typography variant="h6" color="inherit">
            Gérer vos armes
        </Typography>
        <Table classsoldat={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Arme</TableCell>
              <TableCell numeric>Vie</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map(row => {
              return (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{this.AfficheTypeArme(row.idTypeArme)}</TableCell>
                  <TableCell numeric>{row.vie}</TableCell>
                  <TableCell numeric>
                  <Button
                  variant="contained" 
                  color="secondary"
                  onClick={() => this.Delete(row.id)}
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
        <Button
        variant="contained" 
        color="primary"
        onClick={() => this.Add(1)}
        >
          Acheter une Épée
        </Button>
        <Button
        variant="contained" 
        color="primary"
        onClick={() => this.Add(2)}
        >
          Acheter un Arc
        </Button>
      </CardActions>
    </Card>
    );
  }
}

ListArme.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListArme);
