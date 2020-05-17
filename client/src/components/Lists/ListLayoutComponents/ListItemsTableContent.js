import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  container: {
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
    background:
      'linear-gradient(to right, rgba(255,105,180,0.2), rgba(0,0,0,0.5))',
    boxShadow: '1px 1px 2px rgba(255,105,180,0.2)',
  },
  content: {
    padding: theme.spacing(1),
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden',
    // color: theme.palette.text.secondary,
    // whiteSpace: 'nowrap',
    // marginBottom: theme.spacing(1),
  },
  actionIcons: {
    display: 'flex',
    justifyContent: 'space-evenly',
    cursor: 'pointer',
  },
  gotByText: {
    color: theme.palette.primary.light,
  },
  successContainer: {
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
    background: 'linear-gradient(to right, rgba(0,255,0,0.2), rgba(0,0,0,0.5))',
    boxShadow: '1px 1px 2px rgba(255,105,180,0.2)',
    color: theme.palette.text.disabled,
  },
  successDetails: {
    padding: theme.spacing(1),
  },
  failContainer: {
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
    background:
      'linear-gradient(to right, rgba(255,255,0,0.2), rgba(0,0,0,0.5))',
    boxShadow: '1px 1px 2px rgba(255,105,180,0.2)',
    color: theme.palette.text.disabled,
  },
}));

const ListItemsTableContent = ({
  itemName,
  itemQuantity,
  itemActions,
  itemDialog,
}) => {
  const classes = useStyles();

  return (
    <>
      <Grid className={classes.container} container>
        <Grid item xs={4} className={classes.content}>
          <Typography variant="subtitle2">{itemName}</Typography>
        </Grid>
        <Grid className={classes.content} item xs={4}>
          <Typography variant="subtitle2"> {itemQuantity}</Typography>
        </Grid>
        <Grid className={classes.content} item xs={4}>
          <Typography className={classes.actionIcons} variant="subtitle2">
            {itemActions}
          </Typography>
        </Grid>
        {itemDialog}
      </Grid>
    </>
  );
};

{
  /* <Grid className={classes.successDetails} item xs={12}>
  //{' '}
  <Typography style={{ fontSize: '0.6rem' }} variant="caption">
    // Got by: {''}
    // <span className={classes.gotByText}>{item.success.name}</span>
    //{' '}
  </Typography>
  // <Divider light variant="middle" />
  //{' '}
  <Typography style={{ fontSize: '0.6rem' }} variant="caption">
    //{' '}
    <Moment format="MMMM Do YYYY, [at] HH:mm">
      // {item.success.dateGot}
      //{' '}
    </Moment>
    //{' '}
  </Typography>
  //{' '}
</Grid>; */
}

//           <Grid className={classes.successDetails} item xs={12}>
//             <Typography variant="subtitle2">
//               Problem:{' '}
//               <span style={{ color: 'red' }}>
//                 {item.fail.reason} {item.fail.optionalNote}
//               </span>
//             </Typography>
//             <Typography style={{ fontSize: '0.6rem' }} variant="caption">
//               By:{' '}
//               <span className={classes.gotByText}>{item.fail.name}</span>{' '}
//               <Moment format="MMMM Do YYYY, [at] HH:mm">
//                 {item.fail.failDate}
//               </Moment>
//             </Typography>
//           </Grid>

ListItemsTableContent.propTypes = {
  itemName: PropTypes.string.isRequired,
  itemQuantity: PropTypes.string,
  itemActions: PropTypes.node.isRequired,
  itemDialog: PropTypes.node,
};

export default ListItemsTableContent;
