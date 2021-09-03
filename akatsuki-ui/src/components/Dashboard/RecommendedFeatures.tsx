import { NavLink as RouterLink } from 'react-router-dom';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Link from '@material-ui/core/Link';
import { Box } from '@material-ui/core';

const RecommendedFeatures = ({features}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="panel1bh-header"
        >
          <div className="text-body-1">Similar Searches</div>
        </AccordionSummary>
        <AccordionDetails className="flex-col">
          {features.map((feature: any) => 
            <div key={feature.id} className="p-2 border-bottom">
              <Link component={RouterLink} to={`/feature-requests/${feature.id}`} className="text-link mr-3">
                <Box component="span" className="text-subheading-2 text-link">
                  {feature.title}
                </Box> 
              </Link>
            </div>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default RecommendedFeatures;
