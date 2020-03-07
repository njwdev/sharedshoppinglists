import React, { createContext, useReducer } from 'react';

export const ContactsStore = createContext();

const initialState = {
  contacts: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_CONTACTS':
      return {
        contacts: action.payload,
        ...state.contacts,
      };
    case 'DELETE_CONTACT':
      return {
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload,
        ),
      };
    case 'ADD_CONTACT':
      return {
        contacts: [action.payload, ...state.contacts],
      };

    case 'UPDATE_CONTACT':
      return {
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id
            ? (contact = action.payload)
            : contact,
        ),
      };
    default:
      return state;
  }
};

export const ContactsProvider = ({ children }) => {
  const { Provider } = ContactsStore;

  console.log(initialState);

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
