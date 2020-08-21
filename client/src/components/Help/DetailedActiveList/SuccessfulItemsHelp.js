import React from 'react';
import UndoRounded from '@material-ui/icons/UndoRounded';
import DeleteRounded from '@material-ui/icons/DeleteRounded';
import HelpIconList from '../../Layout/HelpIconList';

const ProblemItemsHelp = () => {
  const iconList = [
    {
      icon: <UndoRounded />,
      text: 'Hit this to return the item to ITEMS TO GET.',
    },
    {
      icon: <DeleteRounded />,
      text: 'Hit this to delete the item from the list permanently.',
    },
  ];
  return (
    <>
      <HelpIconList iconList={iconList} />
    </>
  );
};

export default ProblemItemsHelp;
