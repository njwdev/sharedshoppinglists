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
    marginTop: theme.spacing(2),
    color: theme.palette.text.primary.light,
  },
}));

const ListItemsColumnTitles = ({
  column1Title,
  column2Title,
  column3Title,
  completedList,
}) => {
  let columnTitles = [column1Title, column2Title, column3Title];
  completedList && columnTitles.pop();
  const classes = useStyles();
  return (
    <>
      <Grid className={classes.columnTitlesContainer} container>
        {columnTitles.map((title) => (
          <Grid
            key={title}
            className={classes.columnTitles}
            item
            xs={completedList ? 6 : 4}>
            <Typography variant='subtitle2'>{title}</Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

ListItemsColumnTitles.propTypes = {
  column1Title: PropTypes.string.isRequired,
  column2Title: PropTypes.string.isRequired,
  column3Title: PropTypes.string.isRequired,
  completedList: PropTypes.bool,
};

export default ListItemsColumnTitles;
