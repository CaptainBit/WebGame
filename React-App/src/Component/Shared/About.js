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
        <Typography variant="h5" component="h3">
        Règles du jeu et conditions d'utilisation
        </Typography>
        <Typography component="p">
          Ce jeu a été développé par William Lafontaine et Isaac Fiset comme but éducatif et d'apprentissage avec le FrameWork React.
        </Typography>
      </Paper>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);
