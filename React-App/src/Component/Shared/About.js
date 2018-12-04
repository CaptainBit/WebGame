import React, { Component } from 'react';
import { Paper,Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class About extends Component {
  
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h4" component="h4">
        Règles du jeu et conditions d'utilisation
        </Typography>
        <br />
        <Typography variant="h5" component="h5">
          Ce jeu a été développé par William Lafontaine et Isaac Fiset comme but éducatif et d'apprentissage avec le FrameWork React.
          
          Le but du jeu est simple, vous devez régner sur les autres joueurs en attaquant leurs territoires. Vous pouvez vous acheter
          des soldats et équiper vos soldats d'une armure et d'une arme pour augmenter vos chances de gagner une bataille. Vous devez
          vous servir judicieusement de vos ressources gagnés grâce à la possession d'un territoire. Bonne chance et amusez-vous bien!
        </Typography>
      </Paper>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);
