'use client';

import styles from './ClientsList.module.css';

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
    <div className={styles.clientsList}>
      {clientNames.map((name, index) => (
        <div
          key={index}
          className={styles.clientName}
          onMouseEnter={() => onClientHover(index)}
          onMouseLeave={onClientLeave}
        >
          <h3>{name}</h3>
        </div>
      ))}
    </div>
  );
}
