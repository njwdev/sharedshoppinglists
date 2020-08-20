import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import HelpAccordion from './HelpAccordion';
import DialogBox from './DialogBox';

const HelpDialogBox = ({
  dialogOpen,
  handleDialogClose,
  dialogTitle,
  accordionData,
}) => {
  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <>
      <DialogBox
        dialogOpen={dialogOpen}
        handleDialogClose={handleDialogClose}
        dialogTitle={dialogTitle}
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

HelpDialogBox.propTypes = {
  dialogOpen: PropTypes.bool,
  handleDialogClose: PropTypes.func.isRequired,
  accordionData: PropTypes.array.isRequired,
  dialogTitle: PropTypes.string.isRequired,
};

export default HelpDialogBox;
