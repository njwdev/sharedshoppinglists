import React, { useState } from 'react';
import PropTypes from 'prop-types';
//MUI Icons
import GroupAdd from '@material-ui/icons/Add';
import PostAdd from '@material-ui/icons/PostAdd';
import { useLists } from '../../hooks/useLists';
import ListOverview from './ListViews/ListOverview';
import CreateList from './ListViews/ListViewComponents/CreateList';
import Spinner from '../Layout/Spinner';
import NoItems from '../Layout/NoItems';
import PageContainer from '../Layout/PageContainer';
import FabListButtons from '../Layout/FabListButtons';
import { Button } from '@material-ui/core';

const ListsOverview = ({ listsCategory, pageTitle, helpDialog }) => {
  const [showAddList, setShowAddList] = useState(false);
  const [lists, loading] = useLists();
  let listsToMap;
  if (listsCategory === 'active')
    listsToMap = lists && lists.filter((list) => !list.complete.complete);
  if (listsCategory === 'past')
    listsToMap = lists && lists.filter((list) => list.complete.complete);

  const buttonsToRender = [
    {
      disabled: false,
      icon: <PostAdd />,
      text: 'Create List',
      onClick: () => setShowAddList(!showAddList),
    },
    {
      disabled: true,
      icon: <GroupAdd />,
      text: 'Join List',
      onClick: () => setShowAddList(!showAddList),
    },
  ];
  return loading ? (
    <Spinner />
  ) : (
    <>
      <PageContainer pageTitle={pageTitle} helpDialog={helpDialog}>
        {listsCategory === 'active' ? (
          <FabListButtons buttonsToRender={buttonsToRender} />
        ) : null}

        {showAddList ? (
          <CreateList />
        ) : (
          //Show message if no lists
          !listsToMap.length && (
            <NoItems noListsText='There are no lists in this category yet.'></NoItems>
          )
        )}
        {listsToMap.map((list) => (
          <ListOverview key={list._id} list={list}></ListOverview>
        ))}
        <Button onDoubleClick={() => alert('hello')}>Test</Button>
      </PageContainer>
    </>
  );
};

ListsOverview.propTypes = {
  listsCategory: PropTypes.string.isRequired,
  pageTitle: PropTypes.string.isRequired,
};

export default ListsOverview;
