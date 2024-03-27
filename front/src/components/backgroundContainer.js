import styled from 'styled-components'
import { Colors } from "../utils/colors";

export const BackgroundContainer = styled.div`
    background-color: ${Colors.BackgroundGray};
    height: ${window.innerHeight-95}px;
    display: flex;
    flex-flow: column;
`