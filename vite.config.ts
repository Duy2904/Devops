import { defineConfig } from 'vite';
import pluginRewriteAll from 'vite-plugin-rewrite-all';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), pluginRewriteAll()],
    resolve: {
        alias: [
            { find: '@sdk', replacement: '/sdk' },
            { find: '@components', replacement: '/src/components' },
            { find: '@features', replacement: '/src/features' },
            { find: '@fragments', replacement: '/src/fragments' },
            { find: '@hooks', replacement: '/src/hooks' },
            { find: '@pages', replacement: '/src/pages' },
            { find: '@store', replacement: '/src/store' },
            { find: '@utils', replacement: '/src/utils' },
            { find: '@services', replacement: '/src/services' },
            { find: '@assets', replacement: '/src/assets' },
            { find: '@src', replacement: '/src' },
        ],
    },
});
