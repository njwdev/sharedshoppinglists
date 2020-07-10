import React from 'react';
import { Redirect } from 'react-router-dom';

const RedirectToNotFound = () => {
  //Solves issue of navbar being loaded on notfound https://stackoverflow.com/questions/57190892/how-to-not-display-navbar-on-specific-pages
  return <Redirect to='/notfound' />;
};

export default RedirectToNotFound;
