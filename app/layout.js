import { Inter } from 'next/font/google'
import './globals.css'
import Header from "@/components/header/Header";
import {Suspense} from "react";
import Loading from "@/app/loading";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Расписание',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={inter.className}>

            {children}

      </body>
    </html>
  )
}
