import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchShowDetails } from '../showsSlice.ts';
import { AppDispatch, RootState } from '../../app/store.ts';

const ShowDetails = () => {
  const {id} = useParams();
  const dispatch: AppDispatch = useDispatch();
  const {selectedShow} = useSelector((state: RootState) => state.shows);
  useEffect(() => {
    dispatch(fetchShowDetails(Number(id)));
  }, [dispatch, id]);
  if (!selectedShow) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>{selectedShow.name}</h1>
      <p>{selectedShow.summary}</p>
    </div>
  );
};

export default ShowDetails;