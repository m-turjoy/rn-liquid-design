declare module 'rn-liquid-design' {
  export interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  }

  export function Button(props: ButtonProps): JSX.Element;
}
