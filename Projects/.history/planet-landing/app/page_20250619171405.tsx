import dynamic from 'next/dynamic';
import Head from 'next/head';

// Dynamically import the Scene component with SSR disabled
const PlanetScene = dynamic(() => import('@/components/Scene'), {
  ssr: false, // This is important because Three.js uses window/document
  loading: () => <p style={{color: 'white', textAlign: 'center', paddingTop: '40vh'}}>Loading Planet...</p> // Optional loading indicator
});

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Ocean Planet Landing</title>
        <meta name="description" content="Interactive 3D ocean planet with Next.js, Three.js, and GSAP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PlanetScene />
        {/* You can add text overlays here if needed */}
        {/* <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          textAlign: 'center',
          pointerEvents: 'none' // So it doesn't interfere with mouse tracking on canvas
        }}>
          <h1>Welcome to the Ocean Planet</h1>
          <p>Move your mouse to explore.</p>
        </div> */}
      </main>
    </>
  );
}