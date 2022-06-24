import { KEY, URL } from "../consts";
import {
  CLEAR_DATA,
  CLEAR_TOTAL_ITEMS,
  HIDE_ERROR,
  HIDE_LOADER,
  LOAD_BOOK,
  SET_CATEGORIES,
  SHOW_ERROR,
  SHOW_LOADER,
} from "./types";

export function clearData() {
  return {
    type: CLEAR_DATA,
  };
}

export function setCategories(value) {
  return {
    type: SET_CATEGORIES,
    value,
  };
}

// загрузка данных с сервера при первом поиске и load more
export function loadData(search, categories, sorting, startIndex, type) {
  clearData();
  return function (dispatch) {
    dispatch({ type: SHOW_LOADER });
    dispatch({ type: HIDE_ERROR });
    let fetchCategories = categories === "all" ? "" : "+subject:" + categories;
    let fetchURL =
      URL +
      "volumes?q=" +
      search +
      fetchCategories +
      "&orderBy=" +
      sorting +
      "&maxResults=30" +
      "&startIndex=" +
      startIndex +
      "&key=" +
      KEY;
    fetch(fetchURL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.totalItems !== 0) {
          dispatch({
            type,
            data: data.items,
            totalItems: data.totalItems,
          });
        } else {
          dispatch({ type: CLEAR_DATA });
          dispatch({ type: CLEAR_TOTAL_ITEMS });
          dispatch({ type: SHOW_ERROR });
        }
        dispatch({
          type: HIDE_LOADER,
        });
      })
      .catch((e) => {
        dispatch({
          type: HIDE_LOADER,
        });
        dispatch({ type: SHOW_ERROR });
      });
  };
}

// загрузка информации для получения более детальной информации о книге
export function loadBook(id) {
  return function (dispatch) {
    dispatch({
      type: SHOW_LOADER,
    });
    dispatch({ type: HIDE_ERROR });
    let fetchURL = "https://www.googleapis.com/books/v1/volumes/" + id;
    fetch(fetchURL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          dispatch({ type: SHOW_ERROR });
        } else {
          dispatch({
            type: LOAD_BOOK,
            book: data,
          });
        }
        dispatch({
          type: HIDE_LOADER,
        });
      })
      .catch((e) => {
        dispatch({
          type: HIDE_LOADER,
        });
        dispatch({ type: SHOW_ERROR });
      });
  };
}
