import React, { Component } from "react";
import "draft-js/dist/Draft.css";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertFromHTML,
  convertToRaw,
  CompositeDecorator,
  ContentState,
  AtomicBlockUtils
} from "draft-js";

import InlineStyleControls from "./InlineStyleControls";
import BlockStyleControls from "./BlockStyleControls";
import ImageButton from "./ImageButton";
import { Div, Toolbar } from "./style";
import Image from "./Image";

import { findImageEntities, mediaBlockRenderer } from "./utils";

const decorators = [
  {
    strategy: findImageEntities,
    component: Image
  }
];

export default class MyEditor extends Component {
  constructor(props) {
    super(props);

    const sampleMarkup =
      "<b>Bold text</b>, <i>Italic text</i><br/ ><br />" +
      '<a href="http://www.facebook.com">Example link</a><br /><br/ >' +
      '<figure><img src="https://cdn.pixabay.com/photo/2016/06/18/17/42/image-1465348_960_720.jpg" height="112" width="200" /></figure>';

    const blocksFromHTML = convertFromHTML(sampleMarkup);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );

    this.state = {
      editorState: EditorState.createWithContent(
        state,
        new CompositeDecorator(decorators),
      )
    };

    this.editorRef = React.createRef();
  }

  onChange = editorState => this.setState({ editorState });

  onFocus = () => this.editorRef.current.focus();

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  };

  mapKeyToEditorCommand = e => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };

  onAddImage = url => {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "IMAGE",
      "IMMUTABLE",
      { src: url }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    });

    this.setState(
      {
        editorState: AtomicBlockUtils.insertAtomicBlock(
          newEditorState,
          entityKey,
          " "
        )
      },
      () => {
        setTimeout(() => this.onFocus(), 0);
      }
    );
  };

  toggleBlockType = blockType => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  toggleInlineStyle = inlineStyle => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  };

  onSave = () => {
    console.log("save");
  };

  render() {
    const { editorState } = this.state;
    return (
      <Div tabIndex="0" onFocus={this.onFocus}>
        <Toolbar>
          <ImageButton onAddImage={this.onAddImage} />
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
        </Toolbar>
        <Editor
          ref={this.editorRef}
          editorState={editorState}
          decorators={decorators}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          keyBindingFn={this.mapKeyToEditorCommand}
          placeholder="Tell a story..."
          blockRendererFn={mediaBlockRenderer}
          spellCheck={true}
        />
        <button onClick={this.onSave}>Save</button>
      </Div>
    );
  }
}
