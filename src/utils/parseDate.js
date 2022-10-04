// import fetchDate from './fetchDate'

const fetchDate = (date) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const d = new Date(date);
  const year = d.getFullYear();
  const month_name = d.toLocaleString("default", { month: "short" });
  const day_num = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
  const day = days[d.getDay()];

  // converting to 12 hour format
  const hour = d.getHours() % 12 || 12;
  const min = d.getMinutes() % 12;

  // Adding zeroes
  const finalHour = hour < 10 ? "0" + hour : hour;
  const finalMin = min < 10 ? "0" + min : min;

  const AMPM = d.getHours() < 12 ? "AM" : "PM";

  return { year, month_name, day_num, day, finalHour, finalMin, AMPM };
};

const convertDate = (date) => {
  const { year, month_name, day_num, day, finalHour, finalMin, AMPM } =
    fetchDate(date);

  return `${day_num} ${month_name} ${year}, ${finalHour}:${finalMin} ${AMPM}`;
};

export { fetchDate, convertDate };
