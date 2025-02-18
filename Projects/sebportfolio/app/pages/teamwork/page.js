
import styles from "./teamwork.module.css"
import PinSection from "../../components/pageComponents/pinSection/page";
import { cardData } from "./data"; 
import HeroSection from "../..//components/pageComponents/heroSection/page"

export default function Teamwork() {
    return (
        <div className="pinContainer">
            <PinSection 
                cards={cardData}
                heroSectionTitle="Teamwork"
                japaneseText="チームワーク"
            />
        </div>
    );
}