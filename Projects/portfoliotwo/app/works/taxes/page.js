import LayoutHero from "@/components/templates/LayoutHero/layoutHero"

export default function Taxes () {
    return (
        <div className="container">
            <LayoutHero 
                height='min(55vw, 90vh)'
                title="TAXES!"
                subHeader="Comedic First Animation"
                paragraph="Turning 18 introduced a whole new world of pain; taxes. To capture this, a lighthearted and comedic video was crafted to poke fun at the struggles of navigating taxes as a young adult with a light and colorful theme. The creative direction shifted from using complex graphics to incorporating video clips, with graphic elements setting up what would unfold in the video. This decision allowed for smoother storytelling and dynamic pacing, providing a fresh and engaging way to turn a stressful situation into something relatable and entertaining."
                enablePaddingTop={true}
                videoSrc="/media/taxes/GOTTEM.mp4"
            />
        </div>
    )
}