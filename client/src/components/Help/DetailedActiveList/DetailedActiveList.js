import React from 'react';
import PropTypes from 'prop-types';
import HelpDialog from '../../Layout/HelpDialog';
import { accordionData } from './accordionData';

const DetailedActiveList = ({ dialogOpen, handleDialogClose }) => {
  return (
    <>
      <HelpDialog
        dialogTitle='List'
        dialogOpen={dialogOpen}
        handleDialogClose={handleDialogClose}
        accordionData={accordionData}
      />
    </>
  );
};

DetailedActiveList.propTypes = {
  dialogOpen: PropTypes.bool,
  handleDialogClose: PropTypes.func.isRequired,
};

export default DetailedActiveList;
