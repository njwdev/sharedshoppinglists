import React from 'react';
import PropTypes from 'prop-types';
import Delete from '@material-ui/icons/Delete';
import Undo from '@material-ui/icons/Undo';
import { useTheme } from '@material-ui/core/styles';
import ListItemActionButton from '../ListItemsComponents/ListItemActionButton';
import ListItemsTabPanel from './ListItemsTabPanel';

const SuccessfulItems = ({
  completedList,
  successHandler,
  deleteHandler,
  itemName,
  quantity,
  item,
  dateGot,
  gotBy,
}) => {
  const theme = useTheme();
  const actionButtonsToRender = [
    { icon: <Undo />, onClick: () => successHandler(item, true), id: '1' },
    { icon: <Delete />, onClick: () => deleteHandler(item), id: '2' },
  ];

  return (
    <>
      <ListItemsTabPanel
        completedList={completedList}
        backgroundStyle={
          theme.palette.type === 'dark'
            ? `linear-gradient(to right, ${theme.palette.success.main}, ${theme.palette.grey[800]}`
            : `linear-gradient(to right, ${theme.palette.success.main}, ${theme.palette.grey[300]}`
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
        itemActionType={'Got by:'}
        itemActionDate={dateGot}
        itemActionUser={gotBy}
      />
    </>
  );
};

SuccessfulItems.propTypes = {
  completedList: PropTypes.bool,
  successHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  itemName: PropTypes.string.isRequired,
  quantity: PropTypes.string,
  item: PropTypes.string.isRequired,
  dateGot: PropTypes.string.isRequired,
  gotBy: PropTypes.string.isRequired,
};

export default SuccessfulItems;
