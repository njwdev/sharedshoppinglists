import React from 'react';
import Typography from '@material-ui/core/Typography';

export const accordionData = [
  {
    accordionPanel: 'panel1',
    accordionSummary: 'How do I add items to a list?',
    accordionDetails: (
      <Typography variant='body2'>
        Type your item in the box. Then add the quantity (if you want), and
        click submit.
      </Typography>
    ),
  },
];
