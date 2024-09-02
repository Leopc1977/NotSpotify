import { useStore } from "mobx-utils";
import MenuSvg from "../assets/menu.svg?react";
import styled from "styled-components";
import { useState } from "react";
import { HEADER_HEIGHT } from "../config/config";

const Container = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${HEADER_HEIGHT}px;
  width: 100%;
  background-color: black;
  color: white;
  overscroll-behavior-y: contain;
  z-index: 1;
  margin-bottom: 10px;
`;

const MenuStyled = styled.div`
  cursor: pointer;
`;

const Logo = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const TitleStyled = styled.h1``;
const Decorator = styled.p``;

const MenuSvgStyled = styled(MenuSvg)`
  position: absolute;
  left: 10px;
  width: 30px;
  height: 30px;
  fill: white;
  top: 10px;
  transition: transform 0.2s ease;
  transform: ${(props) => (props.isShrunk ? "scale(0.8)" : "scale(1)")};
`;

function Header() {
  const { sideBarState, setSideBarState, setCurrentPage } = useStore().app;

  const [isShrunk, setIsShrunk] = useState(false); // State to manage the shrink effect

  const toggleShrink = () => {
    setIsShrunk(!isShrunk);
  };

  const toggleSideBarState = () => {
    setSideBarState(
      sideBarState === "closed" || sideBarState === "floating"
        ? "fixed"
        : "closed",
    );
  };

  const handleClickOnMenuIcon = () => {
    toggleSideBarState();
    toggleShrink();
  };

  const handleMouseMoveOnMenuIcon = (e) => {
    e.stopPropagation();
  };

  const handleClickOnLogo = () => {
    setCurrentPage({ type: "home", data: {} });
  };

  return (
    <Container>
      <MenuStyled>
        <MenuSvgStyled
          onClick={handleClickOnMenuIcon}
          onMouseMove={handleMouseMoveOnMenuIcon}
          isShrunk={isShrunk}
        />
      </MenuStyled>
      <Logo onClick={handleClickOnLogo}>
        <Decorator>|||</Decorator>
        <TitleStyled>SpotifyLayer</TitleStyled>
        <Decorator>|||</Decorator>
      </Logo>
    </Container>
  );
}

export default Header;
