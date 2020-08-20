import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ListsOverview from '../Lists/ListsOverview';
import { useNumberOfLists } from '../../hooks/useLists';
import ActiveListsHelp from '../Help/ActiveLists/ActiveLists';

const ActiveLists = () => {
  const [activeListsNumber] = useNumberOfLists();
  const [dialogOpen, setDialogOpen] = useState(false);

  const helpDialogOpenHandler = () => {
    setDialogOpen(true);
  };
  const helpDialogCloseHandler = () => {
    setDialogOpen(false);
  };
  return (
    <>
      <ListsOverview
        pageTitle={'Active Lists'}
        helpDialog={() => helpDialogOpenHandler()}
        noListMessage={
          activeListsNumber === 0
            ? 'There are no lists in this category yet'
            : null
        }
        listsCategory='active'
      />
      <ActiveListsHelp
        dialogOpen={dialogOpen}
        handleDialogClose={() => helpDialogCloseHandler()}
      />
    </>
  );
};

export default ActiveLists;
