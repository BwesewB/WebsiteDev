import styles from "./threeD.module.css";
import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('./torus/Scene'), {
    ssr: false, //u can add placeholder for loading 
    loading: () => <h1 style={{color:"var(--white)", position: "absolute", top: "50%", right: "50%"}}>Loading...</h1>,
    //tells next js only render on client side
})

export default function ThreeD() {
    return (
        <div className={styles.threeDContainer}>
            {/* <h1>3D Page</h1> */}
            {/* <div className={styles.torusSceneHeight}>

            </div> */}
            <div className={styles.torusScene}>
                <Scene />
            </div>
            <div className={styles.threeDProjectDisplay}>
                {/* <h1>bruh</h1> */}
            </div>
        </div>
    );
}
