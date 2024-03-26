import { GetProfile } from "../../contoller/paciente/PerfilController"; 
import { CustomButton } from "../../components/customButton";
import { GenderOptions, DiabetesOptions } from "../../utils/options";
import { CenterContent } from "../../components/centerContent";
import { PopUpContainer } from "../../components/popUpContainer";
import { MainContainer } from "../../components/mainContainer";
import { Row } from "../../components/row";
import { RowItem } from "../../components/rowItem";
import { Column } from "../../components/column";
import { EditPerfil } from "./perfilEdit";

const Perfil = () => {
  const [
    userProfile, 
    setUserProfile,
    refreshUserInfo,
    submitProfile,
    showPopUp,
    setShowPopUp    
  ] = GetProfile("1");

  const closePopUp = () => {
    setShowPopUp(false);
    refreshUserInfo();
  }

  return (
    <div>
      <PopUpContainer showPopUp={showPopUp} closePopUp={closePopUp}>
        <MainContainer>
          <EditPerfil
            closePopUp={closePopUp}
            defaultProfile={userProfile}
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            refreshUserInfo={refreshUserInfo}
            submitProfile={submitProfile}
          />
        </MainContainer>
      </PopUpContainer>
      
      <h3 className="Auth-form-title">Perfil</h3>
      {userProfile &&
      <Column>
        <Row>
          <RowItem grow>
            <Column>
              <text style={{fontWeight: "bold"}}>Nome</text>
              <text>{userProfile.nome}</text>
            </Column>
          </RowItem>
          <RowItem grow>
            <Column>
              <text style={{fontWeight: "bold"}}>Email</text>
              <text>{userProfile.email}</text>
            </Column>
          </RowItem>
          <RowItem grow>
            <Column>
              <text style={{fontWeight: "bold"}}>CPF</text>
              <text>{userProfile.cpf}</text>
            </Column>
          </RowItem>
        </Row>
        <Row>
          <RowItem grow>
            <Column>
              <text style={{fontWeight: "bold"}}>Data de nascimento</text>
              <text>{userProfile.data_de_nascimento}</text>
            </Column>
          </RowItem>
          <RowItem grow>
            <Column>
              <text style={{fontWeight: "bold"}}>Gênero</text>
              <text>{GenderOptions[userProfile.genero]}</text>
            </Column>
          </RowItem>
          <RowItem grow/>
        </Row>
        <Row>
          <RowItem grow>
            <Column>
              <text style={{fontWeight: "bold"}}>CEP</text>
              <text>{userProfile.cep}</text>
            </Column>
          </RowItem>
          <RowItem grow flex={3}>
            <Column>
              <text style={{fontWeight: "bold"}}>Logradouro</text>
              <text>{userProfile.logradouro}</text>
            </Column>
          </RowItem>
          <RowItem grow>
            <Column>
              <text style={{fontWeight: "bold"}}>número</text>
              <text>{userProfile.numero}</text>
            </Column>
          </RowItem>
          <RowItem grow>
            <Column>
              <text style={{fontWeight: "bold"}}>Complemento</text>
              <text>{userProfile.complemento}</text>
            </Column>
          </RowItem>
        </Row>
        <Row>
          <RowItem grow>
            <Column>
              <text style={{fontWeight: "bold"}}>Alergias</text>
              <text>{userProfile.alergias}</text>
            </Column>
          </RowItem>
          <RowItem grow>
            <Column>
              <text style={{fontWeight: "bold"}}>Tipo de diabetes</text>
              <text>{DiabetesOptions[userProfile.tipo_diabetes]}</text>
            </Column>
          </RowItem>
        </Row>
      </Column>}
      <br/>
      <CenterContent>
        <CustomButton
          type="primary"
          onClick={() => setShowPopUp(true)}
          title="Editar perfil"
        />
      </CenterContent>
    </div>
  );
};
export default Perfil;
