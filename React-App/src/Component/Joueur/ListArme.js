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
function createData(idTypeArme, force) {
  id += 1;
  return { id, idTypeArme, force };
}

const lstArmes = [
  createData(1, 1),
  createData(2, 2),
  createData(1, 1),
  createData(2, 2),
  createData(1, 1),
];

class ListArme extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows : lstArmes,
      typeArmes : []
    };
  }
  
  componentDidMount() {
    this.getTypeArme();
  }

  GetIndexTypeArme(idType)
  {
    var i = 0;
    this.state.typeArmes.forEach((arme, index) => {
      if(arme.id === idType){
        i = index;
      }
    });
    return i;
  }


  Add(idType){
   var check = false;
   var i = this.GetIndexTypeArme(idType);
   var myTypeArme = this.state.typeArmes[i];
   check = this.props.SubsRessource(0,myTypeArme.eau, myTypeArme.argent, myTypeArme.science);
   
    if(check === true)
    {
      this.state.rows.push(createData(idType, myTypeArme.force));
    }else{
      this.props.OpenAlert("Alerte","Vous n'avez pas les fonds disponible pour obtenir cette arme !");
    }
  }
  
  Delete(id) {
    this.state.rows.forEach((arme, index) => {
      if(arme.id === id){
        var i = this.GetIndexTypeArme(arme.idTypeArme);
        console.log(i);
        var myTypeArme = this.state.typeArmes[i];
        this.props.AddRessource(0,myTypeArme.eau * 0.5,
          myTypeArme.argent * 0.5,
          myTypeArme.science * 0.5);
        this.state.rows.splice(index,1);
      }
    })
    ;
    
  }

  Edit = (event, id) => {
    var lstArmes = this.state.rows;
    lstArmes.forEach((arme, index) => {
      if(arme.id === id){
        arme[event.target.name] = event.target.value;
        lstArmes[index] = arme;
      }
    })
    this.setState({rows: lstArmes})
  };

  AfficheTypeArme(id) {
    var type = "";
    this.state.typeArmes.forEach((item, index) => {
      if(item.id === id){
        type = item.nom;
      }
    })
    return type;
  }
  getPlayerGuns()
  {
    fetch('http://localhost:8080/WebServices/webresources/Guns/GunPlayer?userName='+
    this.props.UserName)
    .then(result=> result.json());
  }

  getTypeArme()
  {
    this.getPlayerGuns();
    fetch('http://localhost:8080/WebServices/webresources/Guns/Type?')
    .then(result=> result.json()).then((result) => this.setState({typeArmes:result}));
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
        <Typography variant="h6" color="inherit">
            Gérer vos armes
        </Typography>
        <Table classarme={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Arme</TableCell>
              <TableCell numeric>Force</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map(row => {
              return (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{this.AfficheTypeArme(row.idTypeArme)}</TableCell>
                  <TableCell numeric>{row.force}</TableCell>
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
        {this.state.typeArmes.map(typeArme => {
         return(
          <Button
          variant="contained" 
          color="primary"
          onClick={() => this.Add(typeArme.id)}
          >
          Acheter {typeArme.nom}
        </Button>
         );
        })}
      </CardActions>
  </Card>
    );
  }
}

ListArme.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListArme);
