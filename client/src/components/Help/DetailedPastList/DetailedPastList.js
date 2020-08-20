import React from 'react';
import HelpDialog from '../../Layout/HelpDialog';
import { accordionData } from './accordionData';

const DetailedPastList = ({ dialogOpen, handleDialogClose }) => {
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

export default DetailedPastList;
