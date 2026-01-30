'use client';

import { useState } from 'react';
import ClientsList from '@/components/ClientsList';
import MediaElement from '@/components/MediaElement';
import styles from './ClientsSection.module.css';

export default function ClientsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const assets = [
    'Clip1.mp4',
    'citadelVideo.mp4',
    'fishCanVideo.mp4',
    'ChalkAnimation.mp4',
    'Oblik.png',
    'Toilet1.webp',
    'Render6.png',
    'AvoidTaxesClip.mp4',
  ];

  return (
    <section className={styles.clients}>
      <div className={styles.clientsPreview}>
        {activeIndex !== null && (
          <MediaElement
            src={assets[activeIndex]}
            isVisible={activeIndex !== null}
          />
        )}
      </div>

      <div className={styles.clientsHeader}>
        <p className={styles.clientsHeaderText}>WORKS</p>
      </div>

      <ClientsList
        assets={assets}
        onClientHover={(index) => setActiveIndex(index)}
        onClientLeave={() => setActiveIndex(null)}
      />
    </section>
  );
}
