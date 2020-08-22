import React, { useState } from 'react';
import {
  deleteList,
  completeList,
  reactivateList,
  fetchList,
} from '../../../store/actions/listActions';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../Layout/Spinner';
import PageContainer from '../../Layout/PageContainer';
import AddItem from '../ListItems/ListItemsComponents/AddItem';
import ListItems from '../ListItems/ListItems';
import { useHistory, useParams } from 'react-router-dom';
import { useList } from '../../../hooks/useList';
import ListActions from './ListViewComponents/ListActions';
import CompletedListMessage from './ListViewComponents/CompletedListMessage';
import ListCard from './ListViewComponents/ListCard';
import ListTitle from './ListViewComponents/ListTitle';
import SharedWith from './ListViewComponents/SharedWith';
import DetailedActiveListHelp from '../../Help/DetailedActiveList/DetailedActiveList';
import DetailedPastListHelp from '../../Help/DetailedPastList/DetailedPastList';

const DetailedListView = () => {
  const history = useHistory();
  const { id } = useParams();
  //This controls the edit title input open state, because the button to open it (in List Actions) and the l
  // List title (in List Title) are in distinct children components
  const [editOpen, setEditOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [list, loading] = useList();
  //Determine whether list is completed
  const completedList = list && list.complete && list.complete.complete;

  //Refreshes list by fetching list again to check if updates have been made
  const refreshListHandler = () => {
    dispatch(fetchList(id, true));
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const helpDialogOpenHandler = () => {
    setDialogOpen(true);
  };
  const helpDialogCloseHandler = () => {
    setDialogOpen(false);
  };

  const handleDeleteList = (id) => {
    dispatch(deleteList(id, history));
  };

  const handleCompleteList = (id) => {
    dispatch(completeList(id, history));
  };

  const handleReactivateList = (id) => {
    dispatch(reactivateList(id, history));
  };

  return loading || !list ? (
    <Spinner />
  ) : (
    <PageContainer pageTitle='List' helpDialog={() => helpDialogOpenHandler()}>
      <ListCard
        completedList={completedList}
        listTitle={
          <ListTitle
            editOpen={editOpen}
            setEditOpen={() => setEditOpen(!editOpen)}
            editable={true}
            listTitle={list.title}
          />
        }
        topOfListActionButtons={
          <ListActions
            list={list}
            editOpen={() => setEditOpen(!editOpen)}
            editTitleButton={completedList ? false : true}
            refreshListButton={completedList ? false : true}
            refreshListHandler={refreshListHandler}
            deleteListButton={true}
            reactivateListButton={completedList ? true : false}
            completeListButton={completedList ? false : true}
            handleDeleteList={(id) => handleDeleteList(list._id)}
            handleCompleteList={(id) => handleCompleteList(list._id)}
            handleReactivateList={(id) => handleReactivateList(list._id)}
          />
        }
        topOfListSharedWith={<SharedWith list={list} user={user} />}
        middleOfListCardContent={
          completedList ? (
            <CompletedListMessage
              completionDate={list.complete.completionDate}
            />
          ) : (
            <AddItem id={id} userName={user.profile.name} />
          )
        }
        listItems={
          <ListItems
            completedList={completedList}
            userName={user.profile.name}
            listId={list._id}
            listItems={list.listItems}
          />
        }
      />
      {completedList ? (
        <DetailedPastListHelp
          dialogOpen={dialogOpen}
          handleDialogClose={() => helpDialogCloseHandler()}
        />
      ) : (
        <DetailedActiveListHelp
          dialogOpen={dialogOpen}
          handleDialogClose={() => helpDialogCloseHandler()}
        />
      )}
    </PageContainer>
  );
};

export default DetailedListView;
