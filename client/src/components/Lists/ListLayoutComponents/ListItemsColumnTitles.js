import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  columnTitles: {
    textAlign: 'center',
    color: theme.palette.text.primary.light,
  },
  columnTitlesContainer: {
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
    color: theme.palette.text.primary.light,
    boxShadow: '1px 1px 2px rgba(255,105,180,0.2)',
  },
}));

const ListItemsColumnTitles = ({
  column1Title,
  column2Title,
  column3Title,
}) => {
  const classes = useStyles();
  return (
    <>
      <Grid className={classes.columnTitlesContainer} container>
        <Grid className={classes.columnTitles} item xs={4}>
          <Typography variant="subtitle2">{column1Title}</Typography>
        </Grid>
        <Grid className={classes.columnTitles} item xs={4}>
          <Typography variant="subtitle2">{column2Title}</Typography>
        </Grid>
        <Grid className={classes.columnTitles} item xs={4}>
          <Typography variant="subtitle2">{column3Title}</Typography>
        </Grid>
      </Grid>
    </>
  );
};

ListItemsColumnTitles.propTypes = {
  column1Title: PropTypes.string.isRequired,
  column2Title: PropTypes.string.isRequired,
  column3Title: PropTypes.string.isRequired,
};

export default ListItemsColumnTitles;
