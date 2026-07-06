"use client";

import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('../components/Scene/Index'), {
    ssr: false, //u can add placeholder for loading 
    loading: () => <h1 style={{color:"var(--white)", position: "absolute", top: "50%", right: "50%"}}>Loading...</h1>,
    //tells next js only render on client side
})

export default function Home() {
  return <Scene />;
}