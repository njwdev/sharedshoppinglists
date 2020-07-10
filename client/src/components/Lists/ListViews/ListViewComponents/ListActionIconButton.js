import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

const ListActionIconButton = ({ ariaLabel, title, icon }) => {
  return (
    <>
      <Tooltip aria-label={ariaLabel} title={title}>
        {icon}
      </Tooltip>
    </>
  );
};

ListActionIconButton.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

export default ListActionIconButton;
