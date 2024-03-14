// Import the react JS packages
import axios from "axios";
import { useState, useHook } from "react"; // Define the Login function.
import { GetProfile, UpdateProfile } from "../../contoller/paciente/PerfilController";
import { CustomInput } from "../../components/customInput";
import { CustomSelect } from "../../components/customSelect";
import { CustomButton } from "../../components/customButton";
import { GenderOptions, DiabetesOptions } from "../../utils/options";
import { useNavigate } from 'react-router-dom';

export const EditPerfil = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = GetProfile("1");

  const submit = async (e) => {
    e.preventDefault(); 
    console.log(e);
    const resp = await UpdateProfile("1",userProfile); 
    if(resp){
      navigate('/paciente/perfil')
    }else{
      alert("Erro ao salvar os dados")
    }
    console.log("olá");
  };

  return (
    <div className="Auth-form-container">
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Perfil</h3>
        {userProfile && <div>
          <form className="Auth-form" onSubmit={submit}>
            <table style={{width:"100%"}}>
              <tr>
                <th colspan="2">Nome</th>
                <th colspan="2">Email</th>
                <th colspan="2">Cpf</th>
              </tr>
              <tr>
                <td colspan="2">
                  <CustomInput
                    name="nome"
                    onChange={(e) => setUserProfile({...userProfile, nome:e.target.value})}
                    value={userProfile.nome}
                    type="text"
                  />
                </td>
                <td colspan="2">
                  <CustomInput
                    name="email"
                    value={userProfile.email}
                    type="email"
                    disabled
                  />
                </td>
                <td colspan="2">
                  <CustomInput
                    name="cpf"
                    value={userProfile.cpf}
                    type="text"
                    disabled
                  />
                </td>
              </tr>
              <tr>
                <th colspan="2">Data de nascimento</th>
                <th colspan="2">Gênero</th>
              </tr>
              <tr>
                <td colspan="2">
                  <CustomInput
                    name="data_de_nascimento"
                    onChange={(e) => setUserProfile({...userProfile, data_de_nascimento:e.target.value})}
                    value={userProfile.data_de_nascimento}
                    type="date"
                  />
                </td>
                <td colspan="2">
                  <CustomSelect 
                    list={GenderOptions}
                    value={userProfile.genero}
                    onChange={(e) => setUserProfile({...userProfile, genero:e.target.value})}
                  />
                </td>
              </tr>
              <tr>
                <th>CEP</th>
                <th colspan="3">Logradouro</th>
                <th>Número</th>
                <th>Complemento</th>
              </tr>
              <tr>
                <td>
                  <CustomInput
                    name="cep"
                    onChange={(e) => setUserProfile({...userProfile, cep:e.target.value})}
                    value={userProfile.cep}
                    type="text"
                  />
                </td>
                <td colspan="3">
                  <CustomInput
                    name="logradouro"
                    onChange={(e) => setUserProfile({...userProfile, logradouro:e.target.value})}
                    value={userProfile.logradouro}
                    type="text"
                  />
                </td>
                <td colspan="1">
                  <CustomInput
                    name="numero"
                    onChange={(e) => setUserProfile({...userProfile, numero:e.target.value})}
                    value={userProfile.numero}
                    type="text"
                  />
                </td>
                <td colspan="1">
                  <CustomInput
                    name="complemento"
                    onChange={(e) => setUserProfile({...userProfile, complemento:e.target.value})}
                    value={userProfile.complemento}
                    type="text"
                  />
                </td>
              </tr>
              <tr>
                <th colspan="3">Alergias</th>
                <th colspan="3">Tipo de diabetes</th>
              </tr>
              <tr>
                <td colspan="3">
                  <CustomInput
                    name="alergias"
                    onChange={(e) => setUserProfile({...userProfile, alergias:e.target.value})}
                    value={userProfile.alergias}
                    type="text"
                  />
                </td>
                <td colspan="3">
                  <CustomSelect 
                    list={DiabetesOptions}
                    value={userProfile.tipo_diabetes}
                    onChange={(e) => setUserProfile({...userProfile, tipo_diabetes:e.target.value})}
                  />
                </td>
              </tr>
              <tr>
                <td colspan="3">
                  <CustomButton
                    type="submit"
                    title="Salvar alterações"
                  />
                </td>
                <td colspan="3">
                  <CustomButton
                    // type="submit"
                    onClick={() => navigate('/paciente/perfil')}
                    title="Cancelar"
                  />
                </td>
              </tr>
            </table>
          </form>
        </div>}
      </div>
    </div>
  );
};
