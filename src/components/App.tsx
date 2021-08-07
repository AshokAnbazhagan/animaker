import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addColumn, addRow, loadTable } from '../actions/appActions';
import { Table } from './Table';

const useStyles = makeStyles(() => ({
  tableLayout: {
    display: 'flex'
  },
  button: {
    background: '#000',
    color: '#fff',
    fontWeight: 600,
    height: 50,
    borderRadius: 0,
    border: '1px solid #cacaca',
    minWidth: 'auto',
    '&:hover': {
      background: '#000',
      opacity: 0.7
    }
  }
}));

export const App: React.FC = props => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTable());
  }, []);

  return (
    <div>
      <div className={classes.tableLayout}>
        <Table />
        <Button className={classes.button} onClick={() => dispatch(addColumn())}> Add Column</Button>
      </div>
      <Button className={classes.button} onClick={() => dispatch(addRow())}> Add Row</Button>
    </div>
  )
}


