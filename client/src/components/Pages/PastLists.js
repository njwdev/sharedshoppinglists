import React from 'react';
import ListsOverview from '../Lists/ListsOverview';
import { useNumberOfLists } from '../../hooks/useLists';

const PastLists = () => {
  const [pastListsNumber] = useNumberOfLists();
  return (
    <ListsOverview
      displayCompletionInfo
      pageTitle={'Past Lists'}
      listsCategory='past'
      noListMessage={
        pastListsNumber === 0 ? 'There are no lists in this category yet' : null
      }
    />
  );
};

export default PastLists;
