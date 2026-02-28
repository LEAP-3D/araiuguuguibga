export type Owner = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  fullAddress: string;
  emergencyContact: string;
  notes: string;
  avatar: string;
};

export type Pet = {
  id: string;
  name: string;
  type: 'Dog' | 'Cat' | 'Bird' | 'Rabbit' | 'Hamster' | 'Fish' | 'Other';
  breed: string;
  age: string;
  weight: string;
  gender: 'Male' | 'Female';
  photo: string;
  medicalNotes: string;
  microchipId: string;
};

export type MedicalRecordType = 'Vaccine' | 'Medicine' | 'Treatment' | 'Surgery';

export type MedicalRecord = {
  id: string;
  petId: string;
  petName: string;
  type: MedicalRecordType;
  name: string;
  date: string;
  nextDueDate?: string;
  vetClinic: string;
  notes: string;
};
