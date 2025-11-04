// src/app/shared/utils/date-utils.ts
export function parsearFechaSinZonaHoraria(fechaString: string): Date | null {
  try {
    let year: number;
    let month: number;
    let day: number;

    if (/^\d{4}-\d{2}-\d{2}/.test(fechaString)) {
      const partes = fechaString.split(/[-T\s]/);
      year = +partes[0];
      month = +partes[1] - 1;
      day = +partes[2];
    } else if (/^\d{4}\/\d{2}\/\d{2}/.test(fechaString)) {
      const partes = fechaString.split('/');
      year = +partes[0];
      month = +partes[1] - 1;
      day = +partes[2];
    } else if (/^\d{2}\/\d{2}\/\d{4}/.test(fechaString)) {
      const partes = fechaString.split('/');
      day = +partes[0];
      month = +partes[1] - 1;
      year = +partes[2];
    } else {
      const fechaTemp = new Date(fechaString);
      if (isNaN(fechaTemp.getTime())) return null;
      year = fechaTemp.getFullYear();
      month = fechaTemp.getMonth();
      day = fechaTemp.getDate();
    }

    const fecha = new Date(year, month, day, 12, 0, 0, 0);
    if (fecha.getFullYear() !== year || fecha.getMonth() !== month || fecha.getDate() !== day) {
      return null;
    }

    return fecha;
  } catch {
    return null;
  }
}
