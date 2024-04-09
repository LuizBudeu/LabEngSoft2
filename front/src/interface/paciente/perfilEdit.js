import { CustomInput } from "../../components/customInput";
import { CustomSelect } from "../../components/customSelect";
import { CustomButton } from "../../components/customButton";
import { Row } from "../../components/row";
import { RowItem } from "../../components/rowItem";
import { Column } from "../../components/column";
import { GenderOptions, DiabetesOptions } from "../../utils/options";

export const EditPerfil = ({closePopUp, userProfile, setUserProfile, submitProfile}) => {
  return (
    <div>
      <h3 className="Auth-form-title">Editar perfil</h3>
      <form onSubmit={submitProfile}>
        <Column>
          <Row>
            <RowItem grow>
              <Column>
                <text style={{fontWeight: "bold"}}>Nome</text>
                <CustomInput
                  name="nome"
                  onChange={(e) => setUserProfile({...userProfile, nome:e.target.value})}
                  value={userProfile?.nome}
                  type="text"
                />
              </Column>
            </RowItem>
            <RowItem grow>
              <Column>
                <text style={{fontWeight: "bold"}}>CPF</text>
                <CustomInput
                  name="cpf"
                  value={userProfile?.cpf}
                  type="text"
                  disabled
                />
              </Column>
            </RowItem>
            <RowItem grow/>
          </Row>
          <Row>
            <RowItem grow>
              <Column>
                <text style={{fontWeight: "bold"}}>Data de nascimento</text>
                <CustomInput
                  name="data_de_nascimento"
                  onChange={(e) => setUserProfile({...userProfile, data_de_nascimento:e.target.value})}
                  value={userProfile?.data_de_nascimento}
                  type="date"
                />
              </Column>
            </RowItem>
            <RowItem grow>
              <Column>
                <text style={{fontWeight: "bold"}}>Gênero</text>
                <CustomSelect 
                  list={GenderOptions}
                  value={userProfile?.genero}
                  onChange={(e) => setUserProfile({...userProfile, genero:e.target.value})}
                />
              </Column>
            </RowItem>
            <RowItem grow/>
          </Row>
          <Row>
            <RowItem grow>
              <Column>
                <text style={{fontWeight: "bold"}}>CEP</text>
                <CustomInput
                  name="cep"
                  onChange={(e) => setUserProfile({...userProfile, cep:e.target.value})}
                  value={userProfile?.cep}
                  type="text"
                />
              </Column>
            </RowItem>
            <RowItem grow flex={3}>
              <Column>
                <text style={{fontWeight: "bold"}}>Logradouro</text>
                <CustomInput
                  name="logradouro"
                  onChange={(e) => setUserProfile({...userProfile, logradouro:e.target.value})}
                  value={userProfile?.logradouro}
                  type="text"
                />
              </Column>
            </RowItem>
            <RowItem grow>
              <Column>
                <text style={{fontWeight: "bold"}}>número</text>
                <CustomInput
                  name="numero"
                  onChange={(e) => setUserProfile({...userProfile, numero:e.target.value})}
                  value={userProfile?.numero}
                  type="text"
                />
              </Column>
            </RowItem>
            <RowItem grow>
              <Column>
                <text style={{fontWeight: "bold"}}>Complemento</text>
                <CustomInput
                  name="complemento"
                  onChange={(e) => setUserProfile({...userProfile, complemento:e.target.value})}
                  value={userProfile?.complemento}
                  type="text"
                />
              </Column>
            </RowItem>
          </Row>
          <Row>
            <RowItem grow>
              <Column>
                <text style={{fontWeight: "bold"}}>Alergias</text>
                <CustomInput
                  name="alergias"
                  onChange={(e) => setUserProfile({...userProfile, alergias:e.target.value})}
                  value={userProfile?.alergias}
                  type="text"
                />
              </Column>
            </RowItem>
            <RowItem grow>
              <Column>
                <text style={{fontWeight: "bold"}}>Tipo de diabetes</text>
                <CustomSelect 
                  list={DiabetesOptions}
                  value={userProfile?.tipo_diabetes}
                  onChange={(e) => setUserProfile({...userProfile, tipo_diabetes:e.target.value})}
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
    </div>
  );
};
