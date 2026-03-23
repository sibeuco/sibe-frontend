export interface PaginatedResponse<T> {
  contenido: T[];
  totalElementos: number;
  totalPaginas: number;
  paginaActual: number;
}
