import React from 'react';
import Typography from '@material-ui/core/Typography';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';

export const accordionData = [
  {
    accordionPanel: 'panel1',
    accordionSummary: 'How can I change the settings?',
    accordionDetails: (
      <Typography variant='body2'>
        To change a setting click on the EDIT button.
      </Typography>
    ),
  },
  {
    accordionPanel: 'panel2',
    accordionSummary: `Why can't I change my email?`,
    accordionDetails: (
      <Typography variant='body2'>
        At this time you cannot change your email address. This will be resolved
        in a future update.
      </Typography>
    ),
  },
];
