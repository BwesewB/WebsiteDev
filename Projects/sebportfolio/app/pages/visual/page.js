
import styles from './visual.module.css';
import PinSection from "../../components/pageComponents/pinSection/page";
import { cardData } from "./data"; 
import HeroSection from "../..//components/pageComponents/heroSection/page"


export default function Visual() {
    return (
        <div className="pinContainer">
            <PinSection cards={cardData}/>
        </div>
    );
}

