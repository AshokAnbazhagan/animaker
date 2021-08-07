export enum AppActionTypes {
  LOAD_TABLE = 'app/loadTable',
  UPDATE_CELL = 'app/updatecell',
  ADD_ROW = 'app/addRow',
  ADD_COLUMN = 'app/addColumn',
  SELECT_INDEX = 'app/selectIndex',
  SELECT_IDS = 'app/selectIds',
  CLEAR_IDS = 'app/clearIds',
  PASTE_DATA = 'app/pasteData'
}

export function loadTable(): ILoadTableAction {
  return {
    type: AppActionTypes.LOAD_TABLE,
  };
}

export function updateCell(key: string, value: any): IUpdateCellAction {
  return {
    type: AppActionTypes.UPDATE_CELL,
    payload: {
      key,
      value
    }
  };
}

export function addRow(): IAddRowAction {
  return {
    type: AppActionTypes.ADD_ROW,
  };
}

export function addColumn(): IAddColumnAction {
  return {
    type: AppActionTypes.ADD_COLUMN,
  };
}

export function selectIndex(id: string): ISelectIndexAction {
  return {
    type: AppActionTypes.SELECT_INDEX,
    payload: {
      id
    }
  };
}

export function selectedIds(id: string): ISelectIdsAction {
  return {
    type: AppActionTypes.SELECT_IDS,
    payload: {
      id
    }
  };
}

export function clearIds(): IClearIdsAction {
  return {
    type: AppActionTypes.CLEAR_IDS,
  };
}

export function pasteData(ids: string[]): IPasteDataAction {
  return {
    type: AppActionTypes.PASTE_DATA,
    payload: {
      ids
    }
  };
}

export interface IUpdateCellAction {
  type: AppActionTypes.UPDATE_CELL;
  payload: {
    key: string;
    value: any;
  }
}

export interface ILoadTableAction {
  type: AppActionTypes.LOAD_TABLE;
}

export interface IAddRowAction {
  type: AppActionTypes.ADD_ROW;
}

export interface IAddColumnAction {
  type: AppActionTypes.ADD_COLUMN;
}

export interface ISelectIdsAction {
  type: AppActionTypes.SELECT_IDS;
  payload: {
    id: string;
  }
}

export interface ISelectIndexAction {
  type: AppActionTypes.SELECT_INDEX;
  payload: {
    id: string;
  }
}

export interface IClearIdsAction {
  type: AppActionTypes.CLEAR_IDS;
}

export interface IPasteDataAction {
  type: AppActionTypes.PASTE_DATA;
  payload: {
    ids: string[];
  }
}

export type AppAction =
  | ILoadTableAction
  | IUpdateCellAction
  | IAddRowAction
  | IAddColumnAction
  | ISelectIndexAction
  | ISelectIdsAction
  | IClearIdsAction
  | IPasteDataAction;
