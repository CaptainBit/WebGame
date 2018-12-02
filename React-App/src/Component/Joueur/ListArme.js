import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AlertDialog from '../Shared/AlertDialog';
import { Button, Typography, CardContent, Card, CardActions } from '@material-ui/core';

const styles = theme => ({
  table: {
    minWidth: 700,
  },
});

let id = 0;

function createData(idTypeArme, force) {
  id += 1;
  return { id, idTypeArme, force};
}

class ListArme extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows : [],
      typeArmes : [],
      openAlert: false,
      titreAlert: "Erreur",
      descriptionAlert: "Erreur",
      itemAlert: {}
    };
  }

  handleClickOpenAlert = (titre, description, item) => {
    this.setState({ openAlert: true, titreAlert : titre, descriptionAlert : description, itemAlert: item });
  };

  handleCloseAlert = () => {
    this.setState({ openAlert: false });
  };
  
  componentDidMount() {
    this.getTypeArme();
    this.getPlayerGuns();
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
   check = this.props.CheckCanBuy(myTypeArme.nourriture,myTypeArme.eau, myTypeArme.argent, myTypeArme.science);
   
    if(check === true)
    {
      this.state.rows.push(createData(idType, myTypeArme.force));
    }else{
      this.handleClickOpenAlert("Alerte","Vous n'avez pas les fonds disponible pour obtenir cette arme !");
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
    this.setState({rows: lstArmes});
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

  FillGunsPlayer(result){
    var myList = [];
    for(var i = 0; i < result.length; i++){
      for(var j = 0; j < result[i].nombre; j++ )
      {
        myList.push(createData(result[i].type, this.state.typeArmes[result[i].type].force));
      }
    }
    this.setState({row : myList})  
  }

  getPlayerGuns(){
    fetch('http://localhost:8080/WebServices/webresources/Guns/GunPlayer?userName='+
    this.props.UserName)
    .then(result=> result.json()).then(result=> this.FillGunsPlayer(result));
  }

  getTypeArme()
  {
    fetch('http://localhost:8080/WebServices/webresources/Guns/Type?')
    .then(result=> result.json()).then((result) => this.setState({typeArmes:result}));
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
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
    <AlertDialog
      openAlert={this.state.openAlert}
      titreAlert={this.state.titreAlert}
      descriptionAlert={this.state.descriptionAlert}
      itemAlert={this.state.itemAlert}
      handleCloseAlert={this.handleCloseAlert.bind(this)}
      Add={this.Add.bind(this)}
      Delete={this.Delete.bind(this)}
    >
    </AlertDialog>
  </div>
    );
  }
}

ListArme.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListArme);
