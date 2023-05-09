import { theme } from '../../../styles/themes';

export enum ButtonType {
  Trade = 'trade',
  Message = 'message',
  Primary = 'primary',
  Secondary = 'secondary',
  Disabled = 'disabled',
  Pending = 'pending',
  Completed = 'completed',
  Filter = 'filter',
  Google = 'google',
  LogIn = 'logIn',
}

interface Buttons {
  [key: string]: {
    color?: string; // default: #fff
    background: string;
    width?: string; // default: fit-content
    height?: string; // default: 4.5rem
    border?: string; // default: none
    hoverBackground: string;
    hoverColor?: string; //  default: #fff
    activeBackground: string;
    activeColor?: string; //  default: #fff
    activeBorder?: string; //  default: none
    fontSize?: string; // default:  2rem
    fontWeight?: number; // default:  700
  };
}

const greenButton = {
  background: theme.gradient.tradePrimary,
  hoverBackground: theme.gradient.tradeDark,
  activeBackground: theme.gradient.tradeLight1,
};

export const buttons: Buttons = {
  primary: {
    color: theme.color.textGray,
    background: theme.color.primary,
    width: '100%',
    hoverBackground: theme.color.primaryDark,
    activeBackground: theme.color.primaryLight2,
  },
  secondary: {
    color: theme.color.text,
    fontWeight: 400,
    background: theme.color.textGray,
    width: theme.button.width,
    border: `1px solid ${theme.color.gray}`,
    hoverBackground: theme.color.grayLight1,
    activeBackground: theme.color.grayLight2,
    activeBorder: ` 1px solid ${theme.color.primary}`,
  },
  google: {
    color: theme.color.text,
    fontWeight: 400,
    background: '#fff',
    width: theme.button.width,
    // border: `1px solid ${theme.color.gray}`,
    hoverBackground: theme.color.grayLight1,
    activeBackground: theme.color.grayLight2,
    activeBorder: ` 1px solid ${theme.color.primary}`,
  },
  message: {
    background: theme.gradient.message1Primary,
    height: theme.button.height2,
    hoverBackground: theme.color.grayLight1,
    activeBackground: theme.color.grayLight2,
    activeBorder: ` 1px solid ${theme.color.primary}`,
  },
  trade: {
    ...greenButton,
  },
  disabled: {
    color: theme.color.gray,
    background: theme.color.grayLight2,
    hoverBackground: theme.color.grayLight2,
    hoverColor: theme.color.gray,
    activeBackground: theme.color.grayLight2,
    activeColor: theme.color.gray,
  },
  pending: {
    background: theme.gradient.pending,
    hoverBackground: theme.gradient.pending,
    activeBackground: theme.gradient.pending,
  },
  completed: {
    background: theme.gradient.completed,
    hoverBackground: theme.gradient.completed,
    activeBackground: theme.gradient.completed,
  },
  filter: {
    background: '#fff',
    color: theme.color.text,
    hoverBackground: theme.color.grayDark,
    activeBackground: theme.color.grayLight1,
  },
  logIn: {
    ...greenButton,
    color: theme.color.text,
    width: '100%',
  },
};
