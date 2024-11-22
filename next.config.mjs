// next.config.mjs
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(process.cwd(), 'styles')], // Upewnij się, że ścieżka jest poprawna
    },
};

export default nextConfig;
