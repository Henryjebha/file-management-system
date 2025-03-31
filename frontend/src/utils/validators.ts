/**
 * Email validation
 */
export const isValidEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };
  
  /**
   * Password strength validation
   */
  export const isStrongPassword = (password: string): boolean => {
    return password.length >= 8;
  };
  
  /**
   * Phone number format validation
   */
  export const isValidPhoneNumber = (phone: string): boolean => {
    const re = /^\+?[0-9]{10,15}$/;
    return re.test(phone.replace(/[\s-]/g, ''));
  };