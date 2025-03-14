import styled from "styled-components";

const ContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageStyled = styled.img`
  width: 100px;
  height: 100px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;

const TitleStyled = styled.div`
  font-size: 24px;
`;

const SubTitle = styled.div`
  font-size: 18px;
  color: white;
`;

function Header(props) {
  const { title, subTitle, imageUrl } = props;

  return (
    <ContainerStyled>
      {imageUrl && <ImageStyled src={imageUrl} />}
      <ContentContainer>
        <TitleStyled>{title}</TitleStyled>
        <SubTitle>{subTitle}</SubTitle>
      </ContentContainer>
    </ContainerStyled>
  );
}

export default Header;
