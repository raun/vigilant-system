import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Box, AppBar } from '@material-ui/core';
import UserFeatureSummaryList from './UserFeatureSummaryList';
import Loading from "../Shared/Loading";
import './dashboard.scss';

function TabPanel(props) {
	const { children, value, index } = props;

	return <div role="tabpanel">{value === index && <Box>{children}</Box>}</div>;
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		display: 'flex',
		minHeight: '100vh',
		[theme.breakpoints.down(1000)]: {
			display: 'none',
		},
		height: '100%',
    paddingTop: '20px'
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
		height: '100%',
	},
	mobile: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper,
		[theme.breakpoints.up(1000)]: {
			display: 'none',
		},
    paddingTop: '16px'
	},
}));

function AdminDashboard() {
	const classes = useStyles();

	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className="">
      <Loading />
			<div className={classes.root}>
				<div className="row w-100 d-flex">
					<div className="col-sm-4 col-md-3">
						<Tabs
							orientation="vertical"
							variant="scrollable"
							value={value}
							onChange={handleChange}
							className={classes.tabs}
						>
							<Tab label="My Features Request" />
							<Tab label="Profile" />
							<Tab label="Manage Features" />
						</Tabs>
					</div>
					<div className="col-sm-8 col-md-9">
						<TabPanel value={value} index={0}>
							<UserFeatureSummaryList />
						</TabPanel>
						<TabPanel value={value} index={1}>
							In here you can see and update your profile and personal information.
						</TabPanel>
						<TabPanel value={value} index={2}>
							In here you can manage your features which is watching some features and email subscription and stuff related to features.
						</TabPanel>
					</div>
				</div>
			</div>
			<div className={classes.mobile}>
				<AppBar position="static" color="default">
					<Tabs
						value={value}
						onChange={handleChange}
						indicatorColor="secondary"
						textColor="secondary"
						variant="scrollable"
						scrollButtons="auto"
					>
						<Tab label="My Features Request" />
						<Tab label="Profile" />
						<Tab label="Watching Features" />
					</Tabs>
				</AppBar>
				<TabPanel value={value} index={0}>
					<UserFeatureSummaryList />
				</TabPanel>
				<TabPanel value={value} index={1}>
					In here you can see and update your profile and personal information.
				</TabPanel>
				<TabPanel value={value} index={2}>
          In here you can manage your features which is watching some features and email subscription and stuff related to features.
				</TabPanel>
			</div>
		</div>
	);
}

export default AdminDashboard;
