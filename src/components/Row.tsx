import {
  makeStyles,
  Theme
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../reducers';
import { Cell } from './Cell';

const useStyles = makeStyles((theme: Theme) => ({
  cell: {
    display: 'flex'
  }
}));

export const Row: React.FC<IOwnProps> = props => {

  const classes = useStyles();

  const tableSize = useSelector(
    (state: IState) => state.app.tableSize
  );

  const y = props.y;

  const cells = [];

  for (let x = 0; x < props.x; x++) {
    cells.push(
      <Cell
        key={`${x}-${y}`}
        y={y}
        x={x}
        id={`${x}-${y}`}
      />
    )
  }
  return (
    <div className={classes.cell}>
      {cells}
    </div>
  )
};


interface IOwnProps {
  x: number;
  y: number;
}