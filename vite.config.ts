import { defineConfig } from 'vite';

import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { svelteTesting } from '@testing-library/svelte/vite';

export default defineConfig({
  plugins: [sveltekit(), svelteTesting(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['./src/**/*.{test,spec}.{js,ts}'],
    setupFiles: ['./test/test-setup.ts']
  }
});
