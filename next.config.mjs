/** @type {import('next').NextConfig} */
import path from 'path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
const __dirname = dirname(fileURLToPath(import.meta.url))

const nextConfig = {
    output: 'export',
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
};

export default nextConfig;
