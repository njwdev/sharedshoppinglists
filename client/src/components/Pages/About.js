import React from 'react';
import PageContainer from '../Layout/PageContainer';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  content: { margin: theme.spacing(6) },
}));

const About = () => {
  const classes = useStyles();
  return (
    <>
      <PageContainer
        pageTitle='About'
        footer='Created by NW - 2020 - nwwebd@gmail.com'>
        <>
          <Typography className={classes.content} variant='body1'>
            Shared Shopping Lists is a web app that helps you coordinate your
            shopping trips.
          </Typography>
        </>
      </PageContainer>
    </>
  );
};

export default About;
