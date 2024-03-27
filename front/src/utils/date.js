
const Meses = {
    1: "Janeiro",
    2: "Fevereiro",
    3: "Março",
    4: "Abril",
    5: "Maio",
    6: "Junho",
    7: "Julho",
    8: "Agosto",
    9: "Setembro",
    10: "Outubro",
    11: "Novembro",
    12: "Dezembro"
};

const DiaDaSemana = {
    0: "Domingo",
    1: "Segunda-feira",
    2: "Terça-feira",
    3: "Quarta-feira",
    4: "Quinta-feira",
    5: "Sexta-feira",
    6: "Sábado"
};

export const getBaseDate = (dateString) => dateString.split('T')[0];

export const getHourFromDate = (dateString) => dateString.split('T')[1];

export const getLabelDay = (dateString) => (new Date(dateString)).toDateString();

export const GetHourMinute = (strDateTime, minDuration=60) => {
    const dateInit = new Date(strDateTime);
    const dateEnd = new Date(dateInit.getTime() + minDuration*60000);
    let minutesInit = dateInit.getMinutes();
    if(minutesInit < 10){
        minutesInit = "0" + minutesInit;
    }
    let minutesEnd = dateEnd.getMinutes();
    if(minutesEnd < 10){
        minutesEnd = "0" + minutesEnd;
    }
    return(dateInit.getHours() + "h" + minutesInit + " - " + dateEnd.getHours() + "h" + minutesEnd)
}

export const FormatDate = (strDate) => {
    const date = new Date(strDate)
    return(DiaDaSemana[date.getUTCDay()] + ", " + date.getUTCDate() + " de " + Meses[date.getUTCMonth()+1] + " de " + date.getUTCFullYear())
}

export const getMonthName = (strDate) => {
    const date = new Date(strDate)
    return(Meses[date.getUTCMonth()+1])
}

export const getDate = (strDate) => {
    const date = new Date(strDate)
    return(date.getUTCDate() + "/" + date.getUTCMonth() + "/" + date.getUTCFullYear())
}