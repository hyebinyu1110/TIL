import { useEffect, useState } from "react";
import { useParams} from "react-router-dom" ;
import Movie from "./Movie";


function Detail(){
    const [movie, setMovie] = useState();
    const [loading, setLoading] = useState(true);

    const {id} = useParams(); // App 컴포넌트에서 경로에 : 로 시작하는 경로를 parameter 로 받아 출력함
    const getMovie = async ()=>{
        
        const json = await( 
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
            ).json();
            
           
            setMovie(json.data.movie);
            setLoading(false);
        
         
    }
  
    useEffect(()=>{
        getMovie();
       
    },[])
    console.log(id);
    return(
        <div>
      {loading ? 
      (<h1>Loading...</h1>
      ) : (
      <div>
          <Movie  
                id={movie.id}
                coverImg={movie.medium_cover_image}
                 title={movie.title}
                 year={movie.year} 
                 summary={movie.description_intro}
                 genres={movie.genres}
                 rating={movie.rating} />
       </div>)}
    </div>
    )
}

export default Detail;

// * Navigation Bar 를 만드는 챌린지! 해보기 
// 여기서부터 내가 페이지를 로딩하는 챌린지하기 
// npm i gh-pages 는 github pages 에 업로드할수 있게 해주는 나이스한 패키지 , 깃헙에서 무료로 제공해주는 서비스 , html, css, javascript 를 올리면 그걸 웹사이트로 만들어줘서 전세계에 무료로 배포해준다.  좋은 도메인가짐 결과로