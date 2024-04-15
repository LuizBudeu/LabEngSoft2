import styled from 'styled-components'

export const HSpace = styled.div`
    margin-right: ${({customMarging}) => customMarging ? `${customMarging}px` : "16px"};
`;