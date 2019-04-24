import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Calendar from './calendar'
import styles from './styles';

const years = new Array(50).fill(0).map((v, i) => i + 1990)
const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
]

const menuProps = {
  PaperProps: {
    style: {
      maxHeight: '300px'
    }
  }
}

class Home extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)

    let today = new Date()
    this.state = {
      'year':  today.getFullYear(),
      'month': today.getMonth()
    }
  }

  handleYearChange = e => this.setState({ 'year': e.target.value })

  handleMonthChange = e => this.setState({ 'month': e.target.value })

  render() {
    const { classes } = this.props
    const { year, month } = this.state
    
    return (
      <div className={classes.root}>
        <Paper className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Grid container spacing={24} justify='center'>
                <Grid item>
                  <Select
                    value={year}
                    onChange={this.handleYearChange}
                    MenuProps={menuProps}
                  >
                  {years.map(year => (
                    <MenuItem value={year} key={year}>{year}</MenuItem>
                  ))}
                  </Select>
                </Grid>
                <Grid item>
                  <Select
                    value={month}
                    onChange={this.handleMonthChange}
                    MenuProps={menuProps}
                  >
                  {months.map((month, index) => (
                    <MenuItem value={index} key={index}>{month}</MenuItem>
                  ))}
                  </Select>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Calendar year={year} month={month}/>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}

export default compose(
  withStyles(styles)
)(Home);