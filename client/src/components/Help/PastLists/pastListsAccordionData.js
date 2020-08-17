import React from 'react';
import Typography from '@material-ui/core/Typography';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import UndoOutlined from '@material-ui/icons/UndoOutlined';

export const accordionData = [
  {
    accordionPanel: 'panel1',
    accordionSummary: 'What are past lists?',
    accordionDetails: (
      <Typography variant='body2'>
        Past Lists are lists which you have marked as completed. You cannot
        change past lists unless you reactivate them.
      </Typography>
    ),
  },
  {
    accordionPanel: 'panel2',
    accordionSummary: 'How do I reactivate a past list?',
    accordionDetails: (
      <Typography variant='body2'>
        To reactivate a past list, click on the{' '}
        <UndoOutlined fontSize='inherit' /> icon in the bottom right corner.
      </Typography>
    ),
  },
  {
    accordionPanel: 'panel3',
    accordionSummary: 'How do I delete a past list?',
    accordionDetails: (
      <Typography variant='body2'>
        To delete a list, click on the <DeleteOutlined fontSize='inherit' />{' '}
        button in the bottom right corner. The list will be permanently deleted.
      </Typography>
    ),
  },
];
