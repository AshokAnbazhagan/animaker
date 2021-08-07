import { makeStyles, TextField } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../reducers';
import classnames from 'classnames';
import { updateCell } from '../actions/appActions';

const useStyles = makeStyles(() => ({
  cell: {
    width: 80,
    height: 50,
    boxSizing: 'border-box',
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    border: '1px solid #cacaca',
    verticalAlign: 'top',
    fontSize: 15,
    overflow: 'hidden',
    fontWeight: 600
  },
  cellRowHeader: {
    background: '#85F1C7',
    pointerEvents: 'none'
  },
  cellColumnHeader: {
    background: '#F4CDCF',
    pointerEvents: 'none'
  },
  cellIndex: {
    background: 'transparent',
    pointerEvents: 'none'
  },
  textFieldRoot: {
    height: 50,
    '&>input': {
      textAlign: 'center',
      fontSize: 14,
      fontWeight: 600,
      height: 42,
      padding: 0,
      color: 'transparent',
      textShadow: '0 0 0 #000',
      '&:focus': {
        border: '3px #5292f7 solid !important'
      }
    },
    '&:after': {
      border: 'none !important'
    },
    '&:before': {
      border: 'none !important'
    }
  },
  selected: {
    background: '#EAEEFD',
  }
}));

export const Cell: React.FC<IOwnProps> = props => {
  const dispatch = useDispatch();

  const tableSize = useSelector(
    (state: IState) => state.app.tableSize
  );

  const selectedIds = useSelector(
    (state: IState) => state.app.selectedIds
  );

  const byId = useSelector(
    (state: IState) => state.app.byId
  );

  const classes = useStyles();

  const getValue = () => {
    if (props.x === 0 && props.y === 0) {
      return
    }
    if (props.x === 0) {
      return `Label ${props.y}`;
    }
    if (props.y === 0) {
      return `Head ${props.x}`;
    }
    return byId[`${props.x}-${props.y}`] || '';
  }

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 9) {
      if (!e.shiftKey && props.x === tableSize[0] - 1) {
        e.preventDefault();
      }
      if (e.shiftKey && props.x === 1) {
        e.preventDefault();
      }
    }
  }

  const handleChange = (e: any) => {
    dispatch(updateCell(props.id, e.target.value));
  }

  return (
    <TextField
      id={props.id}
      className={classnames(classes.cell, {
        [classes.cellRowHeader]: props.x === 0,
        [classes.cellColumnHeader]: props.y === 0,
        [classes.cellIndex]: props.x === 0 && props.y === 0,
        [classes.selected]: selectedIds.includes(props.id)
      })}
      InputProps={{
        className: classes.textFieldRoot,
      }}
      value={getValue()}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
    />
  )

};

interface IOwnProps {
  x: number;
  y: number;
  id: string;
}