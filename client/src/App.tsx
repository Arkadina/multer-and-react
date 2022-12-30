import { useEffect, useState } from "react";
// @ts-ignore
import styled from "styled-components";

// @ts-ignore
import ImageForm from "./components/ImageForm";
// @ts-ignore
import ImageRender from "./components/ImageRender";

import axios from "axios";

const AppContainer = styled.div`
    display: flex;
    color: #fff;
    flex-direction: column;
    align-items: center;
    color: #929292;

    .appContainerTop {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: row;
        margin-top: 100px;
        width: 80%;
    }

    .appContainerBreakRow {
        background-color: #929292;
        width: 80%;
        height: 0.5px;
        margin: 20px 0 30px 0;
    }

    .appContainerBottom {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80%;
        margin: 40px;
    }
`;

const ButtonContainer = styled.button`
    display: inline-block;
    padding: 10px 36px;
    font-weight: 600;
    font-size: 14px;
    background-color: #f5f5f5;
    border: 1px solid #929292;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 13px;
    color: #808080;
`;

export interface Data {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    languages: string[];
    state: string;
    imgName: string;
}

function App() {
    const [data, setData] = useState<Data[]>([]);
    const [isEditing, setIsEditing] = useState<boolean>(true);

    useEffect(() => {
        getData();
    }, []);

    function handleOnClick(props: boolean) {
        setIsEditing(props);
    }

    function getData() {
        axios
            .get("http://localhost:3000/")
            .then((res) => setData(res.data.employees))
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <AppContainer>
            <div className="appContainerTop">
                <ButtonContainer onClick={(e) => handleOnClick(true)}>
                    Add employee
                </ButtonContainer>
                <ButtonContainer onClick={(e) => handleOnClick(false)}>
                    Employees
                </ButtonContainer>
            </div>
            <div className="appContainerBreakRow"></div>
            <div className="appContainerBottom">
                {isEditing ? (
                    <ImageForm />
                ) : data ? (
                    <ImageRender data={data} />
                ) : (
                    ""
                )}
            </div>
        </AppContainer>
    );
}

export default App;
