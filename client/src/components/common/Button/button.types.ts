import { theme } from '../../../styles/themes';

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
  SmallGreen = 'smallGreen',
  SmallYellow = 'smallYellow',
  SmallTransparent = 'smallTransparent',
  Google = 'google',
}

interface Buttons {
  [key: string]: {
    color?: string;
    background: string;
    width?: string;
    height?: string;
    border?: string;
    hoverBackground: string;
    hoverColor?: string;
    activeBackground: string;
    activeColor?: string;
    activeBorder?: string;
    fontSize?: string;
    fontWeight?: number;
    fontFamily?: string;
  };
}

export const buttons: Buttons = {
  primary: {
    background: theme.color.primaryBlue,
    width: theme.button.widthLarge,
    hoverBackground: theme.color.darkBlueHover,
    activeBackground: theme.color.lighterBlueActive,
  },
  secondary: {
    background: theme.gradient.tradeDefault,
    width: theme.button.widthLarge,
    hoverBackground: theme.gradient.tradeDarkHover,
    activeBackground: theme.gradient.tradeLightActive,
  },
  tertiary: {
    color: theme.color.black,
    background: theme.color.primaryOffWhite,
    width: theme.button.widthLarge,
    border: `1px solid ${theme.color.primaryMediumGray}`,
    hoverBackground: theme.color.primaryMediumGray,
    activeBackground: theme.color.lighterGray,
  },
  smallGreen: {
    background: theme.gradient.tradeDefault,
    width: theme.button.widthSmall,
    hoverBackground: theme.gradient.tradeDarkHover,
    activeBackground: theme.gradient.tradeDarkHover,
  },
  smallYellow: {
    background: theme.gradient.tradePending,
    width: theme.button.widthSmall,
    hoverBackground: theme.gradient.tradePending,
    activeBackground: theme.gradient.tradePending,
  },
  smallTransparent: {
    color: theme.color.primaryBlue,
    width: theme.button.widthSmall,
    background: theme.color.transparent,
    hoverBackground: theme.color.transparent,
    activeBackground: theme.color.transparent,
  },
  google: {
    color: theme.color.black,
    fontWeight: 400,
    fontSize: '1.6rem',
    fontFamily: 'Poppins',
    background: theme.color.primaryPureWhite,
    width: theme.button.widthLarge,
    hoverBackground: theme.color.grayLight1,
    activeBackground: theme.color.grayLight2,
  },
};
