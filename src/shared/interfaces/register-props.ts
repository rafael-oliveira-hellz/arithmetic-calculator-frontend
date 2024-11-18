export interface RegisterFormProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  onNameChange: React.ChangeEventHandler<HTMLInputElement>;
  onEmailChange: React.ChangeEventHandler<HTMLInputElement>;
  onPasswordChange: React.ChangeEventHandler<HTMLInputElement>;
  onConfirmPasswordChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  passwordIsValid: boolean;
  confirmPasswordIsValid: boolean;
  nameIsValid: boolean;
  emailIsValid: boolean;
  emailErrorMessage?: string;
  isFormValid: boolean;
  isLoading?: boolean;
  confirmPasswordError?: boolean;
}
