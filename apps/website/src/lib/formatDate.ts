const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export function formatDateLong(dateStr: string, endDateStr?: string): string {
  const start = new Date(dateStr + "T00:00:00");
  const startDay = start.getDate();
  const startMonth = MONTHS[start.getMonth()];
  const startYear = start.getFullYear();

  if (!endDateStr) return `${startDay} de ${startMonth} ${startYear}`;

  const end = new Date(endDateStr + "T00:00:00");
  const endDay = end.getDate();
  const endMonth = MONTHS[end.getMonth()];

  if (startMonth === endMonth) {
    return `${startDay}–${endDay} de ${startMonth} ${startYear}`;
  }
  return `${startDay} ${startMonth} – ${endDay} ${endMonth} ${startYear}`;
}
