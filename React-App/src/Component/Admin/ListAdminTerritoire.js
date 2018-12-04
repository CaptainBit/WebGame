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


class ListAdminTerritoire extends Component {

  state = {
    rows : []

  };

  getAll()
  {
    fetch('http://localhost:8080/WebServices/webresources/Territoire/All?')
    .then(result=> result.json()).then((result) => 
    {
      this.setState({rows : result});
    });
  }
  
  AddNewTerritory()
  {
    //Send last row

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
