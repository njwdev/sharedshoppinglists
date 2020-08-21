import React from 'react';
import DoneOutlined from '@material-ui/icons/DoneOutlined';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import RefreshOutlined from '@material-ui/icons/RefreshOutlined';
import EditOutlined from '@material-ui/icons/EditOutlined';
import HelpIconList from '../../Layout/HelpIconList';

const ListIconsHelp = () => {
  const iconList = [
    {
      icon: <RefreshOutlined />,
      text:
        'This refreshes the list, so you can check if somebody has updated it.',
    },
    {
      icon: <EditOutlined />,
      text: 'With this you change the title of the list.',
    },
    {
      icon: <DoneOutlined />,
      text:
        'Click this to complete the list. This will archive the list in past lists.',
    },
    {
      icon: <DeleteOutlined />,
      text:
        'Click this to delete the list. The list will be permanently deleted. ',
    },
  ];
  return (
    <>
      <HelpIconList iconList={iconList} />
    </>
  );
};

export default ListIconsHelp;
