// Import the react JS packages
import { CustomInput } from "../../components/customInput";
import { CustomSelect } from "../../components/customSelect";
import { CustomButton } from "../../components/customButton";
import { Row } from "../../components/row";
import { RowItem } from "../../components/rowItem";
import { Column } from "../../components/column";
import { GenderOptions } from "../../utils/options";

export const ConsultaForm = ({closePopUp, relatorio, setRelatorio, onSubmit}) => {

  return (
    <div>
      <h3 className="Auth-form-title">Relatório da Consulta</h3>
      <div>
        <form onSubmit={onSubmit}>
            <Column>
                <Column>
                    <text>Detalhes adicionais</text>
                    <CustomInput
                        name="detalhes_adicionais"
                        onChange={(e) => setRelatorio({...relatorio, detalhes_adicionais: e.target.value})}
                        value={relatorio?.detalhes_adicionais}
                        type="text"
                    />
                </Column>

            </Column>
            <CustomButton title="Finalizar consulta" isSubmit type="primary"/>
            <CustomButton title="Cancelar" onClick={() => closePopUp()}/>
        </form>
      </div>
    </div>
  );
};
