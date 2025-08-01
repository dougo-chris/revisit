import withYaml from 'next-plugin-yaml'

const nextConfig = {
  /**
   * Enable static exports.
   *
   * @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
  */
  output: "export",
  /**
   * Set base path. This is the slug of your GitHub repository.
   *
   * @see https://nextjs.org/docs/app/api-reference/next-config-js/basePath
  */
  basePath: "",

  /**
   * Disable server-based image optimization. Next.js does not support
   * dynamic features with static exports.
   *
   * @see https://nextjs.org/docs/app/api-reference/components/image#unoptimized
  */
  images: {
    unoptimized: true,
  },
  pageExtensions: ['js', 'jsx'],
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
}

export default withYaml(nextConfig)
