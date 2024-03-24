import styled from 'styled-components'
import { Colors } from "../utils/colors";

export const CustomImage = ({imageUrl}) => {
  const ImageStyle = styled.img`
    height: 50px;
  `

  return (
    <ImageStyle src={process.env.PUBLIC_URL + imageUrl} alt="Logo"/>
  );
};