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

export const API_PROTOCOL_HOSTNAME_PORT = process.env.REACT_APP_PROTOCOL_HOSTNAME_PORT ?? "http://localhost:8000";
export const ENVIROMENT = process.env.REACT_APP_ENVIROMENT === "prod" ? "prod" : "dev";
