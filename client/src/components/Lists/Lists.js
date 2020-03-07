import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import List from './List';
import axios from 'axios';
import CreateList from '../Lists/CreateList';
import { fetchList } from '../../store/actions/listActions';

const Lists = () => {
  const dispatch = useDispatch();
  const lists = useSelector(state => state.list.lists);
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(res =>
        dispatch({ type: actionTypes.FETCH_LIST, payload: res.data }),
      );
  }, [dispatch]);

  return (
    <Fragment>
      <h1>My Lists</h1>
      <CreateList></CreateList>
      {lists && lists.map(list => <List key={list.id} list={list}></List>)}
    </Fragment>
  );
};

export default Lists;
