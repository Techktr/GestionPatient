export interface Appointment {
  id: number;
  date: string;
  patientId: number;
  patientFullName: string;
  practitionerId: number;
  practitionerFullName: string;
}
