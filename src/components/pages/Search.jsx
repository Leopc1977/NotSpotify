import { observer } from "mobx-react-lite";
import { useStore } from "mobx-utils";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

function Search() {
  const { spotifyLayer } = useStore();
  const { setCurrentPage } = useStore().app;

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!search) {
      setResults([]);
      return;
    }

    // Call the Spotify API to search for the search term
    spotifyLayer.api
      .search(search, ["artist"]) //, "album", "track"])
      .then((data) => {
        let results = [];
        Object.keys(data).forEach((key) => {
          results = results.concat(data[key].items);
        });
        results.sort((a, b) => {
          return a.popularity - b.popularity;
        });
        setResults(results);
      });
  }, [search]);

  return (
    <Container>
      <h1>Search</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
      {results.length > 0 && (
        <div>
          <h1>Results:</h1>
          <ul>
            {results.map((result) => (
              <li
                key={result.id}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setCurrentPage({ type: "artist", data: result });
                }}
              >
                {result.type} - {result.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {!search && (
        <div>
          <h2>Recherches récentes</h2>
          <h2>Parcourir tout</h2>
        </div>
      )}
    </Container>
  );
}

export default observer(Search);
