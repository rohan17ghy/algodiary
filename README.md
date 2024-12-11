# Turborepo starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@algodiary/ui`: a stub React component library shared by both `web` and `docs` applications
- `@algodiary/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@algodiary/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

##Problem with `fyers-api-v3` library
-The Datasocket module of fyers is designed such that it doesn't work with NextJS.

- We get a module not found error

###Solution to resolve the `module not found` error with `fyers-api-v3`
-To make it work need to make some changes to that file
-Install the `fyers-web-sdk-v3` separately in a different project. Can't use this package directly as it is meant for browser and not node, it is using window object
-Copy the `./node_modules/fyers-web-sdk-v3/HSM/datasocket.min.js` file from `fyers-web-sdk-v3` and replace it in the original `./node_modules/fyers-api-v3/HSM/datasocket.min.js`
-Copy the `./node_modules/fyers-web-sdk-v3/HSM_Package/hslib.js` file from `fyers-web-sdk-v3` and replace it in the original `./node_modules/fyers-api-v3/HSM_Package/hslib.js`
-In `hslib.js` replace this line `const WebSocket = window.WebSocket || window.MozWebSocket;` with `const WebSocket = require('ws');`
-In `hslib.js` replace this line `module.exports = HSWebSocket` with `export {HSWebSocket};`
-There is a `fyers-api-v3.zip` file which contains the right files which are supported in next project. We
can replace this folder in `node_modules`
