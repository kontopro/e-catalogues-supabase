import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className='main'>
      <div >
        <p>You are in pages home directory</p>        
      </div>
    </main>
  )
}
