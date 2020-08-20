import React from 'react';
import HelpDialog from '../../Layout/HelpDialog';
import { accordionData } from './detailedActiveListAccordionData';

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

export default DetailedActiveList;
