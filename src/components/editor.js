import React from 'react';
import { createReactEditorJS } from 'react-editor-js'
import { EDITOR_JS_TOOLS } from '../lib/editorJsConfig';

import styled from "styled-components";

const ReactEditorJS = createReactEditorJS()

const StyledEditor = styled(ReactEditorJS)`
  width: 100%;
  height: 200px;
`;


export const Editor = (props) => {
  const editorJS = React.useRef(null)

  const handleInitialize = React.useCallback((instance) => {
    editorJS.current = instance
  }, [])

  const handleSave = React.useCallback(async() => {
    const savedData = await editorJS.current.save();
    props.handleChange(JSON.stringify(savedData))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <StyledEditor
      defaultValue={props.defaultValue}
      onInitialize={handleInitialize}
      tools={EDITOR_JS_TOOLS}
      onChange={() => handleSave()}
    />
  )
}
