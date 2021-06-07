import { format as DateFNSFormat, utcToZonedTime } from "date-fns-tz";
import { pt } from "date-fns/locale";

type FormatDateType =
  | "dd 'de' MMM 'de' yyyy"
  | "dd/MM/yyyy '-' hh:mm"
  | "dd/MM/yyyy";

export const formatDate = (dateString: string, format?: FormatDateType) => {
  const timeZone = "America/Sao_Paulo";
  const zonedDate = utcToZonedTime(new Date(dateString), timeZone);

  return DateFNSFormat(zonedDate, format || "dd/MM/yyyy", {
    locale: pt,
    timeZone,
  });
};
