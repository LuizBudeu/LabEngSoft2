import { useState } from "react"; // Define the Login function.
import { GetProfile } from "../../contoller/nutricionista/PerfilController"; 
import { CustomButton } from "../../components/customButton";
import { GenderOptions } from "../../utils/options";
import { CenterContent } from "../../components/centerContent";
import { PopUpContainer } from "../../components/popUpContainer";
import { MainContainer } from "../../components/mainContainer";
import { EditPerfil } from "./PerfilTabEdit";

const Perfil = () => {
  const [userProfile, setUserProfile, updateProfile, ] = GetProfile();
  const [showPopUp, setShowPopUp] = useState(false);

  const lidarComSubmit = (event) => {
    updateProfile(event);
    setShowPopUp(false);
  }

  return (
    <div>
      <PopUpContainer showPopUp={showPopUp} closePopUp={() => setShowPopUp(false)}>
        <MainContainer>
          <EditPerfil closePopUp={() => setShowPopUp(false)} userProfile={userProfile} setUserProfile={setUserProfile} onSubmit={lidarComSubmit}/>
        </MainContainer>
      </PopUpContainer>
      
      <h3 className="Auth-form-title">Perfil</h3>
      {userProfile && <div>
        <table style={{width:"100%"}}>
          <tr>
            <th colspan="3">Nome</th>
            <th colspan="3">Cpf</th>
          </tr>
          <tr>
            <td align="center" colspan="3">{userProfile.nome}</td>
            <td align="center" colspan="3">{userProfile.cpf}</td>
          </tr>
          <br/>
          <tr>
            <th colspan="2" c>Data de nascimento</th>
            <th colspan="2">Gênero</th>
          </tr>
          <tr>
            <td align="center" colspan="2">{userProfile.data_de_nascimento}</td>
            <td align="center" colspan="2">{GenderOptions[userProfile.genero]}</td>
          </tr>
          <br/>
          <tr>
            <th colspan="1">CEP</th>
            <th colspan="3">Logradouro</th>
            <th colspan="1">Número</th>
            <th colspan="1">Complemento</th>
          </tr>
          <tr>
            <td align="center" colspan="1">{userProfile.cep}</td>
            <td align="center" colspan="3">{userProfile.logradouro}</td>
            <td align="center" colspan="1">{userProfile.numero}</td>
            <td align="center" colspan="1">{userProfile.complemento}</td>
          </tr>
          <br/>
          <tr>
            <th colspan="6">CRN</th>
          </tr>
          <tr>
            <td align="center" colspan="6">{userProfile.crn}</td>
          </tr>
        </table>
      </div>}
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
