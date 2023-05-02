import React, { FC, ReactNode } from "react";
import Head from "next/head";

type MainLayoutProps = {
    title?: string;
    description?: string;
    keywords?: string;
    children?: ReactNode;
}

const MainLayout: FC<MainLayoutProps> =
    ({
         children,
         title,
         description,
         keywords
     }) => {
        
        return (
            <>
                <Head>
                    <title>{title || "Music platform"}</title>
                    <meta
                        name="description"
                        content={"Music platform for free. You can listen and upload tracks. " + description}
                    />
                    <meta name="robots" content="index follow" />
                    <meta name="keywords" content={keywords || "music, tracks, platform"} />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                </Head>
                
                {children}
            
            </>
        );
    };

export default MainLayout;
