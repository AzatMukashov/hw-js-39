import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShows } from '../showsSlice.ts';
import { AppDispatch, RootState } from '../../app/store.ts';
import { Show } from '../../types';

const SearchBar = () => {
  const [query, setQuery] = useState<string>('');
  const dispatch: AppDispatch = useDispatch();
  const {searchResults} = useSelector((state: RootState) => state.shows);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      dispatch(fetchShows(e.target.value));
    }
  };
  return (
    <div>
      <input type="text"
             value={query}
             onChange={handleInputChange}
             placeholder="Search for TV shows"
      />
      {query && (
        <div style={{position: 'absolute', backgroundColor: 'white', border: '1px solid #ccc'}}>
          {searchResults.map((show: Show) => (
            <div key={show.id}>
              <a href={`/shows/${show.id}`}>{show.name}</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;