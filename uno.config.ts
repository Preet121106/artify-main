/* eslint-disable prettier/prettier */
import { globSync } from 'fast-glob';
import fs from 'node:fs/promises';
import { basename } from 'node:path';
import type { IconifyJSON } from '@iconify/types';
import presetWind from '@unocss/preset-wind';

import {
  defineConfig,
  presetIcons,
  presetUno,
  transformerDirectives,
} from 'unocss';

const iconPaths = globSync('./icons/*.svg');
const collectionName = 'artify';

const customIconCollection = iconPaths.reduce(
  (acc, iconPath) => {
    const [iconName] = basename(iconPath).split('.');
    acc[collectionName] ??= {};
    acc[collectionName][iconName] = async () => fs.readFile(iconPath, 'utf8');

    return acc;
  },
  {} as Record<string, Record<string, () => Promise<string>>>
);

const BASE_COLORS = {
  white: '#FFFFFF',
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0A0A0A',
  },
  accent: {
    50: '#E6FFFA',
    100: '#B2F5EA',
    200: '#81E6D9',
    300: '#4FD1C5',
    400: '#38B2AC',
    500: '#319795',
    600: '#2C7A7B',
    700: '#285E61',
    800: '#234E52',
    900: '#1D4044',
    950: '#0F2C2E',
  },
  green: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
    950: '#052E16',
  },
  orange: {
    50: '#FFFAEB',
    100: '#FEEFC7',
    200: '#FEDF89',
    300: '#FEC84B',
    400: '#FDB022',
    500: '#F79009',
    600: '#DC6803',
    700: '#B54708',
    800: '#93370D',
    900: '#792E0D',
  },
  red: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
    950: '#450A0A',
  },
};

const COLOR_PRIMITIVES = {
  ...BASE_COLORS,
  alpha: {
    white: generateAlphaPalette(BASE_COLORS.white),
    gray: generateAlphaPalette(BASE_COLORS.gray[900]),
    red: generateAlphaPalette(BASE_COLORS.red[500]),
    accent: generateAlphaPalette(BASE_COLORS.accent[500]),
  },
};

export default defineConfig({
  safelist: Object.keys(customIconCollection[collectionName] || {}).map(
    (x) => `i-${collectionName}:${x}`
  ),
  shortcuts: {
    'artify-ease-cubic-bezier': 'ease-[cubic-bezier(0.4,0,0.2,1)]',
    'transition-theme':
      'transition-[background-color,border-color,color] duration-150 artify-ease-cubic-bezier',
    kdb: 'bg-artify-elements-code-background text-artify-elements-code-text py-1 px-1.5 rounded-md',
    'max-w-chat': 'max-w-[var(--chat-max-width)]',
  },
  rules: [],
  theme: {
    extend: {
      keyframes: {
        'aurora-pan': {
          '0%,100%': { backgroundPosition: '50% 50%' },
          '50%': { backgroundPosition: '0% 100%' },
        },
        'aurora-blob': {
          '0%,100%': { transform: 'translate3d(0,0,0) rotate(0deg)' },
          '25%': { transform: 'translate3d(6%, -8%, 0) rotate(4deg)' },
          '50%': { transform: 'translate3d(-8%, 12%, 0) rotate(-3deg)' },
          '75%': { transform: 'translate3d(4%, -6%, 0) rotate(2deg)' },
        },
      },
      animation: {
        'aurora-pan': 'aurora-pan 40s ease-in-out infinite',
        'aurora-blob': 'aurora-blob 28s ease-in-out infinite',
      },
    },
    colors: {
      ...COLOR_PRIMITIVES,
      artify: {
        elements: {
          borderColor: 'var(--artify-elements-borderColor)',
          borderColorActive: 'var(--artify-elements-borderColorActive)',
          background: {
            depth: {
              1: 'var(--artify-elements-bg-depth-1)',
              2: 'var(--artify-elements-bg-depth-2)',
              3: 'var(--artify-elements-bg-depth-3)',
              4: 'var(--artify-elements-bg-depth-4)',
            },
          },
          textPrimary: 'var(--artify-elements-textPrimary)',
          textSecondary: 'var(--artify-elements-textSecondary)',
          textTertiary: 'var(--artify-elements-textTertiary)',
          code: {
            background: 'var(--artify-elements-code-background)',
            text: 'var(--artify-elements-code-text)',
          },
          button: {
            primary: {
              background: 'var(--artify-elements-button-primary-background)',
              backgroundHover:
                'var(--artify-elements-button-primary-backgroundHover)',
              text: 'var(--artify-elements-button-primary-text)',
            },
            secondary: {
              background: 'var(--artify-elements-button-secondary-background)',
              backgroundHover:
                'var(--artify-elements-button-secondary-backgroundHover)',
              text: 'var(--artify-elements-button-secondary-text)',
            },
            danger: {
              background: 'var(--artify-elements-button-danger-background)',
              backgroundHover:
                'var(--artify-elements-button-danger-backgroundHover)',
              text: 'var(--artify-elements-button-danger-text)',
            },
          },
          item: {
            contentDefault: 'var(--artify-elements-item-contentDefault)',
            contentActive: 'var(--artify-elements-item-contentActive)',
            contentAccent: 'var(--artify-elements-item-contentAccent)',
            contentDanger: 'var(--artify-elements-item-contentDanger)',
            backgroundDefault: 'var(--artify-elements-item-backgroundDefault)',
            backgroundActive: 'var(--artify-elements-item-backgroundActive)',
            backgroundAccent: 'var(--artify-elements-item-backgroundAccent)',
            backgroundDanger: 'var(--artify-elements-item-backgroundDanger)',
          },
          actions: {
            background: 'var(--artify-elements-actions-background)',
            code: {
              background: 'var(--artify-elements-actions-code-background)',
            },
          },
          artifacts: {
            background: 'var(--artify-elements-artifacts-background)',
            backgroundHover: 'var(--artify-elements-artifacts-backgroundHover)',
            borderColor: 'var(--artify-elements-artifacts-borderColor)',
            inlineCode: {
              background:
                'var(--artify-elements-artifacts-inlineCode-background)',
              text: 'var(--artify-elements-artifacts-inlineCode-text)',
            },
          },
          messages: {
            background: 'var(--artify-elements-messages-background)',
            linkColor: 'var(--artify-elements-messages-linkColor)',
            code: {
              background: 'var(--artify-elements-messages-code-background)',
            },
            inlineCode: {
              background:
                'var(--artify-elements-messages-inlineCode-background)',
              text: 'var(--artify-elements-messages-inlineCode-text)',
            },
          },
          icon: {
            success: 'var(--artify-elements-icon-success)',
            error: 'var(--artify-elements-icon-error)',
            primary: 'var(--artify-elements-icon-primary)',
            secondary: 'var(--artify-elements-icon-secondary)',
            tertiary: 'var(--artify-elements-icon-tertiary)',
          },
          preview: {
            addressBar: {
              background:
                'var(--artify-elements-preview-addressBar-background)',
              backgroundHover:
                'var(--artify-elements-preview-addressBar-backgroundHover)',
              backgroundActive:
                'var(--artify-elements-preview-addressBar-backgroundActive)',
              text: 'var(--artify-elements-preview-addressBar-text)',
              textActive: 'var(--artify-elements-preview-addressBar-textActive)',
            },
          },
          terminals: {
            background: 'var(--artify-elements-terminals-background)',
            buttonBackground:
              'var(--artify-elements-terminals-buttonBackground)',
          },
          dividerColor: 'var(--artify-elements-dividerColor)',
          loader: {
            background: 'var(--artify-elements-loader-background)',
            progress: 'var(--artify-elements-loader-progress)',
          },
          prompt: {
            background: 'var(--artify-elements-prompt-background)',
          },
          sidebar: {
            dropdownShadow: 'var(--artify-elements-sidebar-dropdownShadow)',
            buttonBackgroundDefault:
              'var(--artify-elements-sidebar-buttonBackgroundDefault)',
            buttonBackgroundHover:
              'var(--artify-elements-sidebar-buttonBackgroundHover)',
            buttonText: 'var(--artify-elements-sidebar-buttonText)',
          },
          cta: {
            background: 'var(--artify-elements-cta-background)',
            text: 'var(--artify-elements-cta-text)',
          },
        },
      },
    },
  },
  transformers: [transformerDirectives()],
  presets: [
    presetUno({
      dark: {
        light: '[data-theme="light"]',
        dark: '[data-theme="dark"]',
      },
    }),
    presetIcons({
      warn: true,
      collections: {
        ...customIconCollection,
        ph: async () =>
          (await import('@iconify-json/ph/icons.json')).default as IconifyJSON,
        si: async () =>
          (await import('@iconify-json/si/icons.json')).default as IconifyJSON,
      },
      unit: 'em',
    }),
    presetWind() as unknown as import('unocss').Preset<object>, // ✅ Tailwind-compatible preset
  ],
});

/**
 * Generates an alpha palette for a given hex color.
 */
function generateAlphaPalette(hex: string) {
  return [1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].reduce(
    (acc, opacity) => {
      const alpha = Math.round((opacity / 100) * 255)
        .toString(16)
        .padStart(2, '0');
      acc[opacity] = `${hex}${alpha}`;

      return acc;
    },
    {} as Record<number, string>
  );
}
