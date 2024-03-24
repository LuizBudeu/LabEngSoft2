export const AppointmentStatus = {
    agendada: 0,
    cancelada: 1,
    realizada: 2,
    vencida: 3,
    pendente: 4
};

export const formatNumber = (n) =>{
    return n > 9 ? "" + n: "0" + n;
}

export const ProfissionalIcons = {
    1: "img/MedicoIcon.png",
    2: "img/DietaIcon.png",
    3: "img/TreinoIcon.png",
};
