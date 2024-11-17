# TripOTA Tour Operation

## Run development

```bash
yarn install
yarn dev
```

## Documentation

Antd: https://ant.design/

Zustand: https://github.com/pmndrs/zustand

React Query: https://tanstack.com/query/v3/

React Router: https://reactrouter.com/en/main

## Coding Guides

Refer to `docs\coding-guides`

## Generate Resource Permissions

For MacOS:

1. Make the script executable by running:

```bash
chmod +x gen-permission.sh
```

2. Install jq to deserialize JSON response

```bash
brew install jq
```

3. Run command to re-generate permissions.

```bash
yarn gen-permission
```
