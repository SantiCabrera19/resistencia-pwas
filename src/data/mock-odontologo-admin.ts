export type Turno = {
  id: string;
  paciente: string;
  hora: string;
  tratamiento: string;
  estado: "Confirmado" | "Pendiente" | "En Sala" | "Completado" | "Cancelado";
};

export const MOCK_TURNOS_HOY: Turno[] = [
  { id: "1", paciente: "Martín López", hora: "09:00", tratamiento: "Limpieza", estado: "Completado" },
  { id: "2", paciente: "Sofía Martínez", hora: "09:30", tratamiento: "Ortodoncia Control", estado: "En Sala" },
  { id: "3", paciente: "Carlos Ruiz", hora: "10:00", tratamiento: "Extracción", estado: "Confirmado" },
  { id: "4", paciente: "Ana Gómez", hora: "10:45", tratamiento: "Consulta Inicial", estado: "Pendiente" },
  { id: "5", paciente: "Lucía Fernández", hora: "11:30", tratamiento: "Blanqueamiento", estado: "Cancelado" },
];

export const MOCK_METRICS = {
  turnosHoy: 12,
  pendientes: 4,
  ingresosDia: "$ 45.000",
};

export type Paciente = {
  id: string;
  nombre: string;
  dni: string;
  telefono: string;
  ultimoTurno: string;
  estado: "Activo" | "Inactivo" | "Deudor";
};

export const MOCK_PACIENTES: Paciente[] = [
  { id: "P001", nombre: "Martín López", dni: "34.567.890", telefono: "362-455-1234", ultimoTurno: "24/05/2026", estado: "Activo" },
  { id: "P002", nombre: "Sofía Martínez", dni: "38.123.456", telefono: "362-411-9876", ultimoTurno: "24/05/2026", estado: "Activo" },
  { id: "P003", nombre: "Carlos Ruiz", dni: "29.987.654", telefono: "362-499-5555", ultimoTurno: "10/04/2026", estado: "Deudor" },
  { id: "P004", nombre: "Ana Gómez", dni: "41.222.333", telefono: "362-488-7777", ultimoTurno: "24/05/2026", estado: "Activo" },
  { id: "P005", nombre: "Lucía Fernández", dni: "35.444.555", telefono: "362-477-8888", ultimoTurno: "15/01/2026", estado: "Inactivo" },
  { id: "P006", nombre: "Diego Torres", dni: "32.111.222", telefono: "362-466-9999", ultimoTurno: "05/05/2026", estado: "Activo" },
];
