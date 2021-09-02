
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import { TextField } from 'formik-material-ui';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import MenuItem from '@material-ui/core/MenuItem';
import { Select, CheckboxWithLabel } from 'formik-material-ui';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { createRequest } from '../../redux/action/createRequest';
import axios from 'axios';

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
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export interface FeatureRequestFormI {
  tags: string,
  title: string,
  description: string,
  isBlocker: boolean,
  emailSubscription: boolean,
  isBetaTesting: boolean
}

const initialValues: FeatureRequestFormI = {
	tags: '',
	title: '',
  description: '',
  isBlocker: false,
  emailSubscription: true,
  isBetaTesting: false
};

const validationSchema = Yup.object({
  tags: Yup.string().required(' '),
	title: Yup.string().required(' '),
	description: Yup.string(),
  isBlocker: Yup.boolean(),
  emailSubscription: Yup.boolean(),
  isBetaTesting: Yup.boolean(),
});

export default function FeatureRequestForm(props: any) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [buttonText, setButtonText] = useState(false);
	const [redirectToReferrer, setRedirectToReferrer] = useState(false);

	// const user = isAuth();
	const onSubmit = async (values: any, submitProps: any) => {
		dispatch(createRequest(1, values));
	};

	// if (redirectToReferrer) {
	// 	if (user.role === 'user') return <Redirect to="/userdashboard" />;
	// 	else return <Redirect to="/admindashboard" />;
	// 	if (isAuth()) return <Redirect to="/" />;
	// }

	return (
		<div>
			<Container maxWidth="sm">
				<div className={classes.paper}>
					<Typography component="h1" variant="h4">
						Submit A Feature
					</Typography>
					<Formik
						initialValues={initialValues}
						onSubmit={onSubmit}
						validationSchema={validationSchema}>
						{(formProps) => {
							const { submitForm, isSubmitting, isValid } = formProps;

							return (
								<Form className={classes.form}>
									<Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl variant="outlined"
                        fullWidth 
                        error={'requestType' in formProps.errors}>
                        <InputLabel id="request-type">Type of Request</InputLabel>
                        <Field
                          component={Select}
                          name="tags"
													defaultValue="SOURCE"
                          inputProps={{
                            id: 'request-type',
														name: "tags"
                          }}>
                          <MenuItem value={'SOURCE'}>Source</MenuItem>
                          <MenuItem value={'DESTINATION'}>Destination</MenuItem>
                          <MenuItem value={'Improvement'}>Improvement</MenuItem>
                        </Field>
                      </FormControl>
										</Grid>

										<Grid item xs={12}>
											<Field
												fullWidth
												variant="outlined"
												component={TextField}
												name="title"
												type="text"
												label="title"
                        helperText=" "
											/>
										</Grid>

                    <Grid item xs={12}>
											<Field
												fullWidth
                        multiline
                        minRows={4}
												variant="outlined"
												component={TextField}
												name="description"
												type="text"
												label="discription"
                        helperText=" "
											/>
										</Grid>
                    
                    <Grid item xs={12}>
                      <Field
                        component={CheckboxWithLabel}
                        type="checkbox"
                        name="isBlocker"
                        Label={{ label: 'is it a blocker for you to onboard Hevo?' }}
                        color="primary"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Field
                        component={CheckboxWithLabel}
                        type="checkbox"
                        name="isBetaTesting"
                        Label={{ label: 'Do you wish to participate in beta testing?' }}
                        color="primary"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Field
                        component={CheckboxWithLabel}
                        type="checkbox"
                        name="emailSubscription"
                        Label={{ label: 'Subscribe to email updates' }}
                        color="primary"
                      />
                    </Grid>
										
									</Grid>

									<Button
										fullWidth
										variant="contained"
										color="primary"
										className={classes.submit}
										
										type="submit"
									>
										{buttonText ? (
											<CircularProgress size={24} color="secondary" />
										) : (
											'Submit'
										)}
									</Button>
								</Form>
							);
						}}
					</Formik>
				</div>
			</Container>
		</div>
		
	);
}