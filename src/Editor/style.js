import React, { Component } from "react";
import styled from "styled-components";
import "draft-js/dist/Draft.css";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from "draft-js";

export const Div = styled.div`
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;


  .DraftEditor-root {
    overflow-y: auto;
    max-height: 60vh;
    font-size: 14px;
    padding-right: 5px;
    width: 500px;
    min-height: 300px;
    border: 1px solid black;

    ::-webkit-scrollbar {
      width: 3px;
      height: 3px;
      border-top-right-radius: 3px;
    }

    ::-webkit-scrollbar-track {
      background: #e1e1e1;
      border-top-right-radius: 3px;
    }

    ::-webkit-scrollbar-thumb {
      background: #7ccafc;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #7ccafc;
    }
  }
`;

export const Toolbar = styled.div`
  background: palevioletred;
`

export const Button = styled.div`
  background: green;
  color: white;
`
