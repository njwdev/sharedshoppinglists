import React from 'react';
import PropTypes from 'prop-types';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMore from '@material-ui/icons/ExpandMore';

const HelpAccordion = ({
  accordionSummary,
  accordionDetails,
  expanded,
  onChange,
}) => {
  return (
    <Accordion expanded={expanded} onChange={onChange}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        {accordionSummary}
      </AccordionSummary>
      <AccordionDetails>{accordionDetails}</AccordionDetails>
    </Accordion>
  );
};

HelpAccordion.propTypes = {
  accordionSummary: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  accordionDetails: PropTypes.node,
  expanded: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default HelpAccordion;
