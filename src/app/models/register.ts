export interface Register {
  nickName: string;
  fullName: string;
  email: string;
  password: string;
  location: Location; // Agrega la propiedad location
  address: AddressInfo;
}

export interface RegisterFormData {
  personalInfo: UserPersonalInfo & Location; // Corregimos aquí
  addressInfo: AddressInfo;
}

export interface UserPersonalInfo {
  nickName: string;
  firtName: string;
  secondName: string;
  firtSurtname: string;
  secondSurtname: string;
  email: string;
  password: string;
}

export interface Location {
  pais: string;
  estado: string;
  ciudad: string;
}

export interface AddressInfo {
  street: string;
  city: string;
  zipCode: string;
}
