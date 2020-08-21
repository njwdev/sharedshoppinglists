import React from 'react';
import Typography from '@material-ui/core/Typography';
import PostAdd from '@material-ui/icons/PostAdd';
import ShoppingCartRounded from '@material-ui/icons/ShoppingCartRounded';
import ReportProblemRounded from '@material-ui/icons/ReportProblemRounded';
import DoneRounded from '@material-ui/icons/DoneRounded';
import DoneOutlined from '@material-ui/icons/DoneOutlined';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import GroupAdd from '@material-ui/icons/GroupAdd';
import ListIconsHelp from './ListIconsHelp';

export const accordionData = [
  {
    accordionPanel: 'panel1',
    accordionSummary: 'How do I get started?',
    accordionDetails: (
      <Typography variant='body2'>
        Click <PostAdd fontSize='inherit' />
        CREATE LIST to get started. You can add someone who already uses Shared
        Shopping Lists to your app by using Share with... Then, click on the
        list to start adding items.
      </Typography>
    ),
  },
  {
    accordionPanel: 'panel2',
    accordionSummary: 'How do I add items to the list?',
    accordionDetails: (
      <Typography variant='body2'>
        Click anywhere (except on the <DoneOutlined fontSize='inherit' /> or
        <DeleteOutlined fontSize='inherit' /> icons) to access the list and
        start adding items.
      </Typography>
    ),
  },
  {
    accordionPanel: 'panel3',
    accordionSummary: 'How do I join an existing list?',
    accordionDetails: (
      <Typography variant='body2'>
        Click on the <GroupAdd fontSize='inherit' /> JOIN LIST button and enter
        the list code which someone has shared with you.
      </Typography>
    ),
  },
  {
    accordionPanel: 'panel4',
    accordionSummary: (
      <Typography>
        What do
        <ShoppingCartRounded style={{ margin: '0 8px' }} fontSize='inherit' />,
        <ReportProblemRounded
          style={{ margin: '0 8px', color: 'red' }}
          fontSize='inherit'
        />
        and
        <DoneRounded
          style={{ margin: '0 8px', color: 'green' }}
          fontSize='inherit'
        />
        mean?
      </Typography>
    ),
    accordionDetails: <ListIconsHelp />,
  },
  {
    accordionPanel: 'panel5',
    accordionSummary: 'How do I complete a list?',
    accordionDetails: (
      <Typography variant='body2'>
        To complete a list, click on the <DoneOutlined fontSize='inherit' />{' '}
        button in the bottom right corner. It will be saved in Past Lists so
        that you can refer back to it in the future.
      </Typography>
    ),
  },
  {
    accordionPanel: 'panel6',
    accordionSummary: 'How do I delete a list?',
    accordionDetails: (
      <Typography variant='body2'>
        To delete a list, click on the <DeleteOutlined fontSize='inherit' />{' '}
        button in the bottom right corner. The list will be permanently deleted.
      </Typography>
    ),
  },
];
