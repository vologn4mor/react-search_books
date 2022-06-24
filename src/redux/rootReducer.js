import {
  CHANGE_TOTAL_ITEMS,
  CLEAR_DATA,
  CLEAR_START_INDEX,
  CLEAR_TOTAL_ITEMS,
  HIDE_LOADER,
  LOAD_BOOK,
  LOAD_DATA,
  LOAD_MORE_DATA,
  SET_CATEGORIES,
  SET_SEARCH,
  SET_SORTING,
  SET_START_INDEX,
  SET_URL,
  SHOW_ERROR,
  SHOW_LOADER,
  HIDE_ERROR,
} from "./types";

const initialState = {
  data: [],
  totalItems: 0,
  startIndex: 0,
  url: "",
  loader: false,
  categories: "all",
  search: "",
  sorting: "relevance",
  book: null,
  error: false,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DATA:
      return {
        ...state,
        data: action.data,
        totalItems: action.totalItems,
        startIndex: 31,
      };
    case LOAD_MORE_DATA:
      console.log(action.data);
      return {
        ...state,
        data: [...state.data, ...action.data],
        startIndex: state.startIndex + 30,
      };
    case CLEAR_DATA:
      return {
        ...state,
        data: [],
      };
    case CHANGE_TOTAL_ITEMS:
      return {
        ...state,
        totalItems: action.items,
      };
    case CLEAR_TOTAL_ITEMS:
      return {
        ...state,
        totalItems: 0,
      };
    case SET_URL:
      return {
        ...state,
        url: action.url,
      };
    case SET_START_INDEX:
      return {
        ...state,
        startIndex: state.startIndex + 31,
      };
    case CLEAR_START_INDEX:
      return {
        ...state,
        startIndex: 0,
      };
    case SHOW_LOADER:
      return {
        ...state,
        loader: true,
      };
    case HIDE_LOADER:
      return {
        ...state,
        loader: false,
      };
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.value,
      };
    case SET_SORTING:
      return {
        ...state,
        sorting: action.value,
      };
    case SET_SEARCH:
      return {
        ...state,
        search: action.value,
      };
    case LOAD_BOOK:
      return {
        ...state,
        book: action.book,
      };
    case SHOW_ERROR:
      return {
        ...state,
        error: true,
      };
    case HIDE_ERROR:
      return {
        ...state,
        error: false,
      };
    default:
      return {
        ...state,
      };
  }
};
