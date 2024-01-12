export interface Register {
  nickName: string;
  fullName: string;
  email: string;
  password: string;
  address: AddressInfo
};

export interface RegisterFormData {
  personalInfo: UserPersonalInfo,
  addressInfo: AddressInfo
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