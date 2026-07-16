export const SEASON_EVENT_DATES = {
  puebla: "2027-09-12",
  guadalajara: "2027-10-10",
  leon: "2027-11-07",
  monterrey: "2027-11-28",
  cdmx: "2028-02-13",
} as const;

const seasonYears = Object.values(SEASON_EVENT_DATES).map((date) => Number(date.slice(0, 4)));

export const SEASON_START_YEAR = Math.min(...seasonYears);
export const SEASON_END_YEAR = Math.max(...seasonYears);
export const SEASON_YEAR_RANGE =
  SEASON_START_YEAR === SEASON_END_YEAR
    ? String(SEASON_START_YEAR)
    : `${SEASON_START_YEAR}–${SEASON_END_YEAR}`;
export const SEASON_NAME = `Temporada ${SEASON_YEAR_RANGE}`;
