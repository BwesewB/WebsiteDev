import Head from "next/head";

export default function HeadData({ 
    title, 
    description 
}){
    return(
        <>
            <Head>
                <title>{title}</title>
                <meta name="author" content="Created by Sebastian Fok. Media by Colin Chan"/>
                <meta name="description" content={description}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href=""/>
            </Head>
        </>
    );
};