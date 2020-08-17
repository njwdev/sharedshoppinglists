import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import HelpAccordion from '../../Layout/HelpAccordion';
import DialogBox from '../../Layout/DialogBox';
import { accordionData } from './pastListsAccordionData';

const PastListsHelp = ({ dialogOpen, handleDialogClose }) => {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <>
      <DialogBox
        dialogOpen={dialogOpen}
        handleDialogClose={handleDialogClose}
        dialogTitle='Past Lists'
        dialogActions={<Button onClick={handleDialogClose}>Close</Button>}>
        {accordionData.map((data) => (
          <HelpAccordion
            key={data.accordionPanel}
            expanded={expanded === data.accordionPanel}
            onChange={handleChange(data.accordionPanel)}
            accordionPanel={data.accordionPanel}
            accordionSummary={data.accordionSummary}
            accordionDetails={data.accordionDetails}
          />
        ))}
      </DialogBox>
    </>
  );
};

PastListsHelp.propTypes = {
  dialogOpen: PropTypes.bool,
  handleDialogClose: PropTypes.func.isRequired,
};

export default PastListsHelp;
