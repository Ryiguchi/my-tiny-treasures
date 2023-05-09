import styled from 'styled-components';

export const HeroImg = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
`;

export const HeroTextBox = styled.div`
  position: absolute;
  top: 3rem;
  left: 3rem;
  width: 20rem;
  color: #fff;

  h1 {
    font-weight: 700;
    font-size: 2.6rem;
    line-height: 4rem;
    margin-bottom: 1.2rem;
  }
  p {
    font-size: 1.6rem;
    line-height: 2.2rem;
    width: 18rem;
  }
`;
