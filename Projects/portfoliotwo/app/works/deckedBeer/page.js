import ViewCanvas from "./cans/page"
import LayoutHero from "@/components/templates/LayoutHero/layoutHero"
import LayoutNine from "@/components/templates/Layout-9/layoutNine"
import LayoutSeven from "@/components/templates/Layout-7/layoutSeven"

export default function DeckedBeer({}) {
    return (
        <div className="container">
            <LayoutHero 
                height='80vh'
                title="Decked Beer"
                subHeader="Product Design"
                paragraph="Decked Beer is a premium lager concept designed for fishermen wanting to have a good time. The brand pairs a clean, fish-themed identity with custom 3D cans modeled in Blender and labeled in Photoshop. The final product was integrated into a web experience using Three.js."
                children={<ViewCanvas />}
                enablePaddingTop={true}
            />
            <LayoutNine 
                header="Graphics"
                paragraph='The labels were thoughtfully crafted for fishermen, incorporating subtle yet meaningful design elements reinforcing the theme. Each label includes step-by-step instructions for crafting a hook from the cans pin and features a fishy "DO NOT FEED THE FISH" graphic. To accommodate distribution in Canada, both French and English were integrated for accessibility.'
                imageSrc1="/media/cans/noFeedFish.svg"
                imageSrc2="/media/cans/hookInstructions.svg"
                useObjectFitCover={false}
                scale={0.5}
                switchLayout={false}
            />
            <LayoutSeven 
                header= "Labels"
                paragraph= "Decked Lager is a premium brew designed with fishermen in mind, featuring three distinct label variations—Seaweed, Crab, and Fish. Each design draws from maritime elements, reinforcing the brand’s connection to the fishing community. With a focus on quality and craftsmanship, Decked delivers a refined lager experience while embracing the culture of those who spend their days on the water."
                mediaItems={[
                    { imageSrc: "/media/cans/labels/Fish@2x.png" },
                    { imageSrc: "/media/cans/labels/Crab@2x.png" },
                    { imageSrc: "/media/cans/labels/Seaweed@2x.png" }
                ]}
                mediaCarouselWidth="120vw"
                mediaCarouselHeight="50vh"
            />

            {/* <SectionTwo 
                videoSrc="/media/cans/fishCanVideo.mp4"
            />
            <LargeTextSection 
                paragraphTitleText="Blender was used to bring Decked to life, creating realistic product visuals that showcased the custom label designs and branding."
            />
            <SectionEight
                imageOne="/media/cans/3cans1.png"
                imageTwo="/media/cans/3cans2.png"
            /> */}
        </div>
    )
}