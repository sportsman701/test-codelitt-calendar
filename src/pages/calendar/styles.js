export default theme => ({
  root: {
    padding: theme.spacing.unit * 2
  },
  calendar: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  day: {
    borderTop: '3px solid white',
    width: '14.28%',
    minHeight: '80px'
  },
  reminderDay: {
    backgroundColor: '#f6f6f6',
    padding: '0 7px 7px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  reminder: {
    textAlign: 'left',
    fontSize: '0.7rem',
    display: 'flex'
  },
  reminderTime: {
    marginRight: '0.5rem'
  },
  reminderText: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  dayBar: {
    minHeight: '40px',
    backgroundColor: 'lightgray',
    padding: '6px',
    marginBottom: '1rem'
  },
  neighborMonthDay: {
    color: 'lightgray'
  }
})
