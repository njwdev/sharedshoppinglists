import React from 'react';
import DoneRounded from '@material-ui/icons/DoneRounded';
import DeleteRounded from '@material-ui/icons/DeleteRounded';
import HelpIconList from '../../Layout/HelpIconList';

const ProblemItemsHelp = () => {
  const iconList = [
    {
      icon: <DoneRounded />,
      text: 'Hit this to show that you got the item successfully.',
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
