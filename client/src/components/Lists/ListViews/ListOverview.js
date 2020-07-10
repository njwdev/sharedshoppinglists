import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteList,
  completeList,
  reactivateList,
} from '../../../store/actions/listActions';
import ListOverviewIconBox from './ListViewComponents/ListOverviewIconBox';
import { useListItemsData } from '../../../hooks/useListItems';
import ListCard from './ListViewComponents/ListCard';
import SharedWith from './ListViewComponents/SharedWith';
import ListCreated from './ListViewComponents/ListCreated';
import ListTitle from './ListViewComponents/ListTitle';
import ListActions from './ListViewComponents/ListActions';

const ListOverview = ({ list }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.user);
  const { _id, title } = list;
  const [
    itemsToGetData,
    problemItemsData,
    successfulItemsData,
  ] = useListItemsData(list);

  const completedList = list && list.complete && list.complete.complete;

  const handleCompleteList = (id) => {
    dispatch(completeList(id, history));
  };

  const handleDeleteList = (id) => {
    dispatch(deleteList(id, history));
  };

  const handleReactivateList = (id) => {
    dispatch(reactivateList(id, history));
  };

  return (
    <ListCard
      isOverview={true}
      id={_id}
      completedList={completedList}
      listTitle={<ListTitle editable={false} listTitle={title} />}
      topOfListActionButtons={null}
      topOfListSharedWith={null}
      middleOfListCardContent={
        <ListOverviewIconBox
          itemsToGetBadgeContent={itemsToGetData && itemsToGetData.length}
          problemItemBadgeContent={problemItemsData && problemItemsData.length}
          itemsPurchasedBadgeContent={
            successfulItemsData && successfulItemsData.length
          }
        />
      }
      bottomOfListInfo={[
        <SharedWith user={user} list={list} />,
        <ListCreated list={list} />,
      ]}
      bottomOfListActionButtons={
        <ListActions
          list={list}
          deleteListButton={true}
          reactivateListButton={completedList}
          completeListButton={!completedList}
          handleDeleteList={(id) => handleDeleteList(_id)}
          handleCompleteList={(id) => handleCompleteList(_id)}
          handleReactivateList={(id) => handleReactivateList(_id)}
        />
      }
    />
  );
};

ListOverview.propTypes = {
  list: PropTypes.object.isRequired,
};

export default ListOverview;
