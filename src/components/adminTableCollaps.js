import React from 'react';

export default class AdminTableCollaps extends React.Component {
  constructor(props) {
    super(props)

    const {
      event
    } = props

    this.state = {
      id: event.id,
      title: event.title,
      shortDescription: event.shortDescription,
      description: event.description,
      start: event.start,
      end: event.end,
      eventType: event.eventType,
      event: "",
      loading: false
    };
  }

  handleChange(event, field) {
    this.setState({ [`${field}`]: event.target.value });
  }

  handleDateChange(value, field) {
    this.setState({ [`${field}`]: value });
  }

  render() {
    return (
      <div>
        {
          this.props.event.title
        }
      </div>
    );
  }
}


{/* <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box> */}

