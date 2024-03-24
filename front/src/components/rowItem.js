import styled from 'styled-components'

export const RowItem = ({grow, center, flex, noPadding, children, customPadding}) => {
    const RowItemStyle = styled.div`
        flex: ${flex != null ? flex : (grow ? "1" : "0")};
        display: flex;
        padding: ${noPadding ? "0px" : customPadding ? customPadding+"px" : "16px"};
        justify-content: ${center ? "center" : "null"};
    `

    return(
        <RowItemStyle>
            {children}
        </RowItemStyle>
    );
}