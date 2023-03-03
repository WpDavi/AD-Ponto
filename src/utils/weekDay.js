const daysOfTheWeek = [
  'Domingo',
  'Segunda-Feira',
  'Terça-Feira',
  'Quarta-Feira',
  'Quinta-Feira',
  'Sexta-Feira',
  'Sábado',
];

export const revertDate = (date) => date.split('-').reverse().join('/');

export const convertWeekDay = (dateString) => {
  const dateArray = dateString.split('-');
  const date = new Date(
    Number(dateArray[0]),
    Number(dateArray[1] - 1),
    Number(dateArray[2]),
  );
  const positionDay = date.getDay();
  const weekDay = daysOfTheWeek[positionDay];
  return weekDay;
};
