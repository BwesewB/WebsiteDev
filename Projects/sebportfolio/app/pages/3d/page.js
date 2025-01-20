import styles from "./threeD.module.css";
import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('../../components/torus/Scene'), {
    ssr: false, //u can add placeholder for loading 
    //tells next js only render on client side
})

export default function ThreeD() {
    return (
        <div className={styles.threeDContainer}>
            {/* <h1>3D Page</h1> */}
            <div className={styles.torusScene}>
                <Scene />
            </div>
        </div>
    );
}
