import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import App from './App';
import Calendar from './pages/calendar';
import Reminder from './pages/reminder';

const styles = theme => ({
  title: {
    flexGrow: 1,
  }
})

class Routes extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  handleCalendarClick = () => this.props.history.push('/calendar')
  
  handleReminderClick = () => this.props.history.push('/reminder')
  
  render() {
    const { history, classes } = this.props
    return (
      <Router history={history}>
        <App>
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
              >
                React Calendar with Reminder
              </Typography>
              <Button color="inherit" onClick={this.handleCalendarClick}>Calendar</Button>
              <Button color="inherit" onClick={this.handleReminderClick}>Reminder</Button>
            </Toolbar>
          </AppBar>
          <Route path='/calendar' component={Calendar} />
          <Route path='/reminder' component={Reminder} />
          <Route exact path='/' component={Calendar} />
        </App>
      </Router>
    )
  }
}

export default withStyles(styles)(Routes)
