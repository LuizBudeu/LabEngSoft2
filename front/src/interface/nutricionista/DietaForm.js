// Import the react JS packages
import axios from "axios";
import { useState, useHook } from "react"; // Define the Login function.
import { GetProfile, UpdateProfile } from "../../contoller/nutricionista/PerfilController";
import { CustomInput } from "../../components/customInput";
import { CustomSelect } from "../../components/customSelect";
import { CustomButton } from "../../components/customButton";
import { Row } from "../../components/row";
import { RowItem } from "../../components/rowItem";
import { Column } from "../../components/column";
import { GenderOptions } from "../../utils/options";

export const EditPerfil = ({closePopUp, mainUserId, setMainUserProfile}) => {
  const [userProfile, setUserProfile] = GetProfile(mainUserId);

  const submit = async (e) => {
    e.preventDefault(); 
    console.log(e);
    const resp = await UpdateProfile(mainUserId, userProfile); 
    if(resp){
      setMainUserProfile(userProfile);
      closePopUp()
    }else{
      alert("Erro ao salvar os dados")
    }
  };

  return (
    <div>
      <h3 className="Auth-form-title">Editar perfil</h3>
      {userProfile && <div>
        <form onSubmit={submit}>
          <Column>
            <Row>
              <RowItem grow>
                <Column>
                  <text>Nome</text>
                  <CustomInput
                    name="nome"
                    onChange={(e) => setUserProfile({...userProfile, nome:e.target.value})}
                    value={userProfile.nome}
                    type="text"
                  />
                </Column>
              </RowItem>
              <RowItem grow>
                <Column>
                  <text>Email</text>
                  <CustomInput
                    name="email"
                    value={userProfile.email}
                    type="email"
                    disabled
                  />
                </Column>
              </RowItem>
              <RowItem grow>
                <Column>
                  <text>CPF</text>
                  <CustomInput
                    name="cpf"
                    value={userProfile.cpf}
                    type="text"
                    disabled
                  />
                </Column>
              </RowItem>
            </Row>
            <Row>
              <RowItem grow>
                <Column>
                  <text>Data de nascimento</text>
                  <CustomInput
                    name="data_de_nascimento"
                    onChange={(e) => setUserProfile({...userProfile, data_de_nascimento:e.target.value})}
                    value={userProfile.data_de_nascimento}
                    type="date"
                  />
                </Column>
              </RowItem>
              <RowItem grow>
                <Column>
                  <text>Gênero</text>
                  <CustomSelect 
                    list={GenderOptions}
                    value={userProfile.genero}
                    onChange={(e) => setUserProfile({...userProfile, genero:e.target.value})}
                  />
                </Column>
              </RowItem>
              <RowItem grow/>
            </Row>
            <Row>
              <RowItem grow>
                <Column>
                  <text>CEP</text>
                  <CustomInput
                    name="cep"
                    onChange={(e) => setUserProfile({...userProfile, cep:e.target.value})}
                    value={userProfile.cep}
                    type="text"
                  />
                </Column>
              </RowItem>
              <RowItem grow flex={3}>
                <Column>
                  <text>Logradouro</text>
                  <CustomInput
                    name="logradouro"
                    onChange={(e) => setUserProfile({...userProfile, logradouro:e.target.value})}
                    value={userProfile.logradouro}
                    type="text"
                  />
                </Column>
              </RowItem>
              <RowItem grow>
                <Column>
                  <text>Número</text>
                  <CustomInput
                    name="numero"
                    onChange={(e) => setUserProfile({...userProfile, numero:e.target.value})}
                    value={userProfile.numero}
                    type="text"
                  />
                </Column>
              </RowItem>
              <RowItem grow>
                <Column>
                  <text>Complemento</text>
                  <CustomInput
                    name="complemento"
                    onChange={(e) => setUserProfile({...userProfile, complemento:e.target.value})}
                    value={userProfile.complemento}
                    type="text"
                  />
                </Column>
              </RowItem>
            </Row>
            <Row>
              <RowItem grow>
                <Column>
                  <text>CRN</text>
                  <CustomInput
                    name="crn"
                    onChange={(e) => setUserProfile({...userProfile, crn:e.target.value})}
                    value={userProfile.crn}
                    type="text"
                  />
                </Column>
              </RowItem>
            </Row>
            <Row>
              <RowItem grow center noPadding>
                <CustomButton
                  type="primary"
                  isSubmit
                  title="Salvar alterações"
                />
              </RowItem>
              <RowItem grow center noPadding>
                <CustomButton
                  onClick={() => closePopUp()}
                  title="Cancelar"
                />
              </RowItem>
            </Row>
          </Column>
        </form>
      </div>}
    </div>
  );
};
