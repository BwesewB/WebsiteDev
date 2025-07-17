import LayoutHero from "@/components/templates/LayoutHero/layoutHero"
import LargeTextSection from "@/components/templates/LargeTextSection/largeTextSection"
import LayoutFive from "@/components/templates/Layout-5/layoutFive"
import LayoutNine from "@/components/templates/Layout-9/layoutNine"
import LayoutSeven from "@/components/templates/Layout-7/layoutSeven"
import LayoutTwo from "@/components/templates/Layout-2/layoutTwo"
import LayoutOne from "@/components/templates/Layout-1/layoutOne"

export default function Citadel() {
    return (
        <div className="container">
            <LayoutHero 
                imageSrc="/media/citadel/gate.webp"
                title="Citadel"
                subHeader="Blender and Shapr3D"
                paragraph="This project explores surreal architectural scale through 3D modeling and atmospheric composition. Built and rendered using Shapr3D and Blender, it presents an imagined structure designed to evoke isolation, ambiguity, and the overwhelming nature of monolithic forms."
                enablePaddingTop={true}
            />
            <LayoutFive
                header="Inspiration"
                paragraph="Zdzisław Beksiński was a Polish artist renowned for his uncanny and dystopian landscapes, often depicting haunting structures and vast, desolate environments. His work, marked by intricate textures and dramatic lighting, blends beauty with horror, evoking themes of isolation and existential dread. Inspired by his 1983 painting, this piece captures his influence through its towering architecture, obscured details, and eerie atmosphere."
                imageSrc="/media/citadel/Beksinski.webp"
            />
            <LargeTextSection 
                paragraphTitleText="A surreal architectural landscape inspired by Zdzisław Beksiński's 1983 painting in Shapr3D and blender"
            />
            <LayoutNine
                header="Model"
                paragraph="Using Shapr3D, the building was created by starting with a large plane, from which various shapes were subtracted to form intricate holes. This plane was then duplicated, and volumes were added to build the final structure, giving depth and complexity to the architecture. This method allowed for the creation of a surreal, imposing design that aligns with the intended atmosphere of the piece."
                imageSrc1="/media/citadel/Shapr3DModel1.webp"
                imageSrc2="/media/citadel/Shapr3DModel2.webp"
            />
            <LayoutTwo 
                header="Import to Blender"
                paragraph1="After creating the building in Shapr3D, the model was imported into Blender, where additional elements like lighting and a landscape were incorporated. As seen in the image, a cube was added around the project, and volumetric fog was applied to further enhance the atmosphere, adding both realism and a sense of mystery to the scene."
                imageSrc="/media/citadel/shaprImport.png"
            />
            <LayoutSeven
                header= "Shading"
                paragraph= "The next step was creating the textures. The building is covered in a rusty texture, giving it an aged, weathered appearance that complements the surreal, dystopian theme. In contrast, the ground features a metallic and rough texture, adding a sense of harshness and weight to the environment. These textural choices help to create a dynamic contrast between the structure and its surroundings, further enhancing the overall atmosphere of the piece."
                mediaItems={[
                    { imageSrc: "/media/citadel/shadingBuilding.png" },
                    { imageSrc: "/media/citadel/shadingTotal.png" },
                    { imageSrc: "/media/citadel/shadingGround.png" },
                    { imageSrc: "/media/citadel/shadingCloseup.png" },
                ]}
                mediaCarouselWidth="90vw"
            />
            <LayoutOne 
                header="Rendered Animation"
                paragraph="The final render was made using the Cycles render engine in Blender. An astronaut model, created by Albin on CGTrader, was added to emphasize the massive scale of the building. The animation is complemented by the track 'What Do You Offer' by Akuma Kira from the game Lost in Vivo. The game itself is a psychological horror that explores themes of isolation, and the song's eerie, ambient tones perfectly align with the surreal and haunting atmosphere in this piece."
                videoSrc="/media/citadel/citadelVideo.mp4"
                switchLayout={false}
            />
        </div>
    )
}

//final render in cycles