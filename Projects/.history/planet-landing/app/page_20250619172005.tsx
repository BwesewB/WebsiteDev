import dynamic from 'next/dynamic';
import Head from 'next/head';

const PlanetScene = dynamic(() => import('@/components/Scene'), {
  // ssr: false,
  loading: () => <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000010', color: 'white', fontSize: '20px'}}>Initializing Scene...</div>
});

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Baked Ocean Planet</title>
        <meta name="description" content="Interactive 3D ocean planet with baked Blender animations" />
      </Head>
      <main>
        <PlanetScene />
      </main>
    </>
  );
}