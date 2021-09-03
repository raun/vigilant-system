
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import { TextField } from 'formik-material-ui';
import Grid from '@material-ui/core/Grid';
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
import RecommendedFeatures from './RecommendedFeatures'
import {searchSimilarFeatures} from '../../redux/action/searchSimilarFeatures';
import { Redirect } from 'react-router-dom';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
	alert: {
		margin: theme.spacing(0),
	},
	paper: {
		paddingTop: '60px',
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
	const [title1, setTitle] = useState('');
	const { success } = useSelector((state: any) => state.createFeature);

	let { features } = useSelector((state: any) => state.search)

	const onSubmit = async (values: any, submitProps: any) => {
		dispatch(createRequest(1, values));
		submitProps.resetForm();
	};

	// if (success) {
	// 	return <Redirect to="/userdashboard" />;
	// }
	useEffect(() => {
		features = features.filter(feature => feature.id == null);
	},[])

	const handleSchemaChange = (value, setFieldValue) => {
    setFieldValue('title', value);
    searchTerm(value)
}

	const searchTerm = (title: any) => {
		dispatch(searchSimilarFeatures(title))
	}
 

	return (
		<div>
			{/* {success && <Redirect to="/userdashboard" />} */}
			<Container maxWidth="sm">
				<div className={classes.paper}>
					<div className="text-display-2 mb-5">
						Submit A Feature
					</div>
					<Formik
						initialValues={initialValues}
						onSubmit={onSubmit}
						validationSchema={validationSchema}>
						{(formProps) => {
							const { values, isSubmitting, isValid, setFieldValue } = formProps;

							return (
								<Form className={classes.form}>
									<Grid container spacing={2}>
                    <Grid item xs={12} className="mb-5">
                      <FormControl variant="outlined"
                        fullWidth 
                        error={'tags' in formProps.errors}>
                        <InputLabel id="request-type">Type of Request</InputLabel>
                        <Field
                          component={Select}
                          name="tags"
													defaultValue="SOURCE"
                          inputProps={{
                            id: 'request-type',
														name: "tags"
                          }}>
													<MenuItem value=''>Select an option</MenuItem>
                          <MenuItem value={'SOURCE'}>Source</MenuItem>
                          <MenuItem value={'DESTINATION'}>Destination</MenuItem>
                          <MenuItem value={'IMPROVEMENT'}>Improvement</MenuItem>
                        </Field>
                      </FormControl>
										</Grid>

										<Grid item xs={12} className="mb-5">
											<Field
												fullWidth
												variant="outlined"
												component={TextField}
												name="title"
												type="text"
												label="Title"
                        helperText=" "
												autoComplete="off"
												onChange={(e) => handleSchemaChange(e.target.value, setFieldValue)}
											/>
										</Grid>
										
										{features && features.length > 0 &&
										<Grid item xs={12} className="mb-5">
										  <RecommendedFeatures features={features} />
										</Grid>}
										

                    <Grid item xs={12} className="mb-5">
											<Field
												fullWidth
                        multiline
                        minRows={4}
												variant="outlined"
												component={TextField}
												name="description"
												type="text"
												label="What is your usecase..."
                        helperText="This will help us priortize your feature request."
											/>
										</Grid>
                    
                    <Grid item xs={12} className="px-2 py-0">
                      <Field
                        component={CheckboxWithLabel}
                        type="checkbox"
                        name="isBlocker"
                        Label={{ label: 'Is it a blocker to onboard to Hevo?' }}
                        color="primary"
                      />
                    </Grid>

                    <Grid item xs={12} className="px-2 py-0">
                      <Field
                        component={CheckboxWithLabel}
                        type="checkbox"
                        name="isBetaTesting"
                        Label={{ label: 'Do you wish to participate in beta testing?' }}
                        color="primary"
                      />
                    </Grid>

                    <Grid item xs={12} className="px-2 py-0">
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
										disabled={!isValid || isSubmitting}
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