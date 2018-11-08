import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(soldat, territoire, arme, armure, force, vie) {
  id += 1;
  return { id, soldat, territoire, arme, armure, force, vie };
}

const rows = [
  createData("Archer", "Maison","Arc","Cap",10,3),
  createData("Guerrier", "Château","Épée","Botte",4,10),
  createData("Guerrier", "Château","Épée","Botte",4,10),
  createData("Guerrier", "Château","Épée","Botte",4,10),
  createData("Archer", "Maison","Arc","Cap",10,3),
];

class ListSoldat extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Paper classsoldat={classes.root}>
        <Table classsoldat={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Soldat</TableCell>
              <TableCell>Territoire</TableCell>
              <TableCell>Arme</TableCell>
              <TableCell>Armure</TableCell>
              <TableCell numeric>Force Totale</TableCell>
              <TableCell numeric>Vie Totale</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => {
              return (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.soldat}
                  </TableCell>
                  <TableCell>{row.territoire}</TableCell>
                  <TableCell>{row.arme}</TableCell>
                  <TableCell>{row.armure}</TableCell>
                  <TableCell numeric>{row.force}</TableCell>
                  <TableCell numeric>{row.vie}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

ListSoldat.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListSoldat);
