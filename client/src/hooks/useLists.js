import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLists } from '../store/actions/listActions';

export const useLists = () => {
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
  return [lists, loading];
};

export const useNumberOfLists = () => {
  const [lists] = useLists();
  const activeListsNumber =
    lists && lists.filter((list) => !list.complete.complete).length;
  const pastListsNumber =
    lists && lists.filter((list) => list.complete.complete).length;
  return [activeListsNumber, pastListsNumber];
};
