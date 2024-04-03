import { useState } from "react"; // Define the Login function.
import { GetProfile } from "../../contoller/nutricionista/PerfilController"; 
import { useNavigate } from 'react-router-dom';
import { CustomButton } from "../../components/customButton";
import { GenderOptions, DiabetesOptions } from "../../utils/options";
import { CenterContent } from "../../components/centerContent";
import { PopUpContainer } from "../../components/popUpContainer";
import { MainContainer } from "../../components/mainContainer";
import { EditPerfil } from "./PerfilTabEdit";

const Perfil = () => {
  const navigate = useNavigate();
  const test_id = 4 // TODO trocar por id do usuário logado na integração
  const [userProfile, setUserProfile] = GetProfile(test_id);
  const [showPopUp, setShowPopUp] = useState(false);

  return (
    <div>
      <PopUpContainer showPopUp={showPopUp} closePopUp={() => setShowPopUp(false)}>
        <MainContainer>
          <EditPerfil closePopUp={() => setShowPopUp(false)} mainUserId={test_id} setMainUserProfile={setUserProfile}/>
        </MainContainer>
      </PopUpContainer>
      
      <h3 className="Auth-form-title">Perfil</h3>
      {userProfile && <div>
        <table style={{width:"100%"}}>
          <tr>
            <th colspan="2">Nome</th>
            <th colspan="2">Email</th>
            <th colspan="2">Cpf</th>
          </tr>
          <tr>
            <td align="center" colspan="2">{userProfile.nome}</td>
            <td align="center" colspan="2">{userProfile.email}</td>
            <td align="center" colspan="2">{userProfile.cpf}</td>
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
            <th colspan="1">CRN</th>
          </tr>
          <tr>
            <td align="center" colspan="1">{userProfile.crn}</td>
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
