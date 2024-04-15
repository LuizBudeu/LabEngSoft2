import styled from 'styled-components'

export const VSpace = styled.div`
    margin-top: ${({customMarging}) => customMarging ? `${customMarging}px` : "16px"};
`;
