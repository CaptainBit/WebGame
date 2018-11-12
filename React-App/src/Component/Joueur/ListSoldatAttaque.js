import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Checkbox, Dialog, DialogTitle, Button, Typography, CardContent, Card, CardActions } from '@material-ui/core';

const styles = theme => ({

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

const Territoires = [
    {id : 1, description :"Château"},
    {id : 2, description : "Maison"}
]

const TypeArmes = [
    {id : 1, description :"Épée"},
    {id : 2, description : "Arc"}
]

const TypeArmures = [
    {id : 1, description :"Botte"},
    {id : 2, description : "Cap"}
]

class ListSoldatAttaque extends Component {

  state = {
    rows : lstSoldats,
    typeSoldats : TypeSoldats,
    territoires : Territoires,
    typeArmes : TypeArmes,
    typeArmures : TypeArmures,
    selected: [],
  };

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  AfficherTypeSoldat(id) {
    var type = "";
    this.state.typeSoldats.forEach((item, index) => {
      if(item.id === id){
        type = item.description;
      }
    })
    return type;
  }

  AfficherTerritoires(id) {
    var type = "";
    this.state.territoires.forEach((item, index) => {
      if(item.id === id){
        type = item.description;
      }
    })
    return type;
  }

  AfficherTypeArmes(id) {
    var type = "";
    this.state.typeArmes.forEach((item, index) => {
      if(item.id === id){
        type = item.description;
      }
    })
    return type;
  }

  AfficherTypeArmures(id) {
    var type = "";
    this.state.typeArmures.forEach((item, index) => {
      if(item.id === id){
        type = item.description;
      }
    })
    return type;
  }

  Confirmation(){
    alert(this.state.selected);
    this.handleClose();
  }

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;
  
  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
    <Dialog 
    onClose={this.handleClose} 
    aria-labelledby="simple-dialog-title" {...other}
    fullScreen
    >
        <DialogTitle id="simple-dialog-title">Attaque un territoire</DialogTitle>
            <div>
                <Card>
                    <CardContent>
                    <Typography variant="h6" color="inherit">
                        Choisir les soldats à envoyer
                    </Typography>
                    <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>id</TableCell>
                            <TableCell>Soldat</TableCell>
                            <TableCell>Territoire</TableCell>
                            <TableCell>Arme</TableCell>
                            <TableCell>Armure</TableCell>
                            <TableCell numeric>Force Totale</TableCell>
                            <TableCell numeric>Vie Totale</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.rows.map(row => {
                        const isSelected = this.isSelected(row.id);
                        return (
                            <TableRow 
                            hover
                            onClick={event => this.handleClick(event, row.id)}
                            role="checkbox"
                            aria-checked={isSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isSelected}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox checked={isSelected} />
                                </TableCell>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{this.AfficherTypeSoldat(row.idTypeSoldat)}</TableCell>
                                <TableCell>{this.AfficherTerritoires(row.territoire)}</TableCell>
                                <TableCell>{this.AfficherTypeArmes(row.arme)}</TableCell>
                                <TableCell>{this.AfficherTypeArmures(row.armure)}</TableCell>
                                <TableCell numeric>{row.force}</TableCell>
                                <TableCell numeric>{row.vie}</TableCell>                  
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
                    onClick={() => this.Confirmation()}
                    >
                        Confirmation de l'attaque
                    </Button>
                    <Button
                    variant="contained" 
                    color="secondary"
                    onClick={() => this.handleClose()}
                    >
                        Annuler
                    </Button>
                </CardActions>
            </Card>
        </div>
      </Dialog>
    );
  }
}

ListSoldatAttaque.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
  };

export default withStyles(styles)(ListSoldatAttaque);
