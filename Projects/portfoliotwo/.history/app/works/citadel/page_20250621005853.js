"use client"

import ProjectHero from "@/components/templates/projectHero/page"
import SectionOne from "@/components/templates/SectionOne/page"
import SectionThree from "@/components/templates/SectionThree/page"
import SectionFive from "@/components/organisms/SectionFive/page"
import SectionSix from "@/components/templates/SectionSix/page"
import SectionEight from "@/components/templates/SectionEight/page"
import TwoColumnMediaLayout from "@/components/templates/TwoColumnMediaLayout/page"

export default function Citadel({}) {
    return (
        <div className="container">
            <ProjectHero 
                projectName="Citadel"
                date="2022-2025"
                toolsUsed="Shapr3D / Blender / Adobe Photoshop / Adobe After Effects"
                imageSrc="/media/citadel/gate.webp"
            />
            <TwoColumnMediaLayout
                textSide="right"
                stickyConfig={{ column: 'none' }}

                mediaColumnItems={[
                    { imageSrc: "/media/citadel/Beksinski.webp" }
                ]}

                // 4. Provide the content for the RIGHT column using 'textBlocks'.
                textBlocks={[
                    {
                        header: "Inspiration",
                        paragraph: "Zdzisław Beksiński was a Polish artist renowned for his uncanny and dystopian landscapes, often depicting haunting structures and vast, desolate environments. His work, marked by intricate textures and dramatic lighting, blends beauty with horror, evoking themes of isolation and existential dread. Inspired by his 1983 painting, this piece captures his influence through its towering architecture, obscured details, and eerie atmosphere."
                    }
                ]}
            />

            <SectionOne 
                paragraphTitleText="A surreal architectural landscape inspired by Zdzisław Beksiński's 1983 painting in Shapr3D and blender"
            />
            <section className="sectionContainer">
                <SectionFive 
                    challengeHeader = "Model"
                    challengeParagraph = 'Using Shapr3D, the building was created by starting with a large plane, from which various shapes were subtracted to form intricate holes. This plane was then duplicated, and volumes were added to build the final structure, giving depth and complexity to the architecture. This method allowed for the creation of a surreal, imposing design that aligns with the intended atmosphere of the piece.'
                />
                <SectionEight
                    imageOne="/media/citadel/Shapr3DModel1.webp"
                    imageTwo="/media/citadel/Shapr3DModel2.webp"
                />
            </section>
            <SectionSix 
                challengeHeader = "Import to Blender"
                challengeParagraph = "After creating the building in Shapr3D, the model was imported into Blender, where additional elements like lighting and a landscape were incorporated. As seen in the image, a cube was added around the project, and volumetric fog was applied to further enhance the atmosphere, adding both realism and a sense of mystery to the scene."
                sticky = {false}

                imageOne = "/media/citadel/shaprImport.png"
            />
            <section className="sectionContainer">
                <SectionFive 
                    challengeHeader = "Shading"
                    challengeParagraph = "The next step was creating the textures. The building is covered in a rusty texture, giving it an aged, weathered appearance that complements the surreal, dystopian theme. In contrast, the ground features a metallic and rough texture, adding a sense of harshness and weight to the environment. These textural choices help to create a dynamic contrast between the structure and its surroundings, further enhancing the overall atmosphere of the piece."
                />
                <SectionEight
                    imageOne="/media/citadel/shadingBuilding.png"
                    imageTwo="/media/citadel/shadingGround.png"
                    imageThree="/media/citadel/shadingTotal.png"
                    imageFour="/media/citadel/shadingCloseup.png"
                />
            </section>

            <SectionSix 
                challengeHeader = "Rendered Animation"
                challengeParagraph = "The final render was made using the Cycles render engine in Blender. An astronaut model, created by Albin on CGTrader, was added to emphasize the massive scale of the building. The animation is complemented by the track 'What Do You Offer' by Akuma Kira from the game Lost in Vivo. The game itself is a psychological horror that explores themes of isolation, and the song's eerie, ambient tones perfectly align with the surreal and haunting atmosphere in this piece."
                sticky = {false}

                videoOne = "/media/citadel/citadelVideo.mp4"
                initialMute={false}
            />
        </div>
    )
}

//final render in cycles