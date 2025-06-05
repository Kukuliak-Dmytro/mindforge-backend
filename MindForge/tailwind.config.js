/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      textColor: {
        'primary': 'var(--color-primary)',
        'secondary': 'var(--color-secondary)',
        'accent': 'var(--color-accent)',
        'rich-black': 'var(--color-rich-black)',
      },
      boxShadow: {
        'small': 'var(--shadow-small)',
        'medium': 'var(--shadow-medium)',
        'double': 'var(--shadow-double)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.2)',
        'inner-light': 'inset -2px -2px 2px 2px rgba(255, 255, 255, 0.2)',
        'inner-dark': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.2)',
      },
      borderRadius: {
        'small': 'var(--radius-small)',
        'medium': 'var(--radius-medium)',
        'large': 'var(--radius-large)',
      },
      transitionProperty: {
        'fast': 'var(--fastTransition)',
        'medium': 'var(--mediumTransition)',
        'slow': 'var(--slowTransition)',
      },
    },
  },
  plugins: [],
} 