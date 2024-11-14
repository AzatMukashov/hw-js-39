import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchShowDetails } from "../showsSlice.ts";
import { AppDispatch, RootState } from "../../app/store.ts";

const ShowDetails = () => {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { selectedShow } = useSelector((state: RootState) => state.shows);
  useEffect(() => {
    dispatch(fetchShowDetails(Number(id)));
  }, [dispatch, id]);
  if (!selectedShow) {
    return <div>Loading...</div>;
  }
  return (
    <div
      style={{ display: "flex", alignItems: "flex-start", paddingLeft: "10%" }}
    >
      {selectedShow.image && selectedShow.image.medium && (
        <img src={selectedShow.image.medium} alt={selectedShow.name} />
      )}
      <div style={{ padding: "0px 10% 0px 10px" }}>
        <h1>{selectedShow.name}</h1>
        <p dangerouslySetInnerHTML={{ __html: selectedShow.summary }} />
      </div>
    </div>
  );
};

export default ShowDetails;
