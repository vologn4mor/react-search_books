import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {
  CHANGE_TOTAL_ITEMS,
  CLEAR_START_INDEX,
  CLEAR_TOTAL_ITEMS,
  LOAD_DATA,
  SET_SEARCH,
  SET_SORTING,
  SET_START_INDEX,
  SET_URL,
} from "../redux/types";
import { clearData, loadData, setCategories } from "../redux/actions";

///
/// Header с поиском
///

const Header = (props) => {
  let navigate = useNavigate();
  const searchHandler = async () => {
    if (window.location.pathname !== "/") {
      navigate("/");
    }
    props.clearStartIndex();
    await props.loadData(
      props.search,
      props.categories,
      props.sorting,
      props.startIndex
    );
  };

  return (
    <>
      <div className="header">
        <form className="form">
          <div className="search">
            <input
              type="text"
              placeholder="Введите название книги..."
              name="search"
              onChange={(e) => {
                props.setSearch(e.target.value);
              }}
            />
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                searchHandler();
              }}
            >
              <i className="fa fa-search"></i>
            </button>
          </div>
          <div className="filterContainer">
            <div className="filter">
              <p>Categories</p>
              <select onChange={(e) => props.setCategories(e.target.value)}>
                <option>all</option>
                <option>art</option>
                <option>biography</option>
                <option>computers</option>
                <option>history</option>
                <option>medical</option>
                <option>poetry</option>
              </select>
            </div>
            <div className="filter">
              <p>Sorting by</p>
              <select onChange={(e) => props.setSorting(e.target.value)}>
                <option>relevance</option>
                <option>newest</option>
              </select>
            </div>
          </div>
        </form>
      </div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: (search, categories, sorting, startIndex) =>
      dispatch(loadData(search, categories, sorting, startIndex, LOAD_DATA)),
    clearData: () => dispatch(clearData()),
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
    setSearch: (value) => {
      dispatch({ type: SET_SEARCH, value });
    },
    setCategories: (value) => {
      dispatch(setCategories(value));
    },
    setSorting: (value) => {
      dispatch({ type: SET_SORTING, value });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
