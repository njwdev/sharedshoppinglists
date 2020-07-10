import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CustomDivider from './CustomDivider';
import sslBackground from '../../assets/background/backgroundNew.png';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'relative',
    margin: `${theme.spacing(2)}`,
    padding: theme.spacing(1),
    minHeight: '100vh',
    height: 'cover',
    width: '100%',
    //Used to allow background opacity
    '&::before': {
      content: "''",
      opacity: '0.3',
      position: 'absolute',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
      backgroundImage: `url(${sslBackground})`,
      backgroundRepeat: 'initial',
      backgroundSize: '75vh',
    },
  },
  container: {
    position: 'relative',
    padding: theme.spacing(1),
  },
  pageTitle: {
    position: 'relative',
    padding: theme.spacing(1, 1, 0),
  },
  footerText: {},
}));

const PageContainer = ({ children, pageTitle, footer }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h6'>
            <span className={classes.pageTitle}>{pageTitle}</span>
          </Typography>
          <CustomDivider />
        </Grid>

        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
          className={classes.container}>
          <Grid item xs={12} sm={8} md={6}>
            {children}
          </Grid>
          {footer ? (
            <Grid container>
              <Grid className={classes.footer} item xs={12}>
                <CustomDivider />
                <Typography className={classes.footerText} variant='caption'>
                  {footer}
                </Typography>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </Paper>
  );
};

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  pageTitle: PropTypes.string.isRequired,
  footer: PropTypes.string,
};

export default PageContainer;
