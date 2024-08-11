import { observer } from "mobx-react-lite";

import styled from "styled-components";

const TitleStyled = styled.div``;

function Home() {
  return <TitleStyled>Home</TitleStyled>;
}

export default observer(Home);
