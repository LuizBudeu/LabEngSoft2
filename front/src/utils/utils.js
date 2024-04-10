export const AppointmentStatus = {
    agendada: 0,
    cancelada: 1,
    realizada: 2,
    vencida: 3,
    pendente: 4,
};

export const AppointmentStatusString = {
    0: "Agendada",
    1: "Cancelada",
    2: "Realizada",
    3: "Vencida",
    4: "Pagamento Pendente",
};

export const formatNumber = (n) => {
    return n > 9 ? "" + n : "0" + n;
};

export const ProfissionalIcons = {
    1: "img/MedicoIcon.png",
    2: "img/DietaIcon.png",
    3: "img/TreinoIcon.png",
};

export const formatCurrency = (val) =>{
    return "R$"+val.toFixed(2).replace(".", ",");;
}

export const API_PROTOCOL_HOSTNAME_PORT = process.env.REACT_APP_PROTOCOL_HOSTNAME_PORT ?? "http://localhost:8000";

export const ENVIRONMENT = process.env.REACT_APP_ENVIRONMENT === "prod" ? "prod" : "dev";

export const TipoDiabetesNumberToString = {
    0: "Não possui diabetes",
    1: "Diabetes tipo 1",
    2: "Diabetes tipo 2",
}

export const ProfileFieldToLabel = {
    ocupacao: 'Ocupação',
    nome: 'Nome',
    cpf: 'CPF',
    data_de_nascimento: 'Data de Nascimento',
    genero: 'Gênero',
    cep: 'CEP',
    logradouro: 'Logradouro',
    numero: 'Número',
    complemento: 'Complemento'
}