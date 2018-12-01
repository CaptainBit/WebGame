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

class ListSoldat extends Component {

  state = {
    rows : [],
    typeSoldat : [],
    typeArme : [],
    typeArmure : [],
    lstTerritoire: []
  };

  Add(idType){
    
  }
  
  Delete(id) {
  }

  Edit = (event, id) => {
  };

  AfficheRow(){
    
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
