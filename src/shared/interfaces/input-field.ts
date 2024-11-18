import { IconType } from "../types/icons";

export interface InputFieldConfig {
  id: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  iconType: IconType;
  placeholder: string;
  isValid?: boolean;
  errorMessage?: string;
  showRules: boolean;
  ref?: React.RefObject<HTMLInputElement>;
  onFocus?: () => void;
  onBlur?: () => void;
  rulesComponent?: React.ReactNode;
  className?: string;
}
