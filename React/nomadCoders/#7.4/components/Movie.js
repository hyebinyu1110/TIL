import PropTypes from "prop-types";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom"; // 스크린을 route 별로 생각하기

function Movie({coverImg,title,year,summary,genres}){

    return(
        <div>
        <img src={coverImg} alt={title} />
       <h2>{title}({year}) </h2>
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
    coverImg: PropTypes.string.isRequired,
    title:PropTypes.string.isRequired,
    year:PropTypes.string.isRequired,
    summary :PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Movie;