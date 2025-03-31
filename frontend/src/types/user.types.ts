export interface Address {
    id?: number;
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    is_default: boolean;
  }
  
  export interface UserProfile {
    id?: number;
    phone_number?: string;
  }
  
  export interface User {
    id: number;
    username: string;
    email: string;
    profile?: UserProfile;
    addresses?: Address[];
    total_files: number;
  }