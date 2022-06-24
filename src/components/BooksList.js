// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux/es/exports";
import BookImage from "../images/empty_image.jpg";
import {
  CHANGE_TOTAL_ITEMS,
  CLEAR_DATA,
  CLEAR_START_INDEX,
  CLEAR_TOTAL_ITEMS,
  LOAD_MORE_DATA,
  SET_START_INDEX,
  SET_URL,
} from "../redux/types";
import { loadData } from "../redux/actions";
import { Loader } from "./Loader";
import { Error } from "./Error";
import { useEffect, useState } from "react";

///
/// Вывод списка всех книг
///

const BooksList = (props) => {
  let navigate = useNavigate();
  const [position, setPosition] = useState(0);
  const bookClickHandler = (id) => {
    navigate(`/book/${id}`);
  };

  const scrollToPosition = () => {
    if (props.data.length > 30) {
      window.scrollTo({
        top: position,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToPosition();
  }, [props.data]);

  return (
    <>
      {props.error ? <Error /> : null}
      {props.loader ? <Loader /> : null}
      {props.totalItems && !props.loader ? (
        <h2 style={{ textAlign: "center" }}>
          Количество найденных книг - {props.totalItems}
        </h2>
      ) : props.loader ? null : null}

      <div className="booksContainer">
        {props.data.length && !props.loader ? (
          props.data.map((item) => {
            return (
              <div
                className="book"
                key={item.id}
                onClick={() => bookClickHandler(item.id)}
              >
                <img
                  className="image_book"
                  src={
                    item.volumeInfo.imageLinks
                      ? item.volumeInfo.imageLinks.thumbnail
                      : BookImage
                  }
                  alt={item.volumeInfo.title}
                />
                <p className="category_book">
                  {item.volumeInfo.categories
                    ? item.volumeInfo.categories[0]
                    : null}
                </p>
                <p className="title_book">{item.volumeInfo.title}</p>
                <p className="author_book">
                  {item.volumeInfo.authors
                    ? item.volumeInfo.authors.join(", ")
                    : null}
                </p>
              </div>
            );
          })
        ) : !props.loader ? (
          <div>Начните поиск книг</div>
        ) : null}
      </div>
      <>
        {props.startIndex <= props.totalItems &&
        props.totalItems > 31 &&
        !props.loader ? (
          <button
            className="btn_load"
            role="button"
            onClick={() => {
              setPosition(window.pageYOffset);
              props.loadMoreData(
                props.search,
                props.categories,
                props.sorting,
                props.startIndex
              );
            }}
          >
            Load more
          </button>
        ) : null}
      </>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.data,
    totalItems: state.totalItems,
    startIndex: state.startIndex,
    search: state.search,
    categories: state.categories,
    sorting: state.sorting,
    loader: state.loader,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMoreData: (search, categories, sorting, startIndex) =>
      dispatch(
        loadData(search, categories, sorting, startIndex, LOAD_MORE_DATA)
      ),
    clearData: () => dispatch({ type: CLEAR_DATA }),
    changeTotalItems: (items) => dispatch({ type: CHANGE_TOTAL_ITEMS, items }),
    clearTotalItems: () => {
      dispatch({ type: CLEAR_TOTAL_ITEMS });
    },
    setURL: (url) => {
      dispatch({ type: SET_URL, url });
    },
    setStartIndex: () => {
      dispatch({ type: SET_START_INDEX });
    },
    clearStartIndex: () => {
      dispatch({ type: CLEAR_START_INDEX });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
