import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    margin-bottom: 10px;
`;

const RenderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
    border: 1px solid #929292;
    padding: 0 30px;
    color: #929292;
    height: 80px;
    width: 100%;
    margin-right: 20px;

    img {
        background-color: #fff;
        width: 60px;
        height: 60px;
        border: none;
        border-radius: 8px;
        object-fit: cover;
    }

    &:not(:last-of-type) {
        margin-bottom: 20px;
    }
`;

interface Data {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    languages: string[];
    state: string;
    imgName: string;
}

function ImageRender({ data }: { data: Data[] }) {
    console.log(data);

    return (
        <Container>
            {data
                ? data.map((item, index) => (
                      <RenderContainer key={index}>
                          <img
                              src={`http://localhost:3000/${item.imgName.slice(
                                  0,
                                  item.imgName.length - 4
                              )}`}
                          />
                          <p>
                              {item.firstName} {item.lastName}
                          </p>
                          <p>{item.email}</p>
                          <p>{item.languages.join()}</p>
                          <p>{item.state}</p>
                      </RenderContainer>
                  ))
                : ""}
        </Container>
    );
}

export default ImageRender;
