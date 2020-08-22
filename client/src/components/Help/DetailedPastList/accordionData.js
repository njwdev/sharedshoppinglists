import React from 'react';
import Typography from '@material-ui/core/Typography';
import UndoOutlined from '@material-ui/icons/UndoOutlined';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import ItemCategoriesHelp from '../DetailedActiveList/ItemCategoriesHelp';

export const accordionData = [
  {
    accordionPanel: 'panel1',
    accordionSummary: `Why can't I add new items to this list?`,
    accordionDetails: (
      <Typography variant='body2'>
        You cannot add items to a past list unless you reactivate it.
      </Typography>
    ),
  },
  {
    accordionPanel: 'panel2',
    accordionSummary: `How do I reactivate a past list?`,
    accordionDetails: (
      <Typography variant='body2'>
        You can reactivate a past list by hitting{' '}
        <UndoOutlined fontSize='inherit' /> at the top of the list.
      </Typography>
    ),
  },
  {
    accordionPanel: 'panel3',
    accordionSummary: `How do I delete a past list?`,
    accordionDetails: (
      <Typography variant='body2'>
        You can delete a past list by hitting{' '}
        <DeleteOutlined fontSize='inherit' /> at the top of the list. The list
        will be permanently deleted.
      </Typography>
    ),
  },
  {
    accordionPanel: 'panel4',
    accordionSummary: (
      <Typography>
        What are ITEMS TO GET, PROBLEM ITEMS and SUCCESSFUL ITEMS?
      </Typography>
    ),
    accordionDetails: <ItemCategoriesHelp />,
  },
];
