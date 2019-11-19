export interface Refuge {
  id?: string;
  name: string;
  address?: Address;
  phone: string;
  userId: string;
  email: string;
}

export interface Address {
  street: string;
  postalCode: string;
  city: string;
}
