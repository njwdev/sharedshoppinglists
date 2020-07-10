import React from 'react';
import ListsOverview from '../Lists/ListsOverview';
import { useNumberOfLists } from '../../hooks/useLists';

const ActiveLists = () => {
  const [activeListsNumber] = useNumberOfLists();
  return (
    <ListsOverview
      pageTitle={'Active Lists'}
      noListMessage={
        activeListsNumber === 0
          ? 'There are no lists in this category yet'
          : null
      }
      listsCategory='active'
    />
  );
};

export default ActiveLists;
