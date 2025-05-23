/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as SettingsIndexImport } from './routes/settings/index'
import { Route as CategoryIndexImport } from './routes/category/index'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const SettingsIndexRoute = SettingsIndexImport.update({
  id: '/settings/',
  path: '/settings/',
  getParentRoute: () => rootRoute,
} as any)

const CategoryIndexRoute = CategoryIndexImport.update({
  id: '/category/',
  path: '/category/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/category/': {
      id: '/category/'
      path: '/category'
      fullPath: '/category'
      preLoaderRoute: typeof CategoryIndexImport
      parentRoute: typeof rootRoute
    }
    '/settings/': {
      id: '/settings/'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof SettingsIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/category': typeof CategoryIndexRoute
  '/settings': typeof SettingsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/category': typeof CategoryIndexRoute
  '/settings': typeof SettingsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/category/': typeof CategoryIndexRoute
  '/settings/': typeof SettingsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/category' | '/settings'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/category' | '/settings'
  id: '__root__' | '/' | '/category/' | '/settings/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CategoryIndexRoute: typeof CategoryIndexRoute
  SettingsIndexRoute: typeof SettingsIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CategoryIndexRoute: CategoryIndexRoute,
  SettingsIndexRoute: SettingsIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/category/",
        "/settings/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/category/": {
      "filePath": "category/index.tsx"
    },
    "/settings/": {
      "filePath": "settings/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
