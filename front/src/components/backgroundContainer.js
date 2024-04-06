import styled from 'styled-components'
import { Colors } from "../utils/colors";

export const BackgroundContainer = styled.div`
    background-color: ${Colors.BackgroundGray};
    height: ${window.innerHeight}px;
    display: flex;
    flex-flow: column;
`