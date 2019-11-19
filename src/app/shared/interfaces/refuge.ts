export interface Refuge {
  id?: string;
  name: string;
  address?: Address;
  phone: string;
  email: string;
  userId: string;
}

export interface Address {
  street: string;
  postalCode: string;
  city: string;
}
