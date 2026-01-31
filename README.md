# Spotlight

Spotlight is a [Tailwind UI](https://tailwindui.com) site template built using [Tailwind CSS](https://tailwindcss.com) and [Next.js](https://nextjs.org).

## Getting started

To get started with this template, first install the npm dependencies:

```bash
npm install
```

Next, create a `.env.local` file in the root of your project and set the environment variables:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
GENERATE_RSS=false
```

For production builds, set `GENERATE_RSS=true` if you want to generate RSS feeds.

Next, run the development server:

```bash
npm run dev
```

Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Customizing

You can start editing this template by modifying the files in the `/src` folder. The site will auto-update as you edit these files.

## Deploying to GitHub Pages

This site is configured to deploy to GitHub Pages using GitHub Actions.

### Environment Variables

To configure your deployment, set the following secrets in your GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add the following repository secrets:
   - `NEXT_PUBLIC_SITE_URL`: Your production site URL (e.g., `https://username.github.io/repository-name`)
   - `GENERATE_RSS`: Set to `true` to generate RSS feeds, or `false` to skip them (defaults to `true`)

If you don't set these secrets, the workflow will use default values:
- `NEXT_PUBLIC_SITE_URL`: `https://revisit.fm`
- `GENERATE_RSS`: `true`

### Triggering Deployment

The site automatically deploys when you push to the `main` branch. You can also trigger a manual deployment from the **Actions** tab in your GitHub repository.

## License

This site template is a commercial product and is licensed under the [Tailwind UI license](https://tailwindui.com/license).

## Learn more

To learn more about the technologies used in this site template, see the following resources:

- [Tailwind CSS](https://tailwindcss.com/docs) - the official Tailwind CSS documentation
- [Next.js](https://nextjs.org/docs) - the official Next.js documentation
- [Headless UI](https://headlessui.dev) - the official Headless UI documentation
- [MDX](https://mdxjs.com) - the MDX documentation
