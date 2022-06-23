export interface Inputs {
  id: string;
  label: string;
  placeholder: string;
  show: boolean;
  error: boolean;
  textError: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  disable?: boolean;
}

export interface PasswordError {
  isPasswordError: boolean;
  textPasswordError: string;
}
