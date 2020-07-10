import React from 'react';
import PropTypes from 'prop-types';
import ListItemContainer from '../ListItemsComponents/ListItemContainer';
import ListItemColumn from '../ListItemsComponents/ListItemColumn';
import ListItemActionInfo from '../ListItemsComponents/ListItemActionInfo';

const ListItemsTabPanel = ({
  completedList,
  itemName,
  itemQuantity,
  itemActions,
  extraItemInfo,
  backgroundStyle,
  itemActionType,
  itemActionUser,
  itemActionDate,
}) => {
  let columnsToRender = [
    { column: itemName, id: '1' },
    { column: itemQuantity, id: '2' },
    { column: itemActions, id: '3', actionIcons: true },
  ];

  completedList &&
    columnsToRender.pop({ column: itemActions, actionIcons: true });

  return (
    <ListItemContainer backgroundStyle={backgroundStyle} container>
      {columnsToRender.map((column) => (
        <ListItemColumn
          key={column.id}
          completedList={completedList}
          actionIcons={column.actionIcons}>
          {column.column}
        </ListItemColumn>
      ))}
      {extraItemInfo}
      <>
        <ListItemActionInfo
          completedList={completedList}
          itemActionType={itemActionType}
          itemActionDate={itemActionDate}
          itemActionUser={itemActionUser}></ListItemActionInfo>
      </>
    </ListItemContainer>
  );
};

ListItemsTabPanel.propTypes = {
  itemName: PropTypes.string.isRequired,
  itemQuantity: PropTypes.string,
  itemActions: PropTypes.node.isRequired,
  extraItemInfo: PropTypes.node,
};

export default ListItemsTabPanel;
