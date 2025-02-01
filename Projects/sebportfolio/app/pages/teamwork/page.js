
import styles from "./teamwork.module.css"
import PinSection from "../../components/pageComponents/pinSection/page";
import { cardData } from "./data"; 
import HeroSection from "../..//components/pageComponents/heroSection/page"

export default function Teamwork() {
    return (
        <>
            {/* <HeroSection /> */}
            <h1>Teamwork</h1>
            <PinSection cards={cardData}/>
        </>
    );
}