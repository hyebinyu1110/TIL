import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // // 브라우저 새로고침 없어도 유저를 다른 페이지로 이동시켜주는 컴포넌트 
import styles from "./Movie.module.css";

function Movie({ id, coverImg, title, year, summary, genres, rating }) {

  return (
    <div className={styles.movie}>
      <img src={coverImg} alt={title} className={styles.movie__img} />
      <div>
        <h2 className={styles.movie__title}>
          <Link to={`/movie/${id}`}>{title}</Link>
        </h2>
        <h3 className={styles.movie__year}>{year}</h3>
        <p>{summary.length > 235 ?  `${summary.slice(0,235)}...` : summary}</p>
        <ul>
          {genres.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>

      </div>
    </div>
  )
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  rating: PropTypes.number
}

export default Movie;