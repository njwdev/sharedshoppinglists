import React from 'react';
import Done from '@material-ui/icons/Done';
import Close from '@material-ui/icons/Close';
import MoreVert from '@material-ui/icons/MoreVert';
import ListItemProblem from '../ListItemProblem';
import ListItemsTableContent from '../ListLayoutComponents/ListItemsTableContent';

const ItemsToGet = ({
  successHandler,
  dialogOpenHandler,
  listId,
  itemId,
  dialogOpen,
  handleDialogClose,
  userName,
  itemName,
  quantity,
  item,
}) => {
  return (
    <>
      <ListItemsTableContent
        itemName={itemName}
        itemQuantity={quantity}
        itemActions={
          <>
            <Done onClick={() => successHandler(item, false)}></Done>
            <Close onClick={() => dialogOpenHandler(item)}></Close>
            <MoreVert></MoreVert>
          </>
        }
        itemDialog={
          dialogOpen ? (
            <ListItemProblem
              listId={listId}
              itemId={itemId}
              dialogOpen={dialogOpen}
              handleDialogClose={handleDialogClose}
              userName={userName}
            />
          ) : null
        }
      />
    </>
  );
};

export default ItemsToGet;
