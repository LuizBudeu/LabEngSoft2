// Import the react JS packages
import axios from "axios";
import { useState, useHook } from "react"; // Define the Login function.
import { FaSearch } from "react-icons/fa";
import { GetProfessionals } from "../../contoller/paciente/AgendaController"; 
import { GetProfile, UpdateProfile } from "../../contoller/paciente/PerfilController";
import { CustomInput } from "../../components/customInput";
import { CustomSelect } from "../../components/customSelect";
import { CustomButton } from "../../components/customButton";
import { Row } from "../../components/row";
import { RowItem } from "../../components/rowItem";
import { Column } from "../../components/column";
import { VerticalLine } from "../../components/verticalLine";
import { AppointmentItem } from "../../components/appointmentItem";
import { ProfessionalInfo } from "../../components/professionalInfo";
import { CenterContent } from "../../components/centerContent";
import { TipoProfissional } from "../../utils/options";
import { useNavigate } from 'react-router-dom';
import { GetHourMinute, FormatDate } from "../../utils/date";
import { ScrollContainer } from "../../components/scrollContainer";
import { Pressable } from "../../components/pressable";

export const NovaConsulta = ({onSuccess}) => {
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
  ] = GetProfessionals("1", onSuccess);

  return (
    <Row>
      <RowItem grow noPadding>
        <div style={{width: "100%"}}>
          <h3 className="Auth-form-title">Nova consulta</h3>
          <Row>
            <RowItem>
              <CustomSelect
                list={TipoProfissional}
                value={professionalType}
                onChange={(e) => setProfessionalType(e.target.value)}
              />
            </RowItem>
            <RowItem grow flex={2}>
              <CustomInput
                name="nome"
                onChange={(e) => setProfessionalName(e.target.value)}
                value={professionalName}
                placeholder={"pesquise pelo nome"}
                type="text"
                notRequired
              />
            </RowItem>
            <RowItem center>
              <Pressable onClick={submitSearch}>
                <FaSearch />
              </Pressable>
            </RowItem>
          </Row>
          <ScrollContainer>
            {professionals && professionals.length != 0 ? (
            <div>
              {Object.entries(professionals).map(([key, professional]) => (
                <AppointmentItem
                  type={professional.ocupacao}
                  text={professional.nome}
                  onClick={() => changeSelectedProfessional(professional)}
                  selected={professional.id == selectedProfessional?.id}
                />
              ))}
            </div>
            ) : (
              <CenterContent>
                <text>Nenhum profissional encontrado</text>
              </CenterContent>
            )}
          </ScrollContainer>
          
        </div>
      </RowItem>
      <RowItem noPadding>
        <VerticalLine/>
      </RowItem>
      <RowItem grow noPadding>
        {selectedProfessional ? (
          <div style ={{width: "100%"}}>
            <ProfessionalInfo 
              professional={selectedProfessional}
              horarios={horarios}
              requestAppointment={requestAppointment}
            />
          </div>
          
        ) : (
          <CenterContent>
            <text>Selecione um profissional</text>
          </CenterContent>
        )}
      </RowItem>
    </Row>
  );
};
