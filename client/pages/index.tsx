import React from "react";

const IndexPage = () => {
    return (
        <>
            <div className='center'>
                <h1>Онлайн музыкальный плеер</h1>
            </div>
            <style jsx>
                {`
                  .center {
                    margin-top: 150px;
                    display: flex;
                    flex-direction: column;
                    align-content: center;
                    justify-content: center;
                  }
                `}
            </style>
        </>
    );
};

export default IndexPage;
