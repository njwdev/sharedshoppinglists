import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ShoppingCartRounded from '@material-ui/icons/ShoppingCartRounded';
import ReportProblemRounded from '@material-ui/icons/ReportProblemRounded';
import DoneRounded from '@material-ui/icons/DoneRounded';

const HelpIconList = () => {
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
    <List dense disablePadding>
      {iconList.map((data) => (
        <ListItem key={data.text} divider dense>
          <ListItemIcon>{data.icon}</ListItemIcon>
          <ListItemText>
            <Typography variant='body2'>{data.text}</Typography>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default HelpIconList;
