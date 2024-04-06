import styled from 'styled-components'
import { Colors } from "../utils/colors";

const ImageStyle = styled.img`
  height: 50px;
`

export const CustomImage = ({imageUrl}) => {
  return (
    <ImageStyle src={process.env.PUBLIC_URL + imageUrl} alt="Logo"/>
  );
};