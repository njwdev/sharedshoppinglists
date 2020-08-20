import React from 'react';
import HelpDialog from '../../Layout/HelpDialog';
import { accordionData } from './detailedPastListAccordionData';

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
