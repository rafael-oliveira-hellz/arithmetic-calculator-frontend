export interface LoginFormProps {
  username: string;
  password: string;
  onUsernameChange: React.ChangeEventHandler<HTMLInputElement>;
  onPasswordChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isLoading?: boolean;
}
