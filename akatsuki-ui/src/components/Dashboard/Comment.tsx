import { Avatar, Box, Container, Grid, IconButton, makeStyles, Typography } from "@material-ui/core"
import { deepOrange } from "@material-ui/core/colors";
import clsx from "clsx";
import { AddComment } from "./AddComment";
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'row',
	},
	orange: {
		color: theme.palette.getContrastText(deepOrange[500]),
		backgroundColor: deepOrange[500],
		width: theme.spacing(8),
		height: theme.spacing(8),
		fontSize: '40px',
    alignItems: 'center'
	},
	box: {
		display: 'flex',
		flexDirection: 'row',
    alignItems: 'center',
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column',
			justifyContent: 'center',
		},
	},
}));

export const Comment = () => {
  const classes = useStyles();
  const reviews = [
    {_id: 1, user: { name: 'sad' },createdAt: 'abhi' , review: `jfkd jfkld fjkldjfl kjflaskjd jlsjf jlkfas klfjdk hfklajsfk jklfjal jfkd jfkld fjkldjfl kjflaskjd jlsjf jlkfas klfjdk hfklajsfk jklfjal
    jfkd jfkld fjkldjfl kjflaskjd jlsjf jlkfas klfjdk hfklajsfk jklfjal jfkd jfkld fjkldjfl kjflaskjd jlsjf jlkfas klfjdk hfklajsfk jklfjal
    jfkd jfkld fjkldjfl kjflaskjd jlsjf jlkfas klfjdk hfklajsfk jklfjal jfkd jfkld fjkldjfl kjflaskjd jlsjf jlkfas klfjdk hfklajsfk jklfjal`},
    {_id: 2, user: { name: 'mad' },createdAt: 'abhi' , review: 'safadfa fsfsfas fsfasdfas'},
    {_id: 3, user: { name: 'mad' },createdAt: 'abhi' , review: 'safadfa fsfsfas fsfasdfas'},
    {_id: 4, user: { name: 'mad' },createdAt: 'abhi' , review: 'safadfa fsfsfas fsfasdfas'},
    {_id: 5, user: { name: 'mad' },createdAt: 'abhi' , review: 'safadfa fsfsfas fsfasdfas'},
    {_id: 6, user: { name: 'mad' },createdAt: 'abhi' , review: 'safadfa fsfsfas fsfasdfas'},
    {_id: 7, user: { name: 'mad' },createdAt: 'abhi' , review: 'safadfa fsfsfas fsfasdfas'}
  ]
  return (
    <Container maxWidth="md">
				<div>
					{reviews.map((review) => (
						<div key={review._id} className='row py-5 border-bottom'>
							<div className="col-xs-12 col-md-3 center-flex-col justify-center">
								<Avatar
									alt={review.user.name}
									// src={`${imageUrl}/${review.user.image}`}
									className={clsx(classes.orange, 'd-flex')}
								>{review.user.name[0]}</Avatar>
                {/* <div className="mt-2">
                {review.user.name}
                </div> */}
              
							</div>
							<div className="col-xs-12 col-md-9">
                <div className="d-flex center-flex-row mb-2">
								  <div className="text-subheading-2">{review.user.name}</div>
								  <div className="text-body-1 ml-5">{review.createdAt}</div>
                </div>
								<div className="text-body-3">{review.review}</div>
								<div className="">
									<IconButton className="cursor-hand">
										<ThumbUpOutlinedIcon fontSize="large"  />
									</IconButton>
								</div>
							</div>
						</div>
					))}
				</div>
        <AddComment />
			</Container>
  )
}