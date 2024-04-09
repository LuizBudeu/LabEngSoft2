import styled from 'styled-components'
import { Colors } from "../utils/colors";
import { PopUpContainer } from './popUpContainer';
import { DynamicContainer } from './dynamicContainer';
import { CustomButton } from './customButton';

export const AnonymousPage = ({text, url}) => {

    return(
        <PopUpContainer showPopUp={true} center fill>
            <DynamicContainer>
                <p>{text}</p>
                <CustomButton
                    type="primary"
                    title="Registre-se ou faça Login"
                    onClick={() => window.location.href = url}
                />
            </DynamicContainer> 
        </PopUpContainer>
    )
}