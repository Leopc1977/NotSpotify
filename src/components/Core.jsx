import { observer } from "mobx-react-lite";
import { useStore } from "mobx-utils";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: red;
`

function Core() {
  const { app } = useStore()

  return (
    <Container>
      <h1>Core</h1>
    </Container>
  );
}

export default observer(Core);
