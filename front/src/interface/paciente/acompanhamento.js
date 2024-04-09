// Import the react JS packages
import { useState } from "react"; // Define the Login function.
import { GetAcompanhemntos } from "../../contoller/paciente/AcompanhamentoController"; 
import { GetProfessionals } from "../../contoller/paciente/AgendaController"; 
import { VerticalLine } from "../../components/verticalLine";
import { AppointmentItem } from "../../components/appointmentItem";
import { AcompanhamentoInfo } from "../../components/acompanhamentoInfo";
import { Row } from "../../components/row";
import { RowItem } from "../../components/rowItem";
import { CenterContent } from "../../components/centerContent";
import { PopUpContainer } from "../../components/popUpContainer";
import { MainContainer } from "../../components/mainContainer";
import { ProfessionalInfo } from "../../components/professionalInfo";
import { TipoProfissionalId } from "../../utils/options";
import { ScrollContainer } from "../../components/scrollContainer";

const Acompanhamento = () => {
  const [
    dieta, 
    treino, 
    examesMedico, 
    examesNutricionais, 
    selectedAcompanhamento, 
    changeSelectedAcompanhamento,
    showPopUp, 
    setShowPopUp
  ] = GetAcompanhemntos();

  const [
    professionals, 
    selectedProfessional, 
    professionalType, 
    setProfessionalType,
    professionalName, 
    setProfessionalName,
    submitSearch,
    changeSelectedProfessional,
    horarios,
    requestAppointment
  ] = GetProfessionals(()=>setShowPopUp(false));

  return (
    <div>
      {selectedAcompanhamento && 
      (selectedAcompanhamento.type=="exameMedico" || selectedAcompanhamento.type=="exameNutricionista") && (
        <PopUpContainer showPopUp={showPopUp} closePopUp={() => setShowPopUp(false)}>
          <MainContainer>
            <ProfessionalInfo 
              professional={selectedAcompanhamento?.professional}
              horarios={horarios}
              requestAppointment={requestAppointment}
            />
          </MainContainer>
        </PopUpContainer>
      )}
      
      <Row>
        <RowItem grow noPadding>
          <ScrollContainer>
            <div>
              <h3 className="Auth-form-title">Seus acompanhementos</h3>
              {(dieta || treino) && <h4 className="Auth-form-title">Diretrizes</h4>}
              {dieta && (
                <AppointmentItem
                  type={TipoProfissionalId.nutricionista}
                  text="Dieta"
                  onClick={() => changeSelectedAcompanhamento(dieta, "dieta")}
                  selected={dieta == selectedAcompanhamento?.acompanhamento}
                />
              )}
              {treino && (
                <AppointmentItem
                  type={TipoProfissionalId.preparadorFisico}
                  text="Treino"
                  onClick={() => changeSelectedAcompanhamento(treino, "treino")}
                  selected={treino == selectedAcompanhamento?.acompanhamento}
                />
              )}
              {(examesMedico.length != 0 || examesNutricionais.length != 0) && <h4 className="Auth-form-title">Exames</h4>}
              {examesMedico.map((exame)=>(
                <AppointmentItem
                  type={TipoProfissionalId.medico}
                  text={exame.titulo}
                  onClick={() => changeSelectedAcompanhamento(exame, "exameMedico")}
                  selected={exame == selectedAcompanhamento?.acompanhamento}
                />
              ))}
              {examesNutricionais.map((exame)=>(
                <AppointmentItem
                  type={TipoProfissionalId.nutricionista}
                  text={exame.tipo_exame}
                  onClick={() => changeSelectedAcompanhamento(exame, "exameNutricionista")}
                  selected={exame == selectedAcompanhamento?.acompanhamento}
                />
              ))}
            </div>
          </ScrollContainer>
        </RowItem>
        <RowItem noPadding>
          <VerticalLine/>
        </RowItem>
        <RowItem grow noPadding>
          {selectedAcompanhamento ? (
            <AcompanhamentoInfo 
              acompanhamento={selectedAcompanhamento?.acompanhamento} 
              type={selectedAcompanhamento?.type}
              scheduleAppointment={() => {
                setShowPopUp(true);
                changeSelectedProfessional(selectedAcompanhamento?.professional)
              }}
            />
          ) : (
            <CenterContent>
              <text>Selecione um acompanhamento</text>
            </CenterContent>
          )}
        </RowItem>
      </Row>
    </div>
  );
};

export default Acompanhamento;