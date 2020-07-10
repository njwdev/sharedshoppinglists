import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  problemContainer: {
    marginLeft: theme.spacing(1),
  },
}));

const ListItemProblemInfo = ({ reason, optionalNote }) => {
  const classes = useStyles();
  return (
    <Grid className={classes.problemContainer} container>
      <Grid item xs={12}>
        <Typography variant='subtitle2'>
          Problem:{' '}
          <span>
            {reason} {optionalNote}
          </span>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ListItemProblemInfo;
