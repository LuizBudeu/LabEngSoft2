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
  const [userProfile, setUserProfile] = GetProfile("1");
  const [showPopUp, setShowPopUp] = useState(false);

  return (
    <div>
      <PopUpContainer showPopUp={showPopUp} closePopUp={() => setShowPopUp(false)}>
        <MainContainer>
          <EditPerfil closePopUp={() => setShowPopUp(false)} setMainUserProfile={setUserProfile}/>
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
            <td colspan="2">{userProfile.nome}</td>
            <td colspan="2">{userProfile.email}</td>
            <td colspan="2">{userProfile.cpf}</td>
          </tr>
          <tr>
            <th colspan="2">Data de nascimento</th>
            <th colspan="2">Gênero</th>
          </tr>
          <tr>
            <td colspan="2">{userProfile.data_de_nascimento}</td>
            <td colspan="2">{GenderOptions[userProfile.genero]}</td>
          </tr>
          <tr>
            <th colspan="1">CEP</th>
            <th colspan="3">Logradouro</th>
            <th colspan="1">Número</th>
            <th colspan="1">Complemento</th>
          </tr>
          <tr>
            <td colspan="1">{userProfile.cep}</td>
            <td colspan="3">{userProfile.logradouro}</td>
            <td colspan="1">{userProfile.numenro}</td>
            <td colspan="1">{userProfile.complemento}</td>
          </tr>
          <tr>
            <th colspan="3">CRN</th>
          </tr>
          <tr>
            <td colspan="3">{DiabetesOptions[userProfile.tipo_diabetes]}</td>
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
