import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchList } from '../store/actions/listActions';

export const useList = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const list = useSelector((state) => state.list.list);
  useEffect(() => {
    const getList = async () => {
      await dispatch(fetchList(id));
      setLoading(false);
    };
    getList();
  }, [dispatch, id]);

  return [list, loading];
};

export const useSharedWith = (list, user) => {
  const sharedWith =
    list && list.listUsers.filter((u) => u.userId !== user._id);
  return [sharedWith];
};
