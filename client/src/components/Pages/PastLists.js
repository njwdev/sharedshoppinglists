import React, { useState } from 'react';
import ListsOverview from '../Lists/ListsOverview';
import { useNumberOfLists } from '../../hooks/useLists';
import PastListsHelp from '../Help/PastLists/PastLists';

const PastLists = () => {
  const [pastListsNumber] = useNumberOfLists();
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
        displayCompletionInfo
        helpDialog={() => helpDialogOpenHandler()}
        pageTitle={'Past Lists'}
        listsCategory='past'
        noListMessage={
          pastListsNumber === 0
            ? 'There are no lists in this category yet'
            : null
        }
      />
      <PastListsHelp
        dialogOpen={dialogOpen}
        handleDialogClose={() => helpDialogCloseHandler()}
      />
    </>
  );
};

export default PastLists;
