/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ViewStudentProfileImport } from './routes/view-student-profile'
import { Route as VerifyEmailImport } from './routes/verify-email'
import { Route as TestImport } from './routes/test'
import { Route as RegisterImport } from './routes/register'
import { Route as RecoverPasswordImport } from './routes/recover-password'
import { Route as FaqImport } from './routes/faq'
import { Route as AuthImport } from './routes/_auth'
import { Route as IndexImport } from './routes/index'
import { Route as AuthProfileImport } from './routes/_auth/profile'
import { Route as AuthMeetingImport } from './routes/_auth/meeting'
import { Route as AuthDashboardIndexImport } from './routes/_auth/dashboard/index'
import { Route as AuthDashboardMeetingsImport } from './routes/_auth/dashboard/meetings'
import { Route as AuthDashboardSupervisorImport } from './routes/_auth/dashboard/_supervisor'
import { Route as AuthDashboardSupervisorStudentsTrackingImport } from './routes/_auth/dashboard/_supervisor/students-tracking'
import { Route as AuthDashboardSupervisorAddSupervisorImport } from './routes/_auth/dashboard/_supervisor/add-supervisor'

// Create Virtual Routes

const AuthDashboardImport = createFileRoute('/_auth/dashboard')()

// Create/Update Routes

const ViewStudentProfileRoute = ViewStudentProfileImport.update({
  id: '/view-student-profile',
  path: '/view-student-profile',
  getParentRoute: () => rootRoute,
} as any)

const VerifyEmailRoute = VerifyEmailImport.update({
  id: '/verify-email',
  path: '/verify-email',
  getParentRoute: () => rootRoute,
} as any)

const TestRoute = TestImport.update({
  id: '/test',
  path: '/test',
  getParentRoute: () => rootRoute,
} as any)

const RegisterRoute = RegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const RecoverPasswordRoute = RecoverPasswordImport.update({
  id: '/recover-password',
  path: '/recover-password',
  getParentRoute: () => rootRoute,
} as any)

const FaqRoute = FaqImport.update({
  id: '/faq',
  path: '/faq',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthDashboardRoute = AuthDashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => AuthRoute,
} as any)

const AuthProfileRoute = AuthProfileImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => AuthRoute,
} as any)

const AuthMeetingRoute = AuthMeetingImport.update({
  id: '/meeting',
  path: '/meeting',
  getParentRoute: () => AuthRoute,
} as any)

const AuthDashboardIndexRoute = AuthDashboardIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthDashboardRoute,
} as any)

const AuthDashboardMeetingsRoute = AuthDashboardMeetingsImport.update({
  id: '/meetings',
  path: '/meetings',
  getParentRoute: () => AuthDashboardRoute,
} as any)

const AuthDashboardSupervisorRoute = AuthDashboardSupervisorImport.update({
  id: '/_supervisor',
  getParentRoute: () => AuthDashboardRoute,
} as any)

const AuthDashboardSupervisorStudentsTrackingRoute =
  AuthDashboardSupervisorStudentsTrackingImport.update({
    id: '/students-tracking',
    path: '/students-tracking',
    getParentRoute: () => AuthDashboardSupervisorRoute,
  } as any)

const AuthDashboardSupervisorAddSupervisorRoute =
  AuthDashboardSupervisorAddSupervisorImport.update({
    id: '/add-supervisor',
    path: '/add-supervisor',
    getParentRoute: () => AuthDashboardSupervisorRoute,
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
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/faq': {
      id: '/faq'
      path: '/faq'
      fullPath: '/faq'
      preLoaderRoute: typeof FaqImport
      parentRoute: typeof rootRoute
    }
    '/recover-password': {
      id: '/recover-password'
      path: '/recover-password'
      fullPath: '/recover-password'
      preLoaderRoute: typeof RecoverPasswordImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterImport
      parentRoute: typeof rootRoute
    }
    '/test': {
      id: '/test'
      path: '/test'
      fullPath: '/test'
      preLoaderRoute: typeof TestImport
      parentRoute: typeof rootRoute
    }
    '/verify-email': {
      id: '/verify-email'
      path: '/verify-email'
      fullPath: '/verify-email'
      preLoaderRoute: typeof VerifyEmailImport
      parentRoute: typeof rootRoute
    }
    '/view-student-profile': {
      id: '/view-student-profile'
      path: '/view-student-profile'
      fullPath: '/view-student-profile'
      preLoaderRoute: typeof ViewStudentProfileImport
      parentRoute: typeof rootRoute
    }
    '/_auth/meeting': {
      id: '/_auth/meeting'
      path: '/meeting'
      fullPath: '/meeting'
      preLoaderRoute: typeof AuthMeetingImport
      parentRoute: typeof AuthImport
    }
    '/_auth/profile': {
      id: '/_auth/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof AuthProfileImport
      parentRoute: typeof AuthImport
    }
    '/_auth/dashboard': {
      id: '/_auth/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AuthDashboardImport
      parentRoute: typeof AuthImport
    }
    '/_auth/dashboard/_supervisor': {
      id: '/_auth/dashboard/_supervisor'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AuthDashboardSupervisorImport
      parentRoute: typeof AuthDashboardRoute
    }
    '/_auth/dashboard/meetings': {
      id: '/_auth/dashboard/meetings'
      path: '/meetings'
      fullPath: '/dashboard/meetings'
      preLoaderRoute: typeof AuthDashboardMeetingsImport
      parentRoute: typeof AuthDashboardImport
    }
    '/_auth/dashboard/': {
      id: '/_auth/dashboard/'
      path: '/'
      fullPath: '/dashboard/'
      preLoaderRoute: typeof AuthDashboardIndexImport
      parentRoute: typeof AuthDashboardImport
    }
    '/_auth/dashboard/_supervisor/add-supervisor': {
      id: '/_auth/dashboard/_supervisor/add-supervisor'
      path: '/add-supervisor'
      fullPath: '/dashboard/add-supervisor'
      preLoaderRoute: typeof AuthDashboardSupervisorAddSupervisorImport
      parentRoute: typeof AuthDashboardSupervisorImport
    }
    '/_auth/dashboard/_supervisor/students-tracking': {
      id: '/_auth/dashboard/_supervisor/students-tracking'
      path: '/students-tracking'
      fullPath: '/dashboard/students-tracking'
      preLoaderRoute: typeof AuthDashboardSupervisorStudentsTrackingImport
      parentRoute: typeof AuthDashboardSupervisorImport
    }
  }
}

// Create and export the route tree

interface AuthDashboardSupervisorRouteChildren {
  AuthDashboardSupervisorAddSupervisorRoute: typeof AuthDashboardSupervisorAddSupervisorRoute
  AuthDashboardSupervisorStudentsTrackingRoute: typeof AuthDashboardSupervisorStudentsTrackingRoute
}

const AuthDashboardSupervisorRouteChildren: AuthDashboardSupervisorRouteChildren =
  {
    AuthDashboardSupervisorAddSupervisorRoute:
      AuthDashboardSupervisorAddSupervisorRoute,
    AuthDashboardSupervisorStudentsTrackingRoute:
      AuthDashboardSupervisorStudentsTrackingRoute,
  }

const AuthDashboardSupervisorRouteWithChildren =
  AuthDashboardSupervisorRoute._addFileChildren(
    AuthDashboardSupervisorRouteChildren,
  )

interface AuthDashboardRouteChildren {
  AuthDashboardSupervisorRoute: typeof AuthDashboardSupervisorRouteWithChildren
  AuthDashboardMeetingsRoute: typeof AuthDashboardMeetingsRoute
  AuthDashboardIndexRoute: typeof AuthDashboardIndexRoute
}

const AuthDashboardRouteChildren: AuthDashboardRouteChildren = {
  AuthDashboardSupervisorRoute: AuthDashboardSupervisorRouteWithChildren,
  AuthDashboardMeetingsRoute: AuthDashboardMeetingsRoute,
  AuthDashboardIndexRoute: AuthDashboardIndexRoute,
}

const AuthDashboardRouteWithChildren = AuthDashboardRoute._addFileChildren(
  AuthDashboardRouteChildren,
)

interface AuthRouteChildren {
  AuthMeetingRoute: typeof AuthMeetingRoute
  AuthProfileRoute: typeof AuthProfileRoute
  AuthDashboardRoute: typeof AuthDashboardRouteWithChildren
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthMeetingRoute: AuthMeetingRoute,
  AuthProfileRoute: AuthProfileRoute,
  AuthDashboardRoute: AuthDashboardRouteWithChildren,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthRouteWithChildren
  '/faq': typeof FaqRoute
  '/recover-password': typeof RecoverPasswordRoute
  '/register': typeof RegisterRoute
  '/test': typeof TestRoute
  '/verify-email': typeof VerifyEmailRoute
  '/view-student-profile': typeof ViewStudentProfileRoute
  '/meeting': typeof AuthMeetingRoute
  '/profile': typeof AuthProfileRoute
  '/dashboard': typeof AuthDashboardSupervisorRouteWithChildren
  '/dashboard/meetings': typeof AuthDashboardMeetingsRoute
  '/dashboard/': typeof AuthDashboardIndexRoute
  '/dashboard/add-supervisor': typeof AuthDashboardSupervisorAddSupervisorRoute
  '/dashboard/students-tracking': typeof AuthDashboardSupervisorStudentsTrackingRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthRouteWithChildren
  '/faq': typeof FaqRoute
  '/recover-password': typeof RecoverPasswordRoute
  '/register': typeof RegisterRoute
  '/test': typeof TestRoute
  '/verify-email': typeof VerifyEmailRoute
  '/view-student-profile': typeof ViewStudentProfileRoute
  '/meeting': typeof AuthMeetingRoute
  '/profile': typeof AuthProfileRoute
  '/dashboard': typeof AuthDashboardIndexRoute
  '/dashboard/meetings': typeof AuthDashboardMeetingsRoute
  '/dashboard/add-supervisor': typeof AuthDashboardSupervisorAddSupervisorRoute
  '/dashboard/students-tracking': typeof AuthDashboardSupervisorStudentsTrackingRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_auth': typeof AuthRouteWithChildren
  '/faq': typeof FaqRoute
  '/recover-password': typeof RecoverPasswordRoute
  '/register': typeof RegisterRoute
  '/test': typeof TestRoute
  '/verify-email': typeof VerifyEmailRoute
  '/view-student-profile': typeof ViewStudentProfileRoute
  '/_auth/meeting': typeof AuthMeetingRoute
  '/_auth/profile': typeof AuthProfileRoute
  '/_auth/dashboard': typeof AuthDashboardRouteWithChildren
  '/_auth/dashboard/_supervisor': typeof AuthDashboardSupervisorRouteWithChildren
  '/_auth/dashboard/meetings': typeof AuthDashboardMeetingsRoute
  '/_auth/dashboard/': typeof AuthDashboardIndexRoute
  '/_auth/dashboard/_supervisor/add-supervisor': typeof AuthDashboardSupervisorAddSupervisorRoute
  '/_auth/dashboard/_supervisor/students-tracking': typeof AuthDashboardSupervisorStudentsTrackingRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/faq'
    | '/recover-password'
    | '/register'
    | '/test'
    | '/verify-email'
    | '/view-student-profile'
    | '/meeting'
    | '/profile'
    | '/dashboard'
    | '/dashboard/meetings'
    | '/dashboard/'
    | '/dashboard/add-supervisor'
    | '/dashboard/students-tracking'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/faq'
    | '/recover-password'
    | '/register'
    | '/test'
    | '/verify-email'
    | '/view-student-profile'
    | '/meeting'
    | '/profile'
    | '/dashboard'
    | '/dashboard/meetings'
    | '/dashboard/add-supervisor'
    | '/dashboard/students-tracking'
  id:
    | '__root__'
    | '/'
    | '/_auth'
    | '/faq'
    | '/recover-password'
    | '/register'
    | '/test'
    | '/verify-email'
    | '/view-student-profile'
    | '/_auth/meeting'
    | '/_auth/profile'
    | '/_auth/dashboard'
    | '/_auth/dashboard/_supervisor'
    | '/_auth/dashboard/meetings'
    | '/_auth/dashboard/'
    | '/_auth/dashboard/_supervisor/add-supervisor'
    | '/_auth/dashboard/_supervisor/students-tracking'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthRoute: typeof AuthRouteWithChildren
  FaqRoute: typeof FaqRoute
  RecoverPasswordRoute: typeof RecoverPasswordRoute
  RegisterRoute: typeof RegisterRoute
  TestRoute: typeof TestRoute
  VerifyEmailRoute: typeof VerifyEmailRoute
  ViewStudentProfileRoute: typeof ViewStudentProfileRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRoute: AuthRouteWithChildren,
  FaqRoute: FaqRoute,
  RecoverPasswordRoute: RecoverPasswordRoute,
  RegisterRoute: RegisterRoute,
  TestRoute: TestRoute,
  VerifyEmailRoute: VerifyEmailRoute,
  ViewStudentProfileRoute: ViewStudentProfileRoute,
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
        "/_auth",
        "/faq",
        "/recover-password",
        "/register",
        "/test",
        "/verify-email",
        "/view-student-profile"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/meeting",
        "/_auth/profile",
        "/_auth/dashboard"
      ]
    },
    "/faq": {
      "filePath": "faq.tsx"
    },
    "/recover-password": {
      "filePath": "recover-password.tsx"
    },
    "/register": {
      "filePath": "register.tsx"
    },
    "/test": {
      "filePath": "test.tsx"
    },
    "/verify-email": {
      "filePath": "verify-email.tsx"
    },
    "/view-student-profile": {
      "filePath": "view-student-profile.tsx"
    },
    "/_auth/meeting": {
      "filePath": "_auth/meeting.tsx",
      "parent": "/_auth"
    },
    "/_auth/profile": {
      "filePath": "_auth/profile.tsx",
      "parent": "/_auth"
    },
    "/_auth/dashboard": {
      "filePath": "_auth/dashboard",
      "parent": "/_auth",
      "children": [
        "/_auth/dashboard/_supervisor",
        "/_auth/dashboard/meetings",
        "/_auth/dashboard/"
      ]
    },
    "/_auth/dashboard/_supervisor": {
      "filePath": "_auth/dashboard/_supervisor.tsx",
      "parent": "/_auth/dashboard",
      "children": [
        "/_auth/dashboard/_supervisor/add-supervisor",
        "/_auth/dashboard/_supervisor/students-tracking"
      ]
    },
    "/_auth/dashboard/meetings": {
      "filePath": "_auth/dashboard/meetings.tsx",
      "parent": "/_auth/dashboard"
    },
    "/_auth/dashboard/": {
      "filePath": "_auth/dashboard/index.tsx",
      "parent": "/_auth/dashboard"
    },
    "/_auth/dashboard/_supervisor/add-supervisor": {
      "filePath": "_auth/dashboard/_supervisor/add-supervisor.tsx",
      "parent": "/_auth/dashboard/_supervisor"
    },
    "/_auth/dashboard/_supervisor/students-tracking": {
      "filePath": "_auth/dashboard/_supervisor/students-tracking.tsx",
      "parent": "/_auth/dashboard/_supervisor"
    }
  }
}
ROUTE_MANIFEST_END */
