import React from 'react';
import Typography from '@material-ui/core/Typography';

export const accordionData = [
  {
    accordionPanel: 'panel1',
    accordionSummary: `Why can't I add new items to this list?`,
    accordionDetails: (
      <Typography variant='body2'>
        You cannot add items to past lists unless you reactivate them.
      </Typography>
    ),
  },
];
