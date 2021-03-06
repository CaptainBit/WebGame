import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, Typography, CardContent, Card, TextField} from '@material-ui/core';

import AlertDialog from '../Shared/AlertDialog';


const styles = theme => ({
  table: {
    minWidth: 700,
  },
});

class ListAdminTypeArmure extends Component {

  state = {
    rows : [],

    openAlert: false,
    titreAlert: "Erreur",
    descriptionAlert: "Erreur",
    itemAlert: {}
  };

  handleClickOpenAlert = (titre, description, item) => {
    this.setState({ openAlert: true, titreAlert : titre, descriptionAlert : description, itemAlert: item });
  };

  handleCloseAlert = () => {
    this.setState({ openAlert: false });
  };

  componentDidMount() {
    this.getAll();
  }

  handleChange(event, parameter) {
    event.persist();
    var lst = this.state.rows;
    lst.forEach((row, index) => {
      if(row.id === parseInt(event.target.id)){
        row[parameter] = event.target.value;
        lst[index] = row;
      }
    })

    this.setState({rows : lst});
  }

  getAll()
  {
    fetch('http://localhost:8080/WebServices/webresources/Armure/Type?')
    .then(result=> result.json()).then((result) => 
    {
      result.push({id:0,nom:"",nourriture:"",eau:"",argent:"",science:"", vie:""})
      this.setState({rows : result});
    });
  }

  Edit(item){
    fetch('http://localhost:8080/WebServices/webresources/Armure/EditTypeArmure?' + 
    'id=' + item.id +
    '&nom=' + item.nom + 
    '&nourriture=' + item.nourriture +
    '&eau=' + item.eau + 
    '&argent=' + item.argent + 
    '&science=' + item.science + 
    "&vie=" + item.vie)
    .then(result=> result.json()).then((result) => 
    {
      var message = "Échec";
      if(result === true){
        message = "Modification avec succès";
        this.getAll();
      } 
      this.handleClickOpenAlert("Alerte",message);
    });
  }

  Delete(id){
    fetch('http://localhost:8080/WebServices/webresources/Armure/DeleteTypeArmure?' + 
    'id=' + id)
    .then(result=> result.json()).then((result) => 
    {
      var message = "Échec";
      if(result === true){
        message = "Suppression avec succès";
        this.getAll();
      } 
      this.handleClickOpenAlert("Alerte",message);
    });
  }

  Add(item){
    fetch('http://localhost:8080/WebServices/webresources/Armure/AddTypeArmure?' + 
    'nom=' + item.nom + 
    '&nourriture=' + item.nourriture +
    '&eau=' + item.eau + 
    '&argent=' + item.argent + 
    '&science=' + item.science + 
    '&vie=' + item.vie)
    .then(result=> result.json()).then((result) => 
    {
      var message = "Échec";
      if(result === true){
        message = "Ajout avec succès";
        this.getAll();
      } 
      this.handleClickOpenAlert("Alerte",message);
    });
  }

  
  render() {
    const { classes } = this.props;

    return (
        <div>
          <Card className={classes.card}>
            <CardContent>
            <Typography variant="h6" color="inherit">
                Liste des types d'armures
            </Typography>
            <Table classsoldat={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>Armure type</TableCell>
                  <TableCell>Nourriture</TableCell>
                  <TableCell>Eau</TableCell>
                  <TableCell>Argent</TableCell>
                  <TableCell>Science</TableCell>
                  <TableCell numeric>Vie</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.rows.map(row => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell>
                        {row.id}
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={row.nom}
                          type="text"
                          margin="normal"
                          id={row.id}
                          onChange={(event) => this.handleChange(event, "nom")}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="text"
                          value={row.nourriture}
                          id={row.id}
                          onChange={(event) => this.handleChange(event, "nourriture")}
                          margin="normal"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="text"
                          value={row.eau}
                          id={row.id}
                          onChange={(event) => this.handleChange(event, "eau")}
                          margin="normal"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="text"
                          value={row.argent}
                          id={row.id}
                          onChange={(event) => this.handleChange(event, "argent")}
                          margin="normal"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="text"
                          value={row.science}
                          id={row.id}
                          onChange={(event) => this.handleChange(event, "science")}
                          margin="normal"
                        />
                      </TableCell>
                      <TableCell numeric>
                        <TextField
                          type="text"
                          value={row.vie}
                          id={row.id}
                          onChange={(event) => this.handleChange(event, "vie")}
                          margin="normal"
                        />
                      </TableCell>
                      <TableCell numeric>
                      {
                        row.id !== 0 ? 
                        <Typography style={{ display: 'flex'}}>
                          <Button
                          variant="contained" 
                          color="primary"
                          onClick={() => this.Edit(row)}
                          >
                            Modifier
                          </Button>
                          <Button 
                          style={{ marginLeft: 10}}
                          variant="contained" 
                          color="primary"
                          onClick={() => this.Delete(row.id)}
                          >
                            Supprimer
                          </Button>
                        </Typography>
                        :
                          <Button
                          variant="contained" 
                          color="primary"
                          onClick={() => this.Add(row)}
                          >
                            Ajouter
                          </Button>
                      }
                        
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ CardContent>
        </Card>
        <AlertDialog
        openAlert={this.state.openAlert}
        titreAlert={this.state.titreAlert}
        descriptionAlert={this.state.descriptionAlert}
        handleCloseAlert={this.handleCloseAlert.bind(this)}
      >
      </AlertDialog>
      </div>
      
    );
  }
}

ListAdminTypeArmure.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListAdminTypeArmure);
