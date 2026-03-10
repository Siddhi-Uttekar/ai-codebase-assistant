// Browse.js

import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import { useSelector } from "react-redux";
import GptSearch from "./GptSearch";
import useSearchMovies from "../hooks/useSearchMovies";


const Browse = () => {

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const searchQuery = useSelector((store) => store.gpt.searchQuery); // Get search query from the Redux store

  // Fetching and populating the store
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  // Only call useSearchMovies hook when the searchQuery is set and showGptSearch is true
  useSearchMovies(searchQuery);

  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
