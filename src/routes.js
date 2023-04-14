import { Navigate } from 'react-router-dom'
import { AuthPage, CalendarPage, ProjectReportPage, TotalContactsPage } from '../src/pages/index'
import { Layout } from './components/layout/Layout'

const AuthRoutesList = [
    { element: <CalendarPage />, path: '/calendar' },
    { element: <ProjectReportPage />, path: '/projectreport' },
    { element: <TotalContactsPage />, path: '/totalcontacts' },
]

const publicRoutes = [
    { element: <AuthPage />, path: '/auth' },
]


const defaultRoutes = [
    {
        path: "*",
        element: <Navigate to="/totalcontacts" replace />,
    },
    {
        path: "/",
        element: <Navigate to="/auth" replace />,
    },
]

const authRoutes = []
AuthRoutesList.map(item => {
    authRoutes.push({
        path: item.path,
        element: <Layout>
            {item.element}
        </Layout>
    })
})

export const routes = publicRoutes.concat(authRoutes, defaultRoutes)