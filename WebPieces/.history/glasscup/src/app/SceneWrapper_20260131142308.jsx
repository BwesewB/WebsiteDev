'use client'

import dynamic from 'next/dynamic'
import styles from './page.module.css'

const Scene = dynamic(() => import('@/components/Scene/Index'), {
    ssr: false,
})

export default function SceneWrapper() {
  return (
    <main className={styles.main}>
      <Scene />
    </main>
  )
}
