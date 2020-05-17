import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import Done from '@material-ui/icons/Done';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import MoreVert from '@material-ui/icons/MoreVert';
import Close from '@material-ui/icons/Close';
import Undo from '@material-ui/icons/Undo';
import { listItemSuccess } from '../../store/actions/listActions';
import Spinner from '../Layout/Spinner';
import ListItemProblem from '../Lists/ListItemProblem';
import Moment from 'react-moment';
import ListItemsColumnTitles from './ListLayoutComponents/ListItemsColumnTitles';
import ListItemsTableContent from './ListLayoutComponents/ListItemsTableContent';
import ItemsToGet from './ListItemsContent/ItemsToGet';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(1),
    border: '1px solid rgba(255,105,180,0.2)',
    boxShadow: '3px 3px 10px rgba(255,105,180,0.2)',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  successContainer: {
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
    background: 'linear-gradient(to right, rgba(0,255,0,0.2), rgba(0,0,0,0.5))',
    boxShadow: '1px 1px 2px rgba(255,105,180,0.2)',
    color: theme.palette.text.disabled,
  },
  successDetails: {
    padding: theme.spacing(1),
  },
  failContainer: {
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
    background:
      'linear-gradient(to right, rgba(255,255,0,0.2), rgba(0,0,0,0.5))',
    boxShadow: '1px 1px 2px rgba(255,105,180,0.2)',
    color: theme.palette.text.disabled,
  },
  gotByText: {
    color: theme.palette.primary.light,
  },
}));

const ListItems = ({ userName, listItems, listId }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tab, setTab] = useState(1);
  const [itemId, setItemId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(false);
  }, [listItems, loading]);

  const successHandler = (id, undo) => {
    const listItemId = id;
    dispatch(listItemSuccess(listId, listItemId, userName, undo));
    setLoading(true);
  };

  const dialogOpenHandler = (itemId) => {
    console.log(itemId);
    setDialogOpen(true);
    setItemId(itemId);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleTabChange = () => {
    setTab();
  };

  return loading ? (
    <Spinner />
  ) : (
    <>
      <ListItemsColumnTitles
        column1Title="Item"
        column2Title="Quantity"
        column3Title="Actions"
      />

      {listItems &&
        listItems
          .filter(
            (item) =>
              item.success.success === false && item.fail.fail === false,
          )
          .map((item) => (
            <ItemsToGet
              successHandler={successHandler}
              dialogOpenHandler={dialogOpenHandler}
              listId={listId}
              itemId={itemId}
              dialogOpen={dialogOpen}
              handleDialogClose={handleDialogClose}
              userName={userName}
              itemName={item.itemName}
              quantity={item.quantity}
              item={item._id}
            />
          ))}
    </>
  );
};

export default ListItems;
