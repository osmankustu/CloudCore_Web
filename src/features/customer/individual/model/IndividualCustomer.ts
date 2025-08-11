import { BaseCustomer } from "@/core/models/base-customer";
import { BaseModel } from "@/core/models/base-model";


export interface IndividualCustomerModel extends BaseCustomer, BaseModel {
  customerNo: string;
  firstName: string;
  lastName: string;
}

export interface IndividualCustomerSelectModel {
  id: string;
  customerNo: string;
  firstName: string;
  lastName: string;
}

export interface IndividualCustomerAddModel {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

export interface IndividualCustomerUpdateModel {
  id: string;
  customerNo: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  createAt: string;
}
