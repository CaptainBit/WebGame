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
  createData(0, 2),
  createData(1, 1),
  createData(0, 2),
  createData(1, 1),
];

const TypeArmes = [

];

class ListArme extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows : lstArmes,
      typeArmes : TypeArmes
    };
  }

  

  componentDidMount() {
    this.getTypeArme();
  }

  Add(idType){
    var lstArmes = this.state.rows;
    lstArmes.push(createData(idType, 1));
    this.setState({rows: lstArmes});
    this.props.SubsRessource(0,this.state.typeArmes[idType].eau, this.state.typeArmes[idType].argent, this.state.typeArmes[idType].science);
  }
  
  Delete(id) {
    var lstArmes = this.state.rows;

    

    lstArmes.forEach((soldat, index) => {
      if(soldat.id === id){
        lstArmes.splice(index,1);
      }
    })
    this.props.AddRessource(0,this.state.typeArmes[lstArmes[id].idTypeArme].eau * 0.5,
      this.state.typeArmes[lstArmes[lstArmes.id].idTypeArme].argent * 0.5,
       this.state.typeArmes[lstArmes[lstArmes.id].idTypeArme].science * 0.5);
       
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



  addTypeArme(result)
  {

    for(var i=0; i < result.length; i++) {
      var obj = { "idTypeArme": i, "description" : result[i].nom, "force" : result[i].force,
                  "eau" : result[i].eau, "argent" : result[i].argent, "science" : result[i].science }
      console.log(result[i].nom);
      this.setState({
        typeArmes:[...this.state.typeArmes, obj]
      });
    }
  }

  getTypeArme()
  {
    fetch('http://localhost:8080/WebServices/webresources/Guns/Type?')
    .then(result=> result.json()).then((result) => this.addTypeArme(result));
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
          onClick={() => this.Add(typeArme.idTypeArme)}
          >
          Acheter {typeArme.description}
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
