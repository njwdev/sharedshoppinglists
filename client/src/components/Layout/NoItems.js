import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  noItemsContainer: {
    marginTop: theme.spacing(2),
  },
  noItemsText: {
    textAlign: 'center',
    color: theme.palette.text.disabled,
  },
  noListsText: {
    textAlign: 'left',
    color: theme.palette.text.disabled,
  },
}));

const NoItems = ({ noItemsText, noListsText }) => {
  const classes = useStyles();
  return (
    <Grid className={classes.noItemsContainer} container>
      <Grid item xs={12}>
        {noItemsText && (
          <Typography className={classes.noItemsText}>{noItemsText}</Typography>
        )}
        {noListsText && (
          <Typography className={classes.noListsText}>{noListsText}</Typography>
        )}
      </Grid>
    </Grid>
  );
};

NoItems.propTypes = {
  noItemsText: PropTypes.string,
  noListsText: PropTypes.string,
};

export default NoItems;
