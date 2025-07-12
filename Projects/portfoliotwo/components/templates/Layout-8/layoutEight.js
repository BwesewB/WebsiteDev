import GridLayout from "@/components/atoms/gridLayout/gridLayout"
import TextContainer from "@/components/atoms/textContainer/page"
import MediaBlock from "@/components/molecules/MediaBlock/MediaBlock"

export default function LayoutEight({}) {
    return (
        <>
            <GridLayout>
                <GridLayout.Item 
                    colStart={1} 
                    colEnd={2} 
                    rowStart={1} 
                    rowEnd={2}
                >
                </GridLayout.Item>
            </GridLayout>
        </>
    )
}