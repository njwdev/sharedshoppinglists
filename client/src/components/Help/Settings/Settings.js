import React from 'react';
import PropTypes from 'prop-types';
import HelpDialog from '../../Layout/HelpDialog';
import { accordionData } from './accordionData';

const PastListsHelp = ({ dialogOpen, handleDialogClose }) => {
  return (
    <>
      <HelpDialog
        dialogOpen={dialogOpen}
        handleDialogClose={handleDialogClose}
        dialogTitle='Past Lists'
        accordionData={accordionData}
      />
    </>
  );
};

PastListsHelp.propTypes = {
  dialogOpen: PropTypes.bool,
  handleDialogClose: PropTypes.func.isRequired,
};

export default PastListsHelp;
