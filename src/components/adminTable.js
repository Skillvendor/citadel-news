import * as React from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import AdminEvents from './adminEvents';
import AdminTableCollaps from './adminTableCollaps';
import { getCalendarEvents } from '../lib/firebase/calendarEvent';


export class Row extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
  }

  render() {
    const { row } = this.props

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => this.setState({ open: !this.state.open })}
            >
              {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align="right">{row.title}</TableCell>
          <TableCell align="right">{row.shortDescription}</TableCell>
          <TableCell align="right">{row.start.toLocaleString()}</TableCell>
          <TableCell align="right">{row.end.toLocaleString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <AdminEvents
                event={row}
              />
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
}

export default class AdminTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      events: []
    }
  }

  async componentDidMount() {
    const events = await getCalendarEvents();
    this.setState({ events })
  }

  render() {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Title</TableCell>
              <TableCell align="right">Short Description</TableCell>
              <TableCell align="right">Start Date</TableCell>
              <TableCell align="right">End Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.events.map((row) => (
              <Row key={`EventTable_${row.id}`} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
