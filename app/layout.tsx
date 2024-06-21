"use client"

import { Provider } from 'react-redux';
import {store} from '../store/store'
import { AuthProvider } from './hooks/useAuth';

import '../styles/globals.css'

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>
          <Provider store={store}>
            <AuthProvider>
              {children}
            </AuthProvider>
          </Provider>
        </body>
      </html>
    )
  }