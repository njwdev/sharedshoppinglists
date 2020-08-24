export const useCreator = (list, user) => {
  let creator;
  if (list.creator.id === user._id) creator = true;
  else creator = false;
  return creator;
};
