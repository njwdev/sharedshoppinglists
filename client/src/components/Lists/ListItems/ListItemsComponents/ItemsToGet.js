import React from 'react';
import PropTypes from 'prop-types';
import ReportProblemRounded from '@material-ui/icons/ReportProblemRounded';
import Done from '@material-ui/icons/Done';
import MoreVert from '@material-ui/icons/MoreVert';
import ListItemProblemDialog from './ListItemProblemDialog';
import { useTheme } from '@material-ui/core/styles';
import ListItemActionButton from '../ListItemsComponents/ListItemActionButton';
import ListItemsTabPanel from './ListItemsTabPanel';

const ItemsToGet = ({
  completedList,
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
  dateAdded,
  addedBy,
}) => {
  const theme = useTheme();
  const actionButtonsToRender = [
    { icon: <Done />, onClick: () => successHandler(item, false), id: '1' },
    {
      icon: <ReportProblemRounded />,
      onClick: () => dialogOpenHandler(item),
      id: '2',
    },
    { icon: <MoreVert />, disabled: true, id: '3' },
  ];

  return (
    <>
      <ListItemsTabPanel
        completedList={completedList}
        backgroundStyle={
          theme.palette.type === 'dark'
            ? `linear-gradient(to right, ${theme.palette.grey[600]}, ${theme.palette.grey[800]}`
            : `linear-gradient(to right, ${theme.palette.grey[100]}, ${theme.palette.grey[300]}`
        }
        itemName={itemName}
        itemQuantity={quantity}
        itemActions={actionButtonsToRender.map((icon) => (
          <ListItemActionButton
            key={icon.id}
            onClick={icon.onClick}
            disabled={icon.disabled}
            icon={icon.icon}
          />
        ))}
        extraItemInfo={
          dialogOpen ? (
            <ListItemProblemDialog
              listId={listId}
              itemId={itemId}
              dialogOpen={dialogOpen}
              handleDialogClose={handleDialogClose}
              userName={userName}
            />
          ) : null
        }
        itemActionType={'Added by:'}
        itemActionDate={dateAdded}
        itemActionUser={addedBy}
      />
    </>
  );
};

ItemsToGet.propTypes = {
  completedList: PropTypes.bool,
  successHandler: PropTypes.func.isRequired,
  dialogOpenHandler: PropTypes.func.isRequired,
  listId: PropTypes.string.isRequired,
  itemId: PropTypes.string,
  dialogOpen: PropTypes.bool.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
  dateAdded: PropTypes.string.isRequired,
  addedBy: PropTypes.string.isRequired,
};

export default ItemsToGet;
