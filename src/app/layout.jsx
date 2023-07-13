import './styles/globals.css'
import style from '@/app/styles/container.module.css'
import Navbar from '@/components/Navbar'
import AuthProvider from '@/components/authProvider'
import Footer from '@/components/footer'

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={style.body}>
        <AuthProvider>
          <Navbar/>
          <main className={style.container}>
              {children}
          </main>
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  )
}
