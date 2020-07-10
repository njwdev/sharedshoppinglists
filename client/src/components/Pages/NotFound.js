import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import PageContainer from '../Layout/PageContainer';

const NotFound = () => {
  return (
    <>
      <PageContainer pageTitle='Not Found'>
        <p>This page does not exist</p>
        <Link to='/'>
          <Button variant='text'>Home</Button>
        </Link>
      </PageContainer>
    </>
  );
};

export default NotFound;
