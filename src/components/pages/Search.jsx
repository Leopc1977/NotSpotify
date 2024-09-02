import { observer } from "mobx-react-lite";
import { useStore } from "mobx-utils";
import { useEffect, useState } from "react";
import styled from "styled-components";
import sortBySimilarity from "../../utils/sortBySimilarity";

const Container = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TitleStyled = styled.div`
  font-size: 20px;

  display: flex;
  gap: 20px;
`;

const SearchContainer = styled.div``;

const InputStyled = styled.input``;

const ResultList = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;
`;

const ResultItem = styled.div`
  cursor: pointer;

  border: 1px solid white;
  border-radius: 5px;

  width: 100%; /* Largeur fixe pour chaque enfant */
  height: 50px; /* Hauteur fixe pour chaque enfant */
  display: flex;
  align-items: center; /* Centrer le contenu verticalement */
  justify-content: center; /* Centrer le contenu horizontalement */

  gap: 5px;
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
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
    if (result.type === "track") {
      spotifyLayer.api.player.startResumePlayback(
        spotifyLayer.deviceId,
        undefined,
        [result.uri],
      );
      return;
    }
    setCurrentPage({ type: result.type, data: result });
  };

  return (
    <Container>
      <TitleStyled>
        Search
        <InputStyled
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </TitleStyled>
      {results.length > 0 && (
        <SearchContainer>
          <TitleStyled>Results:</TitleStyled>
          <ResultList>
            {results.map((result) => {
              return (
                <ResultItem
                  key={result.id}
                  onClick={() => handleClickOnResultItem(result)}
                >
                  {result.images && <Image src={result?.images[0]?.url} />}
                  {result.type} - {result.name}
                </ResultItem>
              );
            })}
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
