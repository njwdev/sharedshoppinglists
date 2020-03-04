import React, { useContext, useEffect, Fragment } from 'react';
import Contact from './Contact';
import { ContactsStore } from '../../context';
import AddContact from './AddContact';
import axios from 'axios';

const Contacts = () => {
  const contactList = useContext(ContactsStore);
  const { dispatch } = contactList;
  const { contacts } = contactList.state;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      );
      dispatch({ type: 'FETCH_CONTACTS', payload: result.data });
    };

    fetchData();
  }, [dispatch]);

  console.log(contactList.state.contacts);

  return (
    <Fragment>
      <AddContact />
      {contacts &&
        contacts.map(contact => (
          <Contact key={contact.id} contact={contact}></Contact>
        ))}
    </Fragment>
  );
};

export default Contacts;
