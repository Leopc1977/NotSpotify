import { observer } from "mobx-react-lite";
import { useStore } from "mobx-utils";
import { useEffect, useState } from "react";
import styled from "styled-components";
import sortBySimilarity from "../../utils/sortBySimilarity";

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const TitleStyled = styled.div``;

const SearchContainer = styled.div``;

const InputStyled = styled.input``;

const ResultList = styled.ul``;

const ResultItem = styled.li`
  cursor: pointer;
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
      .search(search, ["artist", "album", "track"])
      .then((data) => {
        let results = [];
        Object.keys(data).forEach((key) => {
          results = results.concat(data[key].items);
        });
        results = sortBySimilarity(search, results);
        setResults(results);
      });
  }, [search]);

  const handleClickOnResultItem = (result) => {
    setCurrentPage({ type: result.type, data: result });
  };

  return (
    <Container>
      <TitleStyled>Search</TitleStyled>
      <InputStyled
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      {results.length > 0 && (
        <SearchContainer>
          <TitleStyled>Results:</TitleStyled>
          <ResultList>
            {results.map((result) => (
              <ResultItem
                key={result.id}
                onClick={() => handleClickOnResultItem(result)}
              >
                {result.type} - {result.name}
              </ResultItem>
            ))}
          </ResultList>
        </SearchContainer>
      )}
      {!search && (
        <>
          <TitleStyled>Recherches récentes</TitleStyled>
          <TitleStyled>Parcourir tout</TitleStyled>
        </>
      )}
    </Container>
  );
}

export default observer(Search);
