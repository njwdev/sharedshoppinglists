import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import List from './List';
import axios from 'axios';
import CreateList from '../Lists/CreateList';
import { fetchLists } from '../../store/actions/listActions';
import Typography from '@material-ui/core/Typography';
import Spinner from '../Layout/Spinner';
// import { fetchList } from '../../store/actions/listActions';

const Lists = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const lists = useSelector((state) => state.list.lists);
  useEffect(() => {
    const getLists = async () => {
      await dispatch(fetchLists());
    };
    getLists();
    setLoading(false);
  }, [dispatch]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <Typography variant="h3">My Lists</Typography>
      <CreateList></CreateList>
      {lists &&
        lists.map((list) => <List key={list.dateCreated} list={list}></List>)}
    </>
  );
};

export default Lists;
