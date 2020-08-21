import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const HelpIconList = ({ iconList }) => {
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

HelpIconList.propTypes = {
  iconList: PropTypes.array.isRequired,
};

export default HelpIconList;
