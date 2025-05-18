import { PropsWithChildren } from 'react'

const Layout = ({children} : PropsWithChildren) => {
  return (
    <div className="bg-gradient-to-br from-black to-gray-900 min-h-screen text-white">
      header
      <main className="min-h-screen container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t backdrop-blur">
        <div className="container mx-auto px-4 py-8 text-center text-gray-400">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout