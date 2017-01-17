import {
  IConfiguration, // eslint-disable-line no-unused-vars
} from '@essex/redux-dag-history/lib/interfaces';
import {
  SELECT_MAIN_VIEW,
  SELECT_HISTORY_TYPE,
  TOGGLE_BRANCH_CONTAINER,
  SELECT_BOOKMARK_DEPTH,
  START_PLAYBACK,
  STOP_PLAYBACK,
  BOOKMARK_DRAG_START,
  BOOKMARK_DRAG_HOVER,
  BOOKMARK_DRAG_DROP,
  BOOKMARK_DRAG_CANCEL,
} from './actions';

export const INITIAL_STATE = {
  mainView: 'history',
  historyType: 'branched',
  branchContainerExpanded: true,
  isPlayingBack: false,
  selectedBookmark: undefined,
  selectedBookmarkDepth: undefined,
  bookmarkDragDropSourceIndex: undefined,
  bookmarkDragDropHoverIndex: undefined,
};

export default function (config: IConfiguration<any>) {
  return function reduce(state = INITIAL_STATE, action) {
    let result = state;
    if (action.type === SELECT_MAIN_VIEW) {
      result = {
        ...state,
        mainView: action.payload,
      };
    } else if (action.type === SELECT_HISTORY_TYPE) {
      result = {
        ...state,
        historyType: action.payload,
      };
    } else if (action.type === TOGGLE_BRANCH_CONTAINER) {
      result = {
        ...state,
        branchContainerExpanded: !state.branchContainerExpanded,
      };
    } else if (action.type === SELECT_BOOKMARK_DEPTH) {
      const { depth, bookmarkIndex } = action.payload;
      result = {
        ...state,
        selectedBookmark: bookmarkIndex === undefined ? state.selectedBookmark : bookmarkIndex,
        selectedBookmarkDepth: depth,
      };
    } else if (action.type === START_PLAYBACK) {
      const { initialDepth } = action.payload;
      result = {
        ...state,
        isPlayingBack: true,
        selectedBookmark: 0,
        selectedBookmarkDepth: initialDepth,
      };
    } else if (action.type === STOP_PLAYBACK) {
      result = {
        ...state,
        isPlayingBack: false,
        selectedBookmark: undefined,
        selectedBookmarkDepth: undefined,
      };
    } else if (action.type === BOOKMARK_DRAG_START) {
      result = {
        ...state,
        bookmarkDragDropSourceIndex: action.payload.index,
      };
    } else if (action.type === BOOKMARK_DRAG_HOVER) {
      result = {
        ...state,
        bookmarkDragDropHoverIndex: action.payload.index,
      };
    } else if (action.type === BOOKMARK_DRAG_DROP) {
      result = {
        ...state,
        bookmarkDragDropSourceIndex: undefined,
        bookmarkDragDropHoverIndex: undefined,
      };
    } else if (action.type === BOOKMARK_DRAG_CANCEL) {
      result = {
        ...state,
        bookmarkDragDropSourceIndex: undefined,
        bookmarkDragDropHoverIndex: undefined,
      };
    } else if (action.type.indexOf('DAG_HISTORY_') !== 0 && config.actionFilter(action.type)) {
      // Insertable actions clear the pinned state
      result = {
        ...state,
        mainView: 'history',
        selectedBookmark: undefined,
        selectedBookmarkDepth: undefined,
        bookmarkDragDropSourceIndex: undefined,
        bookmarkDragDropHoverIndex: undefined,
      };
    }
    return result;
  };
}
