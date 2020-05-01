import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    background: 'rgba(66,66,66,0.25)',
  },
  container: {
    padding: theme.spacing(2, 2),
  },
}));

const PageHeader = (props) => {
  const classes = useStyles();

  const { title, pageDescription } = props;
  return (
    <>
      <Grid
        className={classes.container}
        container
        direction="row"
        justify="space-between"
      >
        {title ? <Typography variant="h4">{title}</Typography> : null}
        {/* {link ? <BackButton link={link} /> : null} */}
      </Grid>
      <Typography variant="caption" style={{ marginBottom: '5px' }}>
        {pageDescription}
      </Typography>
    </>
  );
};

export default PageHeader;
