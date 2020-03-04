import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { IoIosClose } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import { MdExpandMore } from 'react-icons/md';
import { ContactsStore } from '../../context';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    margin: '1.66%',
    border: '1px solid rgba(128,0,128,0.1)',
    boxShadow: '3px 3px 10px rgba(0,0,0,0.4)',
  },
  downIcon: {
    height: '100%',
    margin: '0 1%',
    cursor: 'pointer',
  },
  actionIcons: {
    float: 'right',
  },
  icon: {
    margin: '0 1rem',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.87)',
  },
});

const Contact = ({ contact }) => {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const contactsList = useContext(ContactsStore);
  const { dispatch } = contactsList;
  const setShowContactHandler = () => {
    setShowContactInfo(!showContactInfo);
  };
  const classes = useStyles();
  const { name, email, phone, id } = contact;

  const handleClick = () => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    dispatch({ type: 'DELETE_CONTACT', payload: id });
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <h3>
          {name}
          <MdExpandMore
            className={classes.downIcon}
            onClick={setShowContactHandler}
          />
          <div className={classes.actionIcons}>
            <Link to={`/editcontact/${id}`}>
              <MdEdit className={classes.icon}></MdEdit>
            </Link>
            <span></span>
            <IoIosClose
              className={classes.icon}
              alt="delete user"
              onClick={() => handleClick()}
            />
          </div>
        </h3>
        {showContactInfo ? (
          <ul>
            <li>{email}</li>
            <li>{phone}</li>
            <li>{id}</li>
          </ul>
        ) : null}
      </CardContent>
      {showContactInfo ? (
        <CardActions>
          <p> Something here</p>
        </CardActions>
      ) : null}
    </Card>
  );
};

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default Contact;
