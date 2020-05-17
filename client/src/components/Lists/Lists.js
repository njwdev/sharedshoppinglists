import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import List from './List';
import CreateList from '../Lists/CreateList';
import { fetchLists } from '../../store/actions/listActions';
import Typography from '@material-ui/core/Typography';
import Spinner from '../Layout/Spinner';

const Lists = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const lists = useSelector((state) => state.list.lists);

  useEffect(() => {
    const getLists = async () => {
      await dispatch(fetchLists());
      setLoading(false);
    };
    getLists();
  }, [dispatch]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <Typography variant="h3">Active Lists</Typography>
      <CreateList />
      {lists && lists.map((list) => <List key={list._id} list={list}></List>)}
    </>
  );
};

export default Lists;
