export const formatoUf = (n: number): string =>
  `${n.toLocaleString("es-CL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} UF`;

export const formatoClp = (n: number): string => `$${Math.round(n).toLocaleString("es-CL")}`;
