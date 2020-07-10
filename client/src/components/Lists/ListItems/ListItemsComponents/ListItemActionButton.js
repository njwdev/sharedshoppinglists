import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';

const ListItemActionButton = ({ disabled, icon, onClick }) => {
  return (
    <>
      <IconButton disabled={disabled} size='small' onClick={onClick}>
        {icon}
      </IconButton>
    </>
  );
};

ListItemActionButton.propTypes = {
  disabled: PropTypes.bool,
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default ListItemActionButton;
