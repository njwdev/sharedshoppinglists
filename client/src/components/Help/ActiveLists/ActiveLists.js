import React from 'react';
import PropTypes from 'prop-types';
import { accordionData } from './activeListsAccordionData';
import HelpDialog from '../../Layout/HelpDialog';

const ActiveListsHelp = ({ dialogOpen, handleDialogClose }) => {
  return (
    <>
      <HelpDialog
        dialogTitle={'Active Lists'}
        dialogOpen={dialogOpen}
        handleDialogClose={handleDialogClose}
        accordionData={accordionData}
      />
    </>
  );
};

ActiveListsHelp.propTypes = {
  dialogOpen: PropTypes.bool,
  handleDialogClose: PropTypes.func.isRequired,
};

export default ActiveListsHelp;
