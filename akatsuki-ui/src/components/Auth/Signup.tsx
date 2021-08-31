import React, { useState } from 'react';
// import axios from 'axios';
import { toast } from 'react-toastify';
import { NavLink as RouterLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TextField } from 'formik-material-ui';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
	alert: {
		margin: theme.spacing(0),
	},
	paper: {
		marginTop: theme.spacing(4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		paddingTop: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(2),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	error: {
		color: 'red',
	},
}));

const initialValues = {
	name: '',
	email: '',
	password: '',
	passwordConfirm: '',
};

const validationSchema = Yup.object({
	name: Yup.string().required(' '),
	email: Yup.string().email('Enter a valid email').required(' '),
	password: Yup.string()
		.min(8, 'Password must contain at least 8 characters')
		.required(' '),
	passwordConfirm: Yup.string()
		.required(' ')
		.oneOf([Yup.ref('password')], 'Password does not match'),
});

export default function SignUp(props: any) {
	const classes = useStyles();
	const [buttonText, setButtonText] = useState(false);

	const onSubmit = async (values: any, submitProps: any) => {
		try {console.log(values)
			submitProps.setSubmitting(false);
			setButtonText(true);
			const { name, email, password, passwordConfirm } = values;

			const res = ({//await axios.post(`/users/signup`, {
				name,
				email,
				password,
				passwordConfirm,
			});

			submitProps.resetForm();
			toast.success('message', {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
			});
			submitProps.resetForm();
			setButtonText(false);
		} catch (err) {
			if (err && err.response && err.response.data) {
				toast.error(err.response.data.message, {
					position: 'top-center',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			} else {
				toast.error('server is not running', {
					position: 'top-center',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
			setButtonText(false);
		}
	};

	return (
		<div>
			<Container component="main" maxWidth="sm">
				<CssBaseline />
				<div className={classes.paper}>
					<Typography component="h1" variant="h4">
						Create your Account
					</Typography>
					<Formik
						initialValues={initialValues}
						onSubmit={onSubmit}
						validationSchema={validationSchema}
					>
						{(formProps) => {
							const { submitForm, isSubmitting, isValid } = formProps;

							return (
								<Form className={classes.form}>
									<Grid container spacing={2}>
										<Grid item xs={12}>
											<Field
												component={TextField}
												label="Name"
												name="name"
												autoComplete="name"
												variant="outlined"
												fullWidth
                        helperText=" "
											/>
										</Grid>

										<Grid item xs={12}>
											<Field
												component={TextField}
												variant="outlined"
												fullWidth
												label="Email Address"
												name="email"
												autoComplete="email"
                        helperText=" "
											/>
										</Grid>
										<Grid item xs={12}>
											<Field
												variant="outlined"
												fullWidth
												name="password"
												label="Password"
												type="password"
												component={TextField}
												autoComplete="current-password"
                        helperText=" "
											/>
										</Grid>
										<Grid item xs={12}>
											<Field
												component={TextField}
												variant="outlined"
												fullWidth
												name="passwordConfirm"
												label="Password Confirm"
												type="password"
												autoComplete="off"
                        helperText=" "
											/>
										</Grid>
									</Grid>
									<Button
										type="submit"
										fullWidth
										variant="contained"
										color="primary"
										className={classes.submit}
										disabled={!isValid || buttonText}
									>
										{buttonText ? (
											<CircularProgress size={24} color="secondary" />
										) : (
											'Submit'
										)}
									</Button>
									<Grid container justifyContent="flex-end">
										<Grid item>
											<Link component={RouterLink} to="/login" className="text-link">
												Already have an account? Sign in
											</Link>
										</Grid>
									</Grid>
								</Form>
							);
						}}
					</Formik>
				</div>
			</Container>
		</div>
	);
}