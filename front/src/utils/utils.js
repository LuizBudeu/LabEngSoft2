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

export const GetHourMinute = (strDateTime) => {
    const date = new Date(strDateTime)
    let minutes = date.getMinutes();
    if(minutes < 10){
        minutes = "0" + minutes
    }
    return(date.getHours() + "h" + minutes)
}

export const FormatDate = (strDate) => {
    const date = new Date(strDate)
    console.log(strDate);
    console.log(date);
    console.log("--------------");
    return(DiaDaSemana[date.getUTCDay()] + ", " + date.getUTCDate() + " de " + Meses[date.getUTCMonth()+1] + " de " + date.getUTCFullYear())
}