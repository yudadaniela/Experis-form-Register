import { Register, RegisterFormData } from "../models/register";

export const userMapper = (rawData: RegisterFormData): Register => {
  const names = [rawData.personalInfo.firtName, rawData.personalInfo.secondName, rawData.personalInfo.firtSurtname, rawData.personalInfo.secondSurtname];
  const user: Register = {
    nickName: rawData.personalInfo.nickName,
    fullName: names.join(' '),
    email: rawData.personalInfo.email,
    password: rawData.personalInfo.password,
    role:rawData.personalInfo.role,
    location: {
      pais: rawData.personalInfo.pais,
      estado: rawData.personalInfo.estado,
      ciudad: rawData.personalInfo.ciudad,
    },
    address: rawData.addressInfo,
  };
  console.log('Mapped User:', user);
  return user;
};
