import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config = {
  darkMode: ['class'],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: '',
  theme: {
    screens: {
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        primary: '#059A83', // Buttons, active states, links
        'primary-light': '#E0F5E1', // Badges, subtle backgrounds
        success: '#10AE17', // Positive returns, gains
        error: '#BF221C', // Negative returns, losses, errors
        'bg-canvas': '#FBFBFB', // Page background
        'bg-surface': '#FFFFFF', // Card backgrounds
        'bg-page': '#F5F1EE', // Outer page background
        'bg-default': '#F2F6F6', // Input backgrounds, neutral fills
        'text-default': '#13342F', // Headings, primary text
        'text-neutral': '#687D7A', // Labels, secondary text
        'text-disabled': '#92A29F', // Placeholders, muted text
        border: '#DBDFDF', // Card borders, dividers
        'accent-blue': '#00B6DF', // Highlights, info states
        purple: '#7B79C9', // Chart segments
        cream: '#F2C891', // Chart segments
        'dark-blue': '#00323D', // Dark backgrounds
      },
    },
  },
} satisfies Config;

export default config;
