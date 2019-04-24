import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import { format } from 'date-fns'
import DateFnsUtils from '@date-io/date-fns';
import { TwitterPicker  } from 'react-color';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import fp from 'lodash/fp'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { addReminder, updateReminder, deleteReminder } from 'redux/modules/reminder/actions'
import { reminderSelector } from 'redux/modules/reminder/selectors';

import styles from './styles';

const DIALOG_TYPE = {
  'ADD': 0,
  'EDIT': 1,
}

const DIALOG_ACTION = {
  'CLOSE': 0,
  'ADD': 1,
  'UPDATE': 2,
  'DELETE': 3,
}

const colors = ['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB']

class Home extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      'dialogOpen': false,
      'dialogType': DIALOG_TYPE.ADD,
      'reminderText': null,
      'color': colors[0],
      'date': null,
      'anchorEl': null 
    }
  }

  handleAddDialog = () => this.setState({ 'dialogOpen': true, 'dialogType': DIALOG_TYPE.ADD })

  handleEditDialog = id => () => {
    const { reminders } = this.props
    const reminder = fp.find({ id })(reminders)

    if (reminder) {
      this.selectedReminderId = id
      this.setState({
        'dialogOpen': true,
        'dialogType': DIALOG_TYPE.EDIT,
        'reminderText': reminder.text,
        'color': reminder.color,
        'date': new Date(reminder.date + ' ' + reminder.time)
      })
    }
  }

  handleDeleteReminder = id => () => this.props.deleteReminder(id)

  handleDialogAction = (action) => () => {
    const date = this.state.date && new Date(this.state.date)
    const { color } = this.state
    const { addReminder, updateReminder, deleteReminder } = this.props
    const reminderText = document.getElementById('reminderText').value
    
    switch (action) {
      case DIALOG_ACTION.ADD:
        if (date && reminderText) {
          this.setState({ 'dialogOpen': false })  
          addReminder({
            'id': Math.random().toString(16).substring(2),
            'date': format(date, 'MM/DD/YYYY'),
            'time': format(date, 'HH:mm'),
            'text': reminderText,
            'color': color
          })
        }
        break;

      case DIALOG_ACTION.UPDATE:
        if (date && reminderText) {
          this.setState({ 'dialogOpen': false }) 
          updateReminder({
            'id': this.selectedReminderId,
            'date': format(date, 'MM/DD/YYYY'),
            'time': format(date, 'HH:mm'),
            'text': reminderText,
            'color': color
          })
        }
        break;

      case DIALOG_ACTION.DELETE:
        this.setState({ 'dialogOpen': false })
        deleteReminder(this.selectedReminderId)
        break;  

      case DIALOG_ACTION.CLOSE:
        this.setState({ 'dialogOpen': false })
        break;

      default:
    }
  }

  handleDateChange = date => this.setState({ date })

  handleColorOpen = e => this.setState({ 'anchorEl': e.currentTarget })

  handleColorClose = () => this.setState({ 'anchorEl': null })

  handleColorChange = color => this.setState({ 'color': color.hex })

  render() {
    const { classes } = this.props
    const reminders = fp.groupBy('date')(this.props.reminders)
    const dates = []

    for (let date in reminders) {
      dates.push(date)
    }
    
    return (
      <div className={classes.root}>
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleDialogAction(DIALOG_ACTION.CLOSE)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {this.state.dialogType === DIALOG_TYPE.ADD ? 'Add your reminder' : 'Edit reminder'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Select date, time, reminder text and color.</DialogContentText>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container spacing={24} alignItems="flex-end" justify="space-around">
                <Grid item>
                  <DatePicker
                    margin="normal"
                    label="Date picker"
                    format='MM/dd/yyyy'
                    value={this.state.date}
                    onChange={this.handleDateChange}
                  />
                </Grid>
                <Grid item>
                  <TimePicker
                    margin="normal"
                    label="Time picker"
                    value={this.state.date}
                    onChange={this.handleDateChange}
                  />
                </Grid>
                <Grid item >
                  <Fab
                    size="small"
                    onClick={this.handleColorOpen}
                    style={{'backgroundColor': this.state.color}}
                  >
                    {' '}
                  </Fab>
                  <Popover
                    id="simple-popper"
                    open={Boolean(this.state.anchorEl)}
                    anchorEl={this.state.anchorEl}
                    onClose={this.handleColorClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <TwitterPicker
                      colors={colors}
                      onChange={this.handleColorChange}
                      color={this.state.color}
                    />
                  </Popover>
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
            <TextField
              autoFocus
              margin="dense"
              defaultValue={this.state.reminderText}
              id="reminderText"
              label="Reminder Text"
              inputProps={{maxLength: 30}}
              required
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogAction(DIALOG_ACTION.CLOSE)} color="primary">
              Cancel
            </Button>
            {this.state.dialogType === DIALOG_TYPE.EDIT && (
              <Button onClick={this.handleDialogAction(DIALOG_ACTION.DELETE)} color="primary">
                Delete
              </Button>
            )}
            <Button
              color="primary"
              onClick={this.handleDialogAction(
                this.state.dialogType === DIALOG_TYPE.ADD ? DIALOG_ACTION.ADD : DIALOG_ACTION.UPDATE
              )}
            >
              {this.state.dialogType === DIALOG_TYPE.ADD ? 'Add' : 'Update'}
            </Button>
          </DialogActions>
        </Dialog>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Fab
              onClick={this.handleAddDialog}
              color="primary"
              aria-label="Add"
              className={classes.add}
            >
              <AddIcon />
            </Fab>
          </Grid>
          {this.props.reminders.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="h1" className={classes.noReminder}>No Reminder</Typography>
            </Grid>
            ) : fp.orderBy([], ['asc'])(dates).map(date => (
            <Grid item xs={12} key={date}>
              <Paper className={classes.reminder}>
                <Typography variant="h6" gutterBottom>
                  {date}
                </Typography>
                {fp.orderBy(['time'], ['asc'])(reminders[date]).map(reminder => (
                  <div key={reminder.id}>
                    <Typography align="left" className={classes.reminderTime}>
                      <i>{reminder.time}</i>
                    </Typography>
                    <Typography align="left" style={{'color': reminder.color}} gutterBottom>
                      {reminder.text}
                    </Typography>
                    <IconButton
                      aria-label="Delete"
                      className={classes.margin}
                      onClick={this.handleDeleteReminder(reminder.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="Edit" className={classes.margin} onClick={this.handleEditDialog(reminder.id)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </div>
                ))}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    )
  }
}

const actions = {
  addReminder,
  updateReminder,
  deleteReminder
}

const selector = createStructuredSelector({
  reminders: reminderSelector,
});

export default compose(
  connect(selector, actions),
  withStyles(styles)
)(Home);