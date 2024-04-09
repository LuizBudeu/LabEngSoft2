import styled from 'styled-components'
import { Colors } from "../utils/colors";
import { CenterContent } from './centerContent';

export const Style = styled.div`
  background-color: ${Colors.LightGray};
  width: 3px;
  height: 90%;
  algin-items: center;
`

export const VerticalLine = () => {
  return(
    <CenterContent>
      <Style/>
    </CenterContent>
  )
}