import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import React from 'react';
import './style.css';

interface Log {
  id?: string;
  updatedAt: string;
  message: string;
}

interface Props {
  classes: any;
  rows: Array<Log>;
}

const LogsTable: React.FC<Props> = ({ classes, rows }) => (
  <TableContainer component={Paper} className={classes.container}>
    <Table stickyHeader aria-label='sticky table'>
      <TableHead>
        <TableRow>
          {/*<TableCell width={'20px'}>#</TableCell>*/}
          <TableCell width={'100px'}>Time point</TableCell>
          <TableCell align='left'>Log message</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.id}>
            {/*<TableCell component='th' scope='row'>*/}
            {/*  {row.id}*/}
            {/*</TableCell>*/}
            <TableCell component='th' scope='row'>
              {row.updatedAt}
            </TableCell>
            <TableCell align='left'>{row.message}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default LogsTable;
