import React from 'react';
import ShoppingCartRounded from '@material-ui/icons/ShoppingCartRounded';
import ReportProblemRounded from '@material-ui/icons/ReportProblemRounded';
import DoneRounded from '@material-ui/icons/DoneRounded';
import HelpIconList from '../../Layout/HelpIconList';

const ListIconsHelp = () => {
  const iconList = [
    {
      icon: <ShoppingCartRounded />,
      text:
        'ITEMS TO GET are the items on your shopping list which you need to get.',
    },
    {
      icon: <ReportProblemRounded />,
      text:
        'PROBLEM ITEMS are the items which somebody attempted to get, but was unsuccessful',
    },
    {
      icon: <DoneRounded />,
      text:
        'SUCCESSFUL ITEMS are items which have been purchased with no problems.',
    },
  ];
  return (
    <>
      <HelpIconList iconList={iconList} />
    </>
  );
};

export default ListIconsHelp;
