/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--c-bg)',
        'bg-2': 'var(--c-bg-2)',
        surface: 'var(--c-surface)',
        'surface-2': 'var(--c-surface-2)',
        line: 'var(--c-line)',
        'line-strong': 'var(--c-line-strong)',
        ink: 'var(--c-ink)',
        'ink-muted': 'var(--c-ink-muted)',
        'ink-faint': 'var(--c-ink-faint)',
        primary: 'var(--c-primary)',
        'primary-hover': 'var(--c-primary-hover)',
        'primary-ink': 'var(--c-primary-ink)',
        accent: 'var(--c-accent)',
        'accent-ink': 'var(--c-accent-ink)',
        alive: 'var(--c-alive)',
        dead: 'var(--c-dead)',
        unknown: 'var(--c-unknown)',
        focus: 'var(--c-focus)',
      },
      fontFamily: {
        display: ['Space Grotesk Variable', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono Variable', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'step--1': 'var(--step--1)',
        'step-0': 'var(--step-0)',
        'step-1': 'var(--step-1)',
        'step-2': 'var(--step-2)',
        'step-3': 'var(--step-3)',
        'step-4': 'var(--step-4)',
        'step-5': 'var(--step-5)',
      },
      borderRadius: {
        sm: 'var(--r-sm)',
        md: 'var(--r-md)',
        lg: 'var(--r-lg)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      maxWidth: {
        registry: '1400px',
      },
    },
  },
  plugins: [],
}
