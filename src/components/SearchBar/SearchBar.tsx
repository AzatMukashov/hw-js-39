import { ChangeEvent, useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShowDetails, fetchShows } from '../showsSlice.ts';
import { AppDispatch, RootState } from '../../app/store.ts';
import { Show } from '../../types';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState<string>('');
  const [showListVisible, setShowListVisible] = useState<boolean>(true);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const {searchResults} = useSelector((state: RootState) => state.shows);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowListVisible(true);
    if (e.target.value.length > 2) {
      dispatch(fetchShows(e.target.value));
    }
  };
  const handleShowClick = (e: MouseEvent<HTMLAnchorElement>, show: Show) => {
    e.preventDefault();
    setQuery(show.name);
    setShowListVisible(false);
    navigate(`/shows/${show.id}`);
    dispatch(fetchShowDetails(show.id));
  }
  return (
    <div style={{position: 'relative'}}>
      <input type="text"
             value={query}
             onChange={handleInputChange}
             placeholder="Search for TV shows"
             style={{width: '20%', boxSizing: 'border-box'}}
      />
      {query && showListVisible && searchResults.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '40%',
          width: '19.9%',
          backgroundColor: 'gray',
          border: '1px solid #ccc',
        }}>
          {searchResults.map((show: Show) => (
            <div key={show.id}>
              <a
                href={`/shows/${show.id}`}
                onClick={(e) => handleShowClick(e, show)}
              >
                {show.name}</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;