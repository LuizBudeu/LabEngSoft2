// Import the react JS packages
import axios from "axios";
import { useState } from "react"; // Define the Login function.
import { GetProfile } from "../../contoller/paciente/PerfilController"; 
import { useNavigate } from 'react-router-dom';
import { CustomButton } from "../../components/customButton";
import { GenderOptions, DiabetesOptions } from "../../utils/options";

export const Perfil = () => {
  const navigate = useNavigate();
  const [userProfile] = GetProfile("1");

  return (
    <div className="Auth-form-container">
        <div className="Auth-form-content">
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
                <td colspan="1">{userProfile.númenro}</td>
                <td colspan="1">{userProfile.complemento}</td>
              </tr>
              <tr>
                <th colspan="3">Alergias</th>
                <th colspan="3">Tipo de diabetes</th>
              </tr>
              <tr>
                <td colspan="3">{userProfile.alergias}</td>
                <td colspan="3">{DiabetesOptions[userProfile.tipo_diabetes]}</td>
              </tr>
            </table>
          </div>}
          <CustomButton
            onClick={() => navigate('/paciente/perfil/edit')}
            title="Editar perfil"
          />
        </div>
    </div>
  );
};
