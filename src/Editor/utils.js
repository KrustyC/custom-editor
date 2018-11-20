import Image from './Image'

export const findImageEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "IMAGE"
    );
  }, callback);
};

export const mediaBlockRenderer = (block) => {
  console.log(block, block.getType());
  if (block.getType() === "atomic") {
    return {
      component: Image,
      editable: false
    };
  }

  return null;
}
