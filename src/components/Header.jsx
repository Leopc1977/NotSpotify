import { useStore } from "mobx-utils";
import MenuSvg from "../assets/menu.svg?react";
import styled from "styled-components";
import { useState } from "react";

const MenuStyled = styled.div`
  cursor: pointer;
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
    console.log(
      sideBarState,
      "=>",
      sideBarState === "closed" || sideBarState === "floating"
        ? "fixed"
        : "closed",
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50px",
        backgroundColor: "black",
        color: "white",
        borderBottom: "2px solid white",
      }}
    >
      <MenuStyled>
        <MenuSvg
          style={{
            position: "absolute",
            left: 10,
            width: 30,
            height: 30,
            fill: "white",
            top: 10,
            transition: "transform 0.2s ease", // Smooth transition for transform
            transform: isShrunk ? "scale(0.8)" : "scale(1)", // Conditional scaling
          }}
          onClick={(e) => {
            toggleSideBarState();
            toggleShrink();
          }}
          onMouseMove={(e) => {
            e.stopPropagation();
          }}
        />
      </MenuStyled>
      <div
        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        onClick={() => {
          setCurrentPage({ type: "home", data: {} });
        }}
      >
        <p>|||</p>
        <h1>SpotifyLayer</h1>
        <p>|||</p>
      </div>
    </div>
  );
}

export default Header;
