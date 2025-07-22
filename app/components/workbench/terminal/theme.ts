import type { ITheme } from "@xterm/xterm";

const style = getComputedStyle(document.documentElement);
const cssVar = (token: string) => style.getPropertyValue(token) || undefined;

export function getTerminalTheme(overrides?: ITheme): ITheme {
  return {
    cursor: cssVar("--artify-elements-terminal-cursorColor"),
    cursorAccent: cssVar("--artify-elements-terminal-cursorColorAccent"),
    foreground: cssVar("--artify-elements-terminal-textColor"),
    background: cssVar("--artify-elements-terminal-backgroundColor"),
    selectionBackground: cssVar("--artify-elements-terminal-selection-backgroundColor"),
    selectionForeground: cssVar("--artify-elements-terminal-selection-textColor"),
    selectionInactiveBackground: cssVar("--artify-elements-terminal-selection-backgroundColorInactive"),

    // ansi escape code colors
    black: cssVar("--artify-elements-terminal-color-black"),
    red: cssVar("--artify-elements-terminal-color-red"),
    green: cssVar("--artify-elements-terminal-color-green"),
    yellow: cssVar("--artify-elements-terminal-color-yellow"),
    blue: cssVar("--artify-elements-terminal-color-blue"),
    magenta: cssVar("--artify-elements-terminal-color-magenta"),
    cyan: cssVar("--artify-elements-terminal-color-cyan"),
    white: cssVar("--artify-elements-terminal-color-white"),
    brightBlack: cssVar("--artify-elements-terminal-color-brightBlack"),
    brightRed: cssVar("--artify-elements-terminal-color-brightRed"),
    brightGreen: cssVar("--artify-elements-terminal-color-brightGreen"),
    brightYellow: cssVar("--artify-elements-terminal-color-brightYellow"),
    brightBlue: cssVar("--artify-elements-terminal-color-brightBlue"),
    brightMagenta: cssVar("--artify-elements-terminal-color-brightMagenta"),
    brightCyan: cssVar("--artify-elements-terminal-color-brightCyan"),
    brightWhite: cssVar("--artify-elements-terminal-color-brightWhite"),

    ...overrides,
  };
}
