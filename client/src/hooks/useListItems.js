export const useListItemsData = (list) => {
  const itemsToGetData =
    list &&
    list.listItems.filter(
      (item) => item.success.success === false && item.fail.fail === false
    );

  const problemItemsData =
    list &&
    list.listItems.filter(
      (item) => item.success.success === false && item.fail.fail === true
    );

  const successfulItemsData =
    list &&
    list.listItems.filter(
      (item) => item.success.success === true && item.fail.fail === false
    );

  return [itemsToGetData, problemItemsData, successfulItemsData];
};
