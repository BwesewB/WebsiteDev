'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import CustomEase from 'gsap/dist/CustomEase';

interface ClientsListProps {
  assets: string[];
  onClientHover: (index: number) => void;
  onClientLeave: () => void;
}

export default function ClientsList({
  assets,
  onClientHover,
  onClientLeave,
}: ClientsListProps) {
  const clientNames = [
    'Black Hole,',
    'Citadel,',
    'Decked,',
    'Offcut,',
    'PIKIO Labs,',
    'Reimagining Spaces,',
    'Igara,',
    'Taxes',
  ];

  return (
    <div className="clients-list">
      {clientNames.map((name, index) => (
        <div
          key={index}
          className="client-name"
          onMouseEnter={() => onClientHover(index)}
          onMouseLeave={onClientLeave}
        >
          <h3>{name}</h3>
        </div>
      ))}
    </div>
  );
}
