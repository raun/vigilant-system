import { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TextField } from 'formik-material-ui';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { NavLink as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { ERROR, notify, SUCCESS } from '../Toaster/Toaster';

const useStyles = makeStyles((theme) => ({
	alert: {
		margin: theme.spacing(0),
	},
	paper: {
		paddingTop: theme.spacing(4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		marginTop: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(2),
		fontSize: '16px'
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const initialValues = {
	email: '',
	password: '',
};

const validationSchema = Yup.object({
	email: Yup.string().email('Enter a valid email').required(' '),
	password: Yup.string()
		.min(8, 'Password must contain at least 8 characters')
		.required(' '),
});

export default function LogIn(props: any) {
	const classes = useStyles();

	const [buttonText, setButtonText] = useState(false);
	const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [ showPassword, setShowPassword ] = useState(true)
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
	// const user = isAuth();
	const onSubmit = async (values: any, submitProps: any) => {console.log(values, submitProps)
		try {
			submitProps.setSubmitting(false);
			setButtonText(true);
			const { email, password } = values;

			const res = await axios.post(`/users/login`, {
				email,
				password,
			});
			// authenticate(res, () => {
				setButtonText(true);
				submitProps.resetForm();
				// toast.success('Redirecting to home page', {
				// 	position: 'top-center',
				// 	autoClose: 5000,
				// 	hideProgressBar: false,
				// 	closeOnClick: true,
				// 	pauseOnHover: false,
				// 	draggable: false,
				// 	progress: undefined,
				// });
				setButtonText(false);
				setRedirectToReferrer(true);
			// });
		} catch (err) {
				notify({
					message: 'server is down',
					progress_bar: true,
					type: ERROR,
					closeInTime: 5000
				})
			}
			setButtonText(false);
	};

	// if (redirectToReferrer) {
	// 	if (user.role === 'user') return <Redirect to="/userdashboard" />;
	// 	else return <Redirect to="/admindashboard" />;
	// 	if (isAuth()) return <Redirect to="/" />;
	// }

	return (
		<div>
			<Container component="main" maxWidth="sm">
				<CssBaseline />
				<div className={classes.paper}>
					<Typography component="h1" variant="h4">
						Sign in
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
												fullWidth
												variant="outlined"
												component={TextField}
												name="email"
												type="email"
												label="Email"
                        helperText=" "
											/>
										</Grid>

										<Grid item xs={12}>
											<Field
												fullWidth
												variant="outlined"
												component={TextField}
												type={showPassword ? "password" : "text"}
												label="Password"
												name="password"
                        helperText=" "
                        InputProps={{
                          endAdornment:
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                        }}
											/>
										</Grid>
									</Grid>

									<Button
										fullWidth
										variant="contained"
										color="primary"
										className={classes.submit}
										disabled={!isValid || buttonText}
										type="submit"
									>
										{buttonText ? (
											<CircularProgress size={24} color="secondary" />
										) : (
											'Submit'
										)}
									</Button>
									<Grid container justifyContent="flex-end">
										<Grid item>
											<Link component={RouterLink} to="/signup" className="text-link">
												{"Don't have an account? Sign Up"}
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