import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
   <div>
      <Link href="/login">
          <a>Login</a>
      </Link>
   </div>
  )
}
