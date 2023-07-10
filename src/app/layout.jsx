import { Inter } from 'next/font/google'
import './styles/globals.css'
import style from '@/app/styles/container.module.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/footer'


const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Navbar/>
        <div className={style.container}>
            {children}
        </div>
        <Footer/>
      </body>
    </html>
  )
}
