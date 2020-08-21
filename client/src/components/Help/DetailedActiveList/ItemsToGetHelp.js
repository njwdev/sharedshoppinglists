import React from 'react';
import ReportProblemRounded from '@material-ui/icons/ReportProblemRounded';
import DoneRounded from '@material-ui/icons/DoneRounded';
import DeleteRounded from '@material-ui/icons/DeleteRounded';
import HelpIconList from '../../Layout/HelpIconList';

const ItemsToGetHelp = () => {
  const iconList = [
    {
      icon: <DoneRounded />,
      text: 'Hit this to show that you got the item successfully.',
    },
    {
      icon: <ReportProblemRounded />,
      text:
        'Hit this to show that there was a problem getting the item. You can then choose a reason from the list or add your own with OTHER',
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

export default ItemsToGetHelp;
