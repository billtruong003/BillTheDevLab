import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF8C42',
          neutral: '#52525b',
          emerald: '#34D399',
          amber: '#FBBF24',
          red: '#F87171',
        },
        surface: {
          dark: {
            base: '#09090b',
            card: '#18181b',
            elevated: '#27272a',
            border: '#3f3f46',
          },
          light: {
            base: '#ffffff',
            card: '#fafafa',
            elevated: '#f4f4f5',
            border: '#e4e4e7',
          },
        },
        text: {
          dark: {
            primary: '#F5F5F5',
            secondary: '#A0A0B0',
            muted: '#6B6B7B',
          },
          light: {
            primary: '#1A1A2E',
            secondary: '#4A4A5A',
            muted: '#8A8A9A',
          },
        },
      },
      fontFamily: {
        display: ['Satoshi', 'system-ui', 'sans-serif'],
        body: ['General Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'fluid-xs': 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
        'fluid-base': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 1rem + 0.625vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 1.2rem + 1.5vw, 2rem)',
        'fluid-3xl': 'clamp(1.875rem, 1.4rem + 2.375vw, 2.5rem)',
        'fluid-4xl': 'clamp(2.25rem, 1.6rem + 3.25vw, 3.5rem)',
      },
      borderRadius: {
        cozy: '0.75rem',
        'cozy-lg': '1rem',
        'cozy-xl': '1.5rem',
      },
      backgroundImage: {
        'gradient-sunset': 'linear-gradient(135deg, #FF8C42, #52525b)',
        'gradient-glow': 'linear-gradient(135deg, #FF8C42, #34D399)',
        'gradient-warm': 'linear-gradient(135deg, #FF8C42, #FF6B6B)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 140, 66, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 140, 66, 0.6)' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            code: {
              backgroundColor: 'var(--tw-prose-pre-bg)',
              padding: '0.15rem 0.35rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
