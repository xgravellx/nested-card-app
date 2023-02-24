import styled from "styled-components";

export const Styled = styled.div`
    margin: 2rem;
    .card {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .card-general {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid #5850ec;
        border-radius: 0.5rem;
        padding: .5rem;
        width: 10rem;
        background-color: #3C4042;
        box-shadow: 0px 0px 20px -14px #5850ec;
    }
    .card-numberInput {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        font-size: 1.5rem;
        font-weight: bold;
        color: #5850ec;
    }

    .card-replies {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .card-controls {
        display: flex;
        width: 100%;
        justify-content: space-evenly;
        padding: 1rem;
        font-size: small;
    }
`