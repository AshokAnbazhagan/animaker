import {
  makeStyles,
  Theme
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearIds, selectedIds, selectIndex, pasteData } from '../actions/appActions';
import { IState } from '../reducers';
import { Row } from './Row';

declare var window: any;

const useStyles = makeStyles((theme: Theme) => ({

}));

export const Table: React.FC = props => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isCtrlDown, setIsCtrlDown] = useState(false);
  const [startRowIndex, setStartRowIndex] = useState(null);
  const [startCellIndex, setStartCellIndex] = useState(null);

  const tableSize = useSelector(
    (state: IState) => state.app.tableSize
  );

  const selectIds = useSelector(
    (state: IState) => state.app.selectedIds
  );

  const selectedIndex = useSelector(
    (state: IState) => state.app.selectIndex
  );

  useEffect(() => {
    document.addEventListener('keydown', copyPasteCells);
    document.addEventListener('keyup', keyUpCall);
    return () => {
      document.removeEventListener(
        'keydown',
        copyPasteCells
      );
      document.removeEventListener(
        'keyup',
        keyUpCall
      );
    };
  }, [selectIds, isCtrlDown, selectedIndex]);

  const clearClipboard = () => {
    var tempElement = document.createElement("input");
    document.body.appendChild(tempElement);
    tempElement.value = ' ';
    tempElement.select();
    document.execCommand("copy");
    document.body.removeChild(tempElement)
  }

  const copyPasteCells = (e: any) => {
    if (e.keyCode === 17) {
      setIsCtrlDown(true);
    }
    if (isCtrlDown && e.keyCode === 67) {
      setTimeout(() => {
        clearClipboard();
      }, 500);
      if (selectIds.length === 0) {
        localStorage.setItem('copiedCells', JSON.stringify([selectedIndex]));
      } else {
        localStorage.setItem('copiedCells', JSON.stringify(selectIds));
      }
    }
    if (isCtrlDown && e.keyCode === 86) {
      let selectIds = JSON.parse(localStorage.getItem('copiedCells'));
      dispatch(pasteData(selectIds));
    }
  }

  const keyUpCall = (e: any) => {
    if (e.keyCode === 17) {
      setIsCtrlDown(false);
    }
  }

  const handleMouseDown = (e: any) => {
    setIsMouseDown(true);
    var element = document.elementFromPoint(e.clientX, e.clientY);
    if (element.id) {
      const id = element.id.split('-');
      dispatch(selectIndex(element.id))
      setStartCellIndex(parseInt(id[0]));
      setStartRowIndex(parseInt(id[1]));
    }
    dispatch(clearIds());
  }

  const handleMouseOver = (e: any) => {
    if (!isMouseDown) {
      return;
    }
    dispatch(clearIds());
    var element = document.elementFromPoint(e.clientX, e.clientY);
    if (element.id) {
      const id = element.id.split('-');
      var cellIndex = parseInt(id[0]);
      var rowIndex = parseInt(id[1]);

      var rowStart, rowEnd, cellStart, cellEnd;

      if (rowIndex < startRowIndex) {
        rowStart = rowIndex;
        rowEnd = startRowIndex;
      } else {
        rowStart = startRowIndex;
        rowEnd = rowIndex;
      }

      if (cellIndex < startCellIndex) {
        cellStart = cellIndex;
        cellEnd = startCellIndex;
      } else {
        cellStart = startCellIndex;
        cellEnd = cellIndex;
      }
      let arr = [];
      for (var i = rowStart; i <= rowEnd; i++) {
        for (var j = cellStart; j <= cellEnd; j++) {
          dispatch(selectedIds(`${j}-${i}`));
        }
      }
    }
  }

  const handleMouseUp = (e: any) => {
    setIsMouseDown(false);
  }

  const rows = [];

  for (let y = 0; y < tableSize[1]; y++) {
    rows.push(
      <Row
        key={y}
        y={y}
        x={tableSize[0]}
      />,
    )
  }
  return (
    <div onMouseOver={handleMouseOver} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      {rows}
    </div>
  )

};
