import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // // 브라우저 새로고침 없어도 유저를 다른 페이지로 이동시켜주는 컴포넌트 

function Movie({id, coverImg,title,year,summary,genres}){

    return(
        <div>
        <img src={coverImg} alt={title} />
       <h2>
         <Link to={`/movie/${id}`}>{title}({year}) </Link>
         </h2>
       <p>{summary}</p>
       <ul>
         {genres.map((g)=>(
           <li key={g}>{g}</li>
         ))}
       </ul>
       </div>
    )
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    coverImg: PropTypes.string.isRequired,
    title:PropTypes.string.isRequired,
    year:PropTypes.number.isRequired,
    summary :PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Movie;