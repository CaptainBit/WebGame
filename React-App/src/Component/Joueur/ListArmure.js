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
function createData(idTypeArmure, vie) {
  id += 1;
  return { id, idTypeArmure, vie };
}

const lstArmures = [
  createData(1, 1),
  createData(2, 2),
  createData(1, 1),
  createData(2, 2),
  createData(1, 1),
];

const TypeArmures = [
  {id : 1, description :"Botte"},
  {id : 2, description : "Cap"}
]

class ListArmure extends Component {

  state = {
    rows : lstArmures,
    typeArmures : TypeArmures
  };

  Add(idType){
    var lstArmures = this.state.rows;
    lstArmures.push(createData(idType, 1));
    this.setState({rows: lstArmures})
  }
  
  Delete(id) {
    var lstArmures = this.state.rows;
    lstArmures.forEach((soldat, index) => {
      if(soldat.id === id){
        lstArmures.splice(index,1);
      }
    })
    this.setState({rows: lstArmures})
  }

  Edit = (event, id) => {
    var lstArmures = this.state.rows;
    lstArmures.forEach((soldat, index) => {
      if(soldat.id === id){
        soldat[event.target.name] = event.target.value;
        lstArmures[index] = soldat;
      }
    })
    this.setState({rows: lstArmures})
  };

  AfficheTypeArmure(id) {
    var type = "";
    this.state.typeArmures.forEach((item, index) => {
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
            Gérer vos armures
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
                  <TableCell>{this.AfficheTypeArmure(row.idTypeArmure)}</TableCell>
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
          Acheter des bottes
        </Button>
        <Button
        variant="contained" 
        color="primary"
        onClick={() => this.Add(2)}
        >
          Acheter une cap
        </Button>
      </CardActions>
    </Card>
    );
  }
}

ListArmure.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListArmure);
