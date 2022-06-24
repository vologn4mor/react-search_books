import { useParams } from "react-router-dom";
import { connect } from "react-redux/es/exports";
import { loadBook } from "../redux/actions";
import { useEffect } from "react";
import BookImage from "../images/empty_image.jpg";
import { Loader } from "./Loader";
import { Error } from "./Error";

///
/// Вывод детальной информации о книге
///

const BookDetail = (props) => {
  let params = useParams();
  useEffect(() => {
    props.fetchBook(params.id);
  }, []);
  return (
    <>
      {props.book && !props.loader ? (
        <div className="self_book">
          <div className="image_container">
            <img
              className="self_book_image"
              src={
                props.book.volumeInfo.imageLinks
                  ? props.book.volumeInfo.imageLinks.thumbnail
                  : BookImage
              }
              alt={props.book.volumeInfo.title}
            />
          </div>
          <div className="info_container">
            <p className="self_book_category">
              {props.book.volumeInfo.categories
                ? props.book.volumeInfo.categories.join(", ")
                : null}
            </p>
            <p className="self_book_title">{props.book.volumeInfo.title}</p>
            <p className="self_book_author">
              {props.book.volumeInfo.authors
                ? props.book.volumeInfo.authors.join(", ")
                : null}
            </p>
            <p className="self_book_description">
              {props.book.volumeInfo.description
                ? props.book.volumeInfo.description
                : null}
            </p>
          </div>
        </div>
      ) : props.error ? (
        <Error />
      ) : (
        <Loader />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    book: state.book,
    loader: state.loader,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBook: (id) => {
      dispatch(loadBook(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);
