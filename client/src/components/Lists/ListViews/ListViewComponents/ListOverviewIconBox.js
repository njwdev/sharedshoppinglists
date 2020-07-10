import React from 'react';
import PropTypes from 'prop-types';
//MUI Components
import Badge from '@material-ui/core/Badge';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
//MUI Icons
import ShoppingCartRounded from '@material-ui/icons/ShoppingCartRounded';
import ReportProblemRounded from '@material-ui/icons/ReportProblemRounded';
import DoneRounded from '@material-ui/icons/DoneRounded';

const useStyles = makeStyles((theme) => ({
  container: { width: '50%', margin: theme.spacing(2, 0, 0) },
  problemItems: { color: theme.palette.error.main },
  successItems: { color: theme.palette.success.main },
}));

const ListOverviewIconBox = ({
  itemsToGetBadgeContent,
  problemItemBadgeContent,
  itemsPurchasedBadgeContent,
}) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <Grid item xs={4}>
        <Badge badgeContent={itemsToGetBadgeContent}>
          <Icon>
            <ShoppingCartRounded />
          </Icon>
        </Badge>
      </Grid>
      <Grid item xs={4}>
        <Badge badgeContent={problemItemBadgeContent}>
          <Icon className={classes.problemItems}>
            <ReportProblemRounded />
          </Icon>
        </Badge>
      </Grid>
      <Grid item xs={4}>
        <Badge badgeContent={itemsPurchasedBadgeContent}>
          <Icon className={classes.successItems}>
            <DoneRounded />
          </Icon>
        </Badge>
      </Grid>
    </Grid>
  );
};

ListOverviewIconBox.propTypes = {
  itemsToGetBadgeContent: PropTypes.number.isRequired,
  problemItemBadgeContent: PropTypes.number.isRequired,
  itemsPurchasedBadgeContent: PropTypes.number.isRequired,
};

export default ListOverviewIconBox;
