export interface Register {
  nickName: string;
  firtName: string;
  secondName:string;
  firtSurtname:string;
  secondSurtname:string;
  email: string;
  password: string;
  address: AddressInfo;
}

export interface AddressInfo {
  city: string;
  street: string;
  zipCode: string;
}
