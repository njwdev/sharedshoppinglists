import React from 'react';
import PropTypes from 'prop-types';
import Done from '@material-ui/icons/Done';
import MoreVert from '@material-ui/icons/MoreVert';
import { useTheme } from '@material-ui/core/styles';
import ListItemActionButton from '../ListItemsComponents/ListItemActionButton';
import ListItemsTabPanel from './ListItemsTabPanel';
import ListItemProblemInfo from './ListItemProblemInfo';

const ProblemItems = ({
  completedList,
  successHandler,
  reason,
  optionalNote,
  failDate,
  attemptedBy,
  itemName,
  quantity,
  listItemId,
}) => {
  const theme = useTheme();
  const actionButtonsToRender = [
    {
      icon: <Done />,
      onClick: () => successHandler(listItemId, false),
      id: '1',
    },
    { icon: <MoreVert />, disabled: true, id: '2' },
  ];

  return (
    <>
      <ListItemsTabPanel
        completedList={completedList}
        backgroundStyle={
          theme.palette.type === 'dark'
            ? `linear-gradient(to right, ${theme.palette.error.main}, ${theme.palette.grey[800]}`
            : `linear-gradient(to right, ${theme.palette.error.main}, ${theme.palette.grey[300]}`
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
          <ListItemProblemInfo
            reason={reason}
            optionalNote={optionalNote}></ListItemProblemInfo>
        }
        itemActionType={'Attempted by:'}
        itemActionDate={failDate}
        itemActionUser={attemptedBy}
      />
    </>
  );
};

ProblemItems.propTypes = {
  completedList: PropTypes.bool,
  successHandler: PropTypes.func.isRequired,
  reason: PropTypes.string.isRequired,
  optionalNote: PropTypes.string,
  failDate: PropTypes.string.isRequired,
  attemptedBy: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
  quantity: PropTypes.string,
  listItemId: PropTypes.string.isRequired,
};

export default ProblemItems;
