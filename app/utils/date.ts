import { format as DateFNSFormat, utcToZonedTime } from "date-fns-tz";
import { pt } from "date-fns/locale";

export type FormatDateType =
  | "dd 'de' MMM 'de' yyyy"
  | "dd/MM/yyyy '-' hh:mm"
  | "dd/MM/yyyy"
  | "yyyy-MM-dd"
  | "hh:mm";

export const formatDate = (
  dateString: string | Date,
  format?: FormatDateType
) => {
  const timeZone = "America/Sao_Paulo";
  const zonedDate = utcToZonedTime(
    dateString instanceof Date ? dateString : new Date(dateString),
    timeZone
  );

  const formatedDate = DateFNSFormat(zonedDate, format || "dd/MM/yyyy", {
    locale: pt,
    timeZone,
  });

  return formatedDate;
};
