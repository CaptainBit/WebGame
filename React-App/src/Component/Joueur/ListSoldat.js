import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Select, MenuItem, FormControl, Button, Typography, CardContent, Card, CardActions } from '@material-ui/core';

const styles = theme => ({
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(idTypeSoldat, territoire, arme, armure, force, vie) {
  id += 1;
  return { id, idTypeSoldat, territoire, arme, armure, force, vie };
}

const lstSoldats = [
  createData(1, 1, 1,2,1,10,3),
  createData(2, 2, 2,1,2,4,10),
  createData(2, 2, 2,1,2,4,10),
  createData(2, 2, 2,1,2,4,10),
  createData(1, 1, 1,2,1,10,3),
];

const TypeSoldats = [
  {id : 1, description :"Archer"},
  {id : 2, description : "Guerrier"}
]

class ListSoldat extends Component {

  state = {
    rows : lstSoldats,
    typeSoldats : TypeSoldats
  };

  Add(idType){
    var lstSoldats = this.state.rows;
    lstSoldats.push(createData(idType,0,0,0,10,3));
    this.setState({rows: lstSoldats})
  }
  
  Delete(id) {
    var lstSoldats = this.state.rows;
    lstSoldats.forEach((soldat, index) => {
      if(soldat.id === id){
        lstSoldats.splice(index,1);
      }
    })
    this.setState({rows: lstSoldats})
  }

  Edit = (event, id) => {
    var lstSoldats = this.state.rows;
    lstSoldats.forEach((soldat, index) => {
      if(soldat.id === id){
        soldat[event.target.name] = event.target.value;
        lstSoldats[index] = soldat;
      }
    })
    this.setState({rows: lstSoldats})
  };

  AfficherTpyeSoldat(id) {
    var type = "";
    this.state.typeSoldats.forEach((item, index) => {
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
              return (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{this.AfficherTpyeSoldat(row.idTypeSoldat)}</TableCell>
                  <TableCell>
                  <FormControl>
                    <Select
                    value={row.territoire}
                    onChange={(event) => this.Edit(event, row.id)}
                    inputProps={{
                      name: "territoire",
                      id: row.id
                    }}
                    >
                      <MenuItem value={0}>
                        <em>Aucun</em>
                      </MenuItem>
                      <MenuItem value={1}>Maison</MenuItem>
                      <MenuItem value={2}>Château</MenuItem>
                    </Select>
                  </FormControl>
                  </TableCell>
                  <TableCell>
                    <FormControl>
                      <Select
                        value={row.arme}
                        onChange={(event) => this.Edit(event, row.id)}
                        inputProps={{
                          name: "arme",
                          id: row.id
                        }}
                      >
                        <MenuItem value={0}>
                          <em>Aucun</em>
                        </MenuItem>
                        <MenuItem value={1}>Épée</MenuItem>
                        <MenuItem value={2}>Arc</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <FormControl>
                      <Select
                        value={row.armure}
                        onChange={(event) => this.Edit(event, row.id)}
                        inputProps={{
                          name: "armure",
                          id: row.id
                        }}
                      >
                        <MenuItem value={0}>
                          <em>Aucun</em>
                        </MenuItem>
                        <MenuItem value={1}>Cap</MenuItem>
                        <MenuItem value={2}>Botte</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell numeric>{row.force}</TableCell>
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
          Acheter un Archer
        </Button>
        <Button
        variant="contained" 
        color="primary"
        onClick={() => this.Add(2)}
        >
          Acheter un Guerrier
        </Button>
      </CardActions>
    </Card>
    );
  }
}

ListSoldat.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListSoldat);
