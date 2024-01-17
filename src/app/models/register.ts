export interface Register {
  nickName: string;
  fullName: string;
  email: string;
  password: string;
  address: AddressInfo
  registerLocatiInfo:RegisterLocationInfo
};

export interface RegisterLocationInfo{
  paises:string;
  estados:string;
  ciudades:string
}
export interface RegisterFormData {
  personalInfo: UserPersonalInfo,
  addressInfo: AddressInfo
  registerLocatiInfo:RegisterLocationInfo
};

export interface UserPersonalInfo {
  nickName: string,
  firtName: string,
  secondName: string,
  firtSurtname: string,
  secondSurtname: string,
  email: string,
  password: string
};

export interface AddressInfo {
  street: string,
  city: string,
  zipCode: string
};