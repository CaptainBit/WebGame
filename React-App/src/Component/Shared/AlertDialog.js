import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog , DialogActions , DialogContent , DialogContentText , DialogTitle, Button, Typography} from '@material-ui/core';
import {SettingsInputAntenna, AttachMoney, LocalDrink, Restaurant} from '@material-ui/icons';

class AlertDialog extends Component {

  AffichageAlert(item){

    if((this.props.descriptionAlert === "Acheter" || this.props.descriptionAlert === "Vendre") && Object.keys(item).length > 0 ){
      var itemViewModel = {};
      Object.assign(itemViewModel, item);
      var texte = "";
      if(this.props.descriptionAlert === "Acheter"){
        texte = "Le coût de " + itemViewModel.nom + " sera de ";
      } else{
        texte = "La valeur de vente de " + itemViewModel.nom + " sera de ";
        itemViewModel.nourriture = itemViewModel.nourriture / 2;
        itemViewModel.argent = itemViewModel.argent / 2;
        itemViewModel.eau = itemViewModel.eau / 2;
        itemViewModel.science = itemViewModel.science / 2;
      }

      var Retour = 
        <div>
          {texte}
          <Typography style={{ marginTop: 10, flex: 1, display: 'flex', flexWrap: 'wrap'}} variant="h6" color="inherit" noWrap>
            <div style={{ marginLeft: 10}}>
              <Restaurant /> {itemViewModel.nourriture}    
            </div>
            <div style={{ marginLeft: 10}}>
              <LocalDrink /> {itemViewModel.eau}     
            </div>
            <div style={{ marginLeft: 10}}>
              <AttachMoney /> {itemViewModel.argent}     
            </div>
            <div style={{ marginLeft: 10}}>
              <SettingsInputAntenna /> {itemViewModel.science}
            </div>
          </Typography>

        </div>;

        return Retour;
    }

    return this.props.descriptionAlert;
  }

  render() {
    return (
        <Dialog
        open={this.props.openAlert}
        onClose={this.props.handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.props.titreAlert}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.AffichageAlert(this.props.itemAlert)}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleCloseAlert} color="primary">
              Annuler
            </Button>
            {
              this.props.descriptionAlert === "Acheter" ? 
                <Button onClick={() => this.props.Add(this.props.itemAlert)} color="primary">
                  Acheter
                </Button>
              :
              this.props.descriptionAlert === "Vendre" ? 
                <Button onClick={() => this.props.Delete(this.props.itemAlert)} color="primary">
                  Vendre
                </Button>
              :
              <Button onClick={this.props.handleCloseAlert} color="primary">
                D'accord
              </Button>
            }
            </DialogActions>
        </Dialog>
    );
  }
}

AlertDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (AlertDialog);
