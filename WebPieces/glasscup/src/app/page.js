"use client";

import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('../components/Scene/Index'), {
    ssr: false,
    loading: () => <h1 style={{color:"black", position: "absolute", top: "50%", right: "50%"}}>Loading...</h1>,
})

export default function Home() {
  return <Scene />;
}