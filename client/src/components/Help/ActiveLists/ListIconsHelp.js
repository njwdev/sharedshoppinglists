import React from 'react';
import { useTheme } from '@material-ui/core';
import ShoppingCartRounded from '@material-ui/icons/ShoppingCartRounded';
import ReportProblemRounded from '@material-ui/icons/ReportProblemRounded';
import DoneRounded from '@material-ui/icons/DoneRounded';
import HelpIconList from '../../Layout/HelpIconList';

const ListIconsHelp = () => {
  const theme = useTheme();
  const iconList = [
    {
      icon: <ShoppingCartRounded />,
      text: 'A preview of the number of items you need to get',
    },
    {
      icon: (
        <ReportProblemRounded style={{ color: theme.palette.error.main }} />
      ),
      text: 'A preview of how many items have encountered a problem.',
    },
    {
      icon: <DoneRounded style={{ color: theme.palette.success.main }} />,
      text: 'A preview of the number of items you need to get.',
    },
  ];
  return (
    <>
      <HelpIconList iconList={iconList} />
    </>
  );
};

export default ListIconsHelp;
