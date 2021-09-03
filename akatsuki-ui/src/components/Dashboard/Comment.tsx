import { Avatar, Box, Container, Grid, IconButton, makeStyles, Typography } from "@material-ui/core"
import { deepOrange } from "@material-ui/core/colors";
import clsx from "clsx";
import { AddComment } from "./AddComment";
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllComments } from '../../redux/action/getAllComments';
import { likeComment, unlikeComment } from '../../redux/action/upvoteAction';
import { useState } from "react";
import { ThumbUp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'row',
	},
	orange: {
		color: theme.palette.getContrastText(deepOrange[500]),
		backgroundColor: deepOrange[500],
		width: theme.spacing(6),
		height: theme.spacing(6),
		fontSize: '30px',
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

export const Comment = ({featureId, userId}) => {
  const classes = useStyles();
  const {loading, comments} = useSelector((state: any) => state.comments);
	const dispatch = useDispatch();
	const [click, setClick] = useState(false);

	useEffect(() => {
		console.log(dispatch(getAllComments(featureId, 1)))
	}, [click])

  return (
    <Container maxWidth="md">
				<div>
					{comments.map((comment: any) => (
						<div key={comment?.id} className='row py-5 border-bottom'>
							<div className="col-xs-12 col-md-3 center-flex-col justify-center">
								<Avatar
									alt='image'
									className={clsx(classes.orange, 'd-flex')}
								>{comment.text[0]}</Avatar>
							</div>
							<div className="col-xs-12 col-md-9">
                <div className="d-flex center-flex-row mb-2 justify-between">
									<div className="center-flex-row">
										<div className="text-subheading-2">{comment?.name || 'user'+userId}</div>
										<div className="text-body-1 ml-5">{comment?.created_at}</div>
									</div>
									<span>
										<IconButton className="cursor-hand" onClick={() => {
											comment.liked ?
											dispatch(unlikeComment(userId, comment.id)) :
											dispatch(likeComment(userId, comment.id))
										 	setClick(!click)
										}}>
											{
												comment.liked ?
												<ThumbUp fontSize="small" className="mr-1"  /> :
													<ThumbUpOutlinedIcon fontSize="small" className="mr-1"  />
											}
										</IconButton>
										{comment.likes}

									</span>
                </div>
								<div className="text-body-3">{comment.text}</div>
							</div>
						</div>
					))}
				</div>
        <AddComment featureId={featureId} userId={userId} click={click} setClick={setClick} />
			</Container>
  )
}