import React from 'react';
import Typography from '@material-ui/core/Typography';
import DoneOutlined from '@material-ui/icons/DoneOutlined';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import RefreshOutlined from '@material-ui/icons/RefreshOutlined';
import EditOutlined from '@material-ui/icons/EditOutlined';
import ListIconsHelp from './ListIconsHelp';
import ItemCategoriesHelp from './ItemCategoriesHelp';
import ItemsToGetHelp from './ItemsToGetHelp';
import ProblemItemsHelp from './ProblemItemsHelp';
import SuccessfulItemsHelp from './SuccessfulItemsHelp';

export const accordionData = [
  {
    accordionPanel: 'panel1',
    accordionSummary: 'How do I add items to a list?',
    accordionDetails: (
      <Typography variant='body2'>
        Type your item in the box. Then add the quantity (if you want), and hit
        submit.
      </Typography>
    ),
  },
  {
    accordionPanel: 'panel2',
    accordionSummary: (
      <Typography>
        What do
        <RefreshOutlined style={{ margin: '0 8px' }} fontSize='inherit' />,
        <EditOutlined style={{ margin: '0 8px' }} fontSize='inherit' />
        ,
        <DoneOutlined style={{ margin: '0 8px' }} fontSize='inherit' />
        and
        <DeleteOutlined style={{ margin: '0 8px' }} fontSize='inherit' />
        at the top of the list mean?
      </Typography>
    ),
    accordionDetails: <ListIconsHelp />,
  },
  {
    accordionPanel: 'panel3',
    accordionSummary: (
      <Typography>
        What are ITEMS TO GET, PROBLEM ITEMS and SUCCESSFUL ITEMS?
      </Typography>
    ),
    accordionDetails: <ItemCategoriesHelp />,
  },
  {
    accordionPanel: 'panel4',
    accordionSummary: (
      <Typography>What are the actions in ITEMS TO GET?</Typography>
    ),
    accordionDetails: <ItemsToGetHelp />,
  },
  {
    accordionPanel: 'panel5',
    accordionSummary: (
      <Typography>What are the actions in PROBLEM ITEMS?</Typography>
    ),
    accordionDetails: <ProblemItemsHelp />,
  },
  {
    accordionPanel: 'panel7',
    accordionSummary: (
      <Typography>What are the actions in SUCCESSFUL ITEMS?</Typography>
    ),
    accordionDetails: <SuccessfulItemsHelp />,
  },
];
