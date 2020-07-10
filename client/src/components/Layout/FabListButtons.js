import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: 'center',
  },
  fab: {
    margin: theme.spacing(1),
  },
  fabIcon: {
    marginRight: theme.spacing(1),
  },
}));

const FabListButtons = ({ buttonsToRender }) => {
  const classes = useStyles();
  //Solves Iphone 5 type layout issue
  const verySmallScreen = useMediaQuery('(min-width:370px)');
  return (
    <Grid className={classes.container} container>
      {buttonsToRender.map((button) => (
        <Grid key={button.text} xs={6} item>
          <Fab
            disabled={button.disabled}
            variant='extended'
            size='medium'
            color='primary'
            aria-label={button.ariaLabel}
            onClick={button.onClick}
            className={classes.fab}>
            {verySmallScreen ? (
              <span className={classes.fabIcon}>{button.icon}</span>
            ) : null}
            {button.text}
          </Fab>
        </Grid>
      ))}
    </Grid>
  );
};

FabListButtons.propTypes = {
  buttonsToRender: PropTypes.array.isRequired,
};

export default FabListButtons;
