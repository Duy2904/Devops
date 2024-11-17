import { TinyColor } from '@ctrl/tinycolor';

export const getHoverColors = (color: string) => new TinyColor(color).lighten(5).toString();
export const getActiveColors = (color: string) => new TinyColor(color).darken(5).toString();
