import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';

import cx from 'classnames'
import fp from 'lodash/fp'

import { format } from 'date-fns'
import { reminderSelector } from 'redux/modules/reminder/selectors';

import styles from './styles';


class Calendar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { classes, year, month, reminders } = this.props

    const thisMonth = new Date(year, month, 1)
    const thisMonthFirstDay = thisMonth.getDay()
    const daysInPrevMonth = new Date(month > 0 ? year : year - 1, month % 12, 0).getDate()
    const daysInThisMonth = new Date(year, month + 1, 0).getDate()
    
    const prevMonthDays = new Array(thisMonthFirstDay).fill(0).map((day, i) => daysInPrevMonth - thisMonthFirstDay + i + 1)
    const thisMonthDays = new Array(daysInThisMonth).fill(0).map((day, i) => i + 1)
    const nextMonthDays = new Array(6 - (thisMonthFirstDay + daysInThisMonth - 1) % 7).fill(0).map((day, i) => i + 1)

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    return (
      <div className={classes.calendar}>
        {days.map(day => (
          <div className={cx(classes.dayBar, classes.day)} key={day}>{day}</div>
        ))}
        {prevMonthDays.map(day => (
          <div className={cx(classes.day, classes.neighborMonthDay)} key={'prev-' + day}>{day}</div>
        ))}
        {thisMonthDays.map(day => {
          const dateReminders = reminders.filter(v => v.date === format(new Date(year, month, day), 'MM/DD/YYYY'))
          const sortedDateReminders = fp.orderBy(['time'], ['asc'])(dateReminders).slice(0, 3)
          return (
            <div
              className={cx(classes.day, {[classes.reminderDay]: sortedDateReminders.length})}
              key={'this-' + day}
              style={sortedDateReminders.length > 0 ? { 'borderTopColor': sortedDateReminders[0].color } : null
            }
            >
              {day}
              {fp.orderBy(['time'], ['asc'])(sortedDateReminders).map(reminder => (
                <div className={classes.reminder} key={reminder.id} style={{'color': reminder.color}}>
                  <div className={classes.reminderTime}>{reminder.time}</div>
                  <div className={classes.reminderText}>{reminder.text}</div>
                </div>
              ))}
            </div>
          )
        })}
        {nextMonthDays.map(day => (
          <div className={cx(classes.day, classes.neighborMonthDay)} key={'next-' + day}>{day}</div>
        ))}
      </div>
    )
  }
}

const selector = createStructuredSelector({
  reminders: reminderSelector,
});

export default compose(
  connect(selector),
  withStyles(styles)
)(Calendar);