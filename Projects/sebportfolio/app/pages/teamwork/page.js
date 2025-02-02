
import styles from "./teamwork.module.css"
import PinSection from "../../components/pageComponents/pinSection/page";
import { cardData } from "./data"; 
import HeroSection from "../..//components/pageComponents/heroSection/page"

export default function Teamwork() {
    return (
        <div className={styles.projectContainer}>
            {/* <h1>Teamwork</h1> */}
            <PinSection cards={cardData}/>
        </div>
    );
}