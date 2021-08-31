import { NavLink as RouterLink } from 'react-router-dom';
import { Link } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import { Box, IconButton } from '@material-ui/core';

const CommentSummary = (props) => {
  console.log(props)
    return (
      <div className="py-4 border-bottom">
        <div className="row center-flex-row justify-between">
          <Link component={RouterLink} to="/signup" className="col-xs-12 col-md-8 text-link">
            <Box component="div" className="text-subheading-2 text-link">
              jfkd jfkld fjkldjfl kjflaskjd jlsjf jlkfas klfjdk hfklajsfk jklfjal
            </Box> 
          </Link>
          <div className="col-xs-12 col-md-4 d-flex justify-end">
            <IconButton className="cursor-hand">
              <ThumbUpOutlinedIcon fontSize="large"  />
            </IconButton>
          </div>
        </div>
      </div>
    );
}

export default CommentSummary;