import Navbar from '@/components/navbar/navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/footer/footer'

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}
        <Navbar/>
        <Footer/>
      </body>
    </html>
  )
}
