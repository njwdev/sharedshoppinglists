import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import ReportProblemRounded from '@material-ui/icons/ReportProblemRounded';
import ShoppingCartRounded from '@material-ui/icons/ShoppingCartRounded';
import DoneRounded from '@material-ui/icons/DoneRounded';
import Tab from '@material-ui/core/Tab';
import Badge from '@material-ui/core/Badge';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
// import SwipeableViews from 'react-swipeable-views';
import {
  listItemSuccess,
  listItemDelete,
} from '../../../store/actions/listActions';
import Spinner from '../../Layout/Spinner';
import ListItemsColumnTitles from './ListItemsComponents/ListItemsColumnTitles';
import ItemsToGet from './ListItemsComponents/ItemsToGet';
import ProblemItems from './ListItemsComponents/ProblemItems';
import SuccessfulItems from './ListItemsComponents/SuccessfulItems';
import { makeStyles } from '@material-ui/core/styles';
import { useListItemsData } from '../../../hooks/useListItems';
import { useList } from '../../../hooks/useList';
import NoItems from '../../Layout/NoItems';
import ListItemsContainer from './ListItemsComponents/ListItemsContainer';

const useStyles = makeStyles((theme) => ({
  paper: { background: 'initial' },
  tabPanel: { padding: 0 },
  successfulItems: { color: theme.palette.success.main },
  problemItems: { color: theme.palette.error.main },
}));

const ListItems = ({ userName, listItems, listId, completedList }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tab, setTab] = useState('1');
  const [list] = useList();
  //Used for extra item info
  const [itemId, setItemId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(false);
  }, [listItems, loading]);
  const [
    itemsToGetData,
    problemItemsData,
    successfulItemsData,
  ] = useListItemsData(list);

  const successHandler = (id, undo) => {
    const listItemId = id;
    dispatch(listItemSuccess(listId, listItemId, userName, undo));
    setLoading(true);
  };

  const deleteHandler = (id) => {
    const listItemId = id;
    dispatch(listItemDelete(listId, listItemId));
    setLoading(true);
  };

  const dialogOpenHandler = (itemId) => {
    setDialogOpen(true);
    setItemId(itemId);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleTabChange = (e, value) => {
    setTab(value);
  };

  const tabsToRender = [
    {
      icon: <ShoppingCartRounded />,
      badgeContent: itemsToGetData.length,
      label: 'Items To Get',
      value: '1',
    },
    {
      icon: <ReportProblemRounded className={classes.problemItems} />,
      badgeContent: problemItemsData.length,
      label: 'Problem Items',
      value: '2',
    },
    {
      icon: <DoneRounded className={classes.successfulItems} />,
      badgeContent: successfulItemsData.length,
      label: 'Successful Items',
      value: '3',
    },
  ];

  return loading ? (
    <Spinner />
  ) : (
    <>
      <ListItemsContainer>
        <TabContext value={tab}>
          <TabList
            variant='fullWidth'
            onChange={handleTabChange}
            aria-label='list navigation tabs'>
            {tabsToRender.map((tab) => (
              <Tab
                key={tab.label}
                icon={<Badge badgeContent={tab.badgeContent}>{tab.icon}</Badge>}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </TabList>

          <ListItemsColumnTitles
            completedList={completedList}
            column1Title='Item'
            column2Title='Quantity'
            column3Title='Actions'
          />
          <TabPanel className={classes.tabPanel} value='1'>
            {itemsToGetData.length ? (
              itemsToGetData.map((item) => (
                <ItemsToGet
                  key={item._id}
                  completedList={completedList}
                  successHandler={successHandler}
                  deleteHandler={deleteHandler}
                  dialogOpenHandler={dialogOpenHandler}
                  listId={listId}
                  itemId={itemId}
                  dialogOpen={dialogOpen}
                  handleDialogClose={handleDialogClose}
                  userName={userName}
                  itemName={item.itemName}
                  quantity={item.quantity}
                  item={item._id}
                  dateAdded={item.dateAdded}
                  addedBy={item.addedBy.name}
                />
              ))
            ) : (
              <NoItems noItemsText='No items to get.' />
            )}
          </TabPanel>
          <TabPanel style={{ padding: 0 }} value='2'>
            {problemItemsData.length ? (
              problemItemsData.map((item) => (
                <ProblemItems
                  key={item._id}
                  completedList={completedList}
                  deleteHandler={deleteHandler}
                  successHandler={successHandler}
                  listId={listId}
                  reason={item.fail.reason}
                  optionalNote={item.fail.optionalNote}
                  failDate={item.fail.failDate}
                  attemptedBy={item.fail.name}
                  itemName={item.itemName}
                  quantity={item.quantity}
                  listItemId={item._id}></ProblemItems>
              ))
            ) : (
              <NoItems noItemsText='No problem items.' />
            )}
          </TabPanel>
          <TabPanel style={{ padding: 0 }} value='3'>
            {successfulItemsData.length ? (
              successfulItemsData.map((item) => (
                <SuccessfulItems
                  deleteHandler={deleteHandler}
                  key={item._id}
                  completedList={completedList}
                  successHandler={successHandler}
                  gotBy={item.success.name}
                  itemName={item.itemName}
                  quantity={item.quantity}
                  dateGot={item.success.dateGot}
                  item={item._id}
                />
              ))
            ) : (
              <NoItems noItemsText='No items purchased.' />
            )}
          </TabPanel>
        </TabContext>
      </ListItemsContainer>
    </>
  );
};

ListItems.propTypes = {
  userName: PropTypes.string.isRequired,
  listItems: PropTypes.array.isRequired,
  listId: PropTypes.string.isRequired,
  completedList: PropTypes.bool,
};

export default ListItems;
