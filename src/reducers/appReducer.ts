import produce, { Draft } from 'immer';
import { AppAction, AppActionTypes, selectedIds } from '../actions/appActions';

export const initialAppState: IAppState = {
  tableSize: [5, 5],
  selectedIds: [],
  byId: {},
  selectIndex: ''
};

export default function appReducer(
  state = initialAppState,
  action: AppAction
) {
  return produce(state, draft => {
    switch (action.type) {
      case AppActionTypes.LOAD_TABLE:
        updateNewCells(draft);
        break;

      case AppActionTypes.UPDATE_CELL:
        draft.byId[action.payload.key] = action.payload.value;
        break;

      case AppActionTypes.ADD_ROW:
        draft.tableSize[1] = draft.tableSize[1] + 1;
        updateNewCells(draft);
        break;

      case AppActionTypes.ADD_COLUMN:
        draft.tableSize[0] = draft.tableSize[0] + 1;
        updateNewCells(draft);
        break;

      case AppActionTypes.SELECT_INDEX:
        draft.selectIndex = action.payload.id;
        break;

      case AppActionTypes.SELECT_IDS:
        if (!draft.selectedIds.includes(action.payload.id)) {
          draft.selectedIds.push(action.payload.id);
        }
        break;

      case AppActionTypes.CLEAR_IDS:
        draft.selectedIds = [];
        break;

      case AppActionTypes.PASTE_DATA:
        const { ids } = action.payload;
        let count = 0;
        for (var i = 0; i < ids.length; i++) {
          const firstYId = ids[0].split('-')[1];
          const currentYId = ids[i].split('-')[1];
          if (firstYId === currentYId) {
            count++;
          } else {
            break;
          }
        }
        let newCount = count;
        const idxIndex = draft.selectIndex.split('-');
        let xIndex = parseInt(idxIndex[0]);
        let yIndex = parseInt(idxIndex[1]);
        let x = xIndex;
        let y = yIndex;
        let key = draft.selectIndex;
        for (var i = 0; i < ids.length; i++) {
          let ind = ids[i];
          if (newCount === 0) {
            newCount = count;
            x = xIndex;
            y++;
            key = `${x}-${y}`;
            if (y > draft.tableSize[1] - 1) {
              draft.tableSize[1] = draft.tableSize[1] + 1;
              updateNewCells(draft);
            }
          } else {
            if (i !== 0) {
              x++;
              key = `${x}-${y}`;
              if (x > draft.tableSize[0] - 1) {
                draft.tableSize[0] = draft.tableSize[0] + 1;
                updateNewCells(draft);
              }
            }
          }
          draft.byId[key] = draft.byId[ind];
          newCount--;
        }
        break;
    }
  });
}

function updateNewCells(draft: Draft<IAppState>) {
  let byId = { ...draft.byId };
  draft.byId = {};
  for (let i = 1; i < draft.tableSize[0]; i++) {
    for (let j = 1; j < draft.tableSize[1]; j++) {
      let key = `${i}-${j}`;
      draft.byId[key] = byId[key] || '';
    }
  }
}

export interface IAppState {
  tableSize: number[];
  selectedIds: string[];
  byId: {
    [id: string]: any;
  },
  selectIndex: string;
}
