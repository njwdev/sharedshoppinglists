import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import CardContent from '@material-ui/core/CardContent';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import EditOutlined from '@material-ui/icons/EditOutlined';
import { MdEdit } from 'react-icons/md';
import { deleteList } from '../../store/actions/listActions';
import DeleteList from './DeleteList';

import Moment from 'react-moment';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(1),
    border: '1px solid rgba(255,105,180,0.2)',
    boxShadow: '3px 3px 10px rgba(255,105,180,0.2)',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
  actionContent: {
    // display: 'flex',
    // flexGrow: 1,
  },

  actionIcons: {
    float: 'right',
  },
  icon: {
    margin: theme.spacing(0, 1),
    cursor: 'pointer',
    textDecoration: 'none',
    // color: 'rgba(0, 0, 0, 0.87)',
  },
  cardAction: {
    padding: theme.spacing(0, 1),
    lineHeight: '1',
    margin: '0px 0',
  },
  title: {
    // display: 'flex',
    flexGrow: 1,
  },
  sharedWithText: {
    color: theme.palette.primary.light,
    // margin: theme.spacing(0, 1),
  },
}));

const List = ({ list }) => {
  useEffect(() => {}, [list]);
  const history = useHistory();
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const classes = useStyles();
  const { _id, creator, title, lastUpdated, listUsers } = list;

  const sharedWith = listUsers.filter((u) => u.userId !== user._id);
  //filters out current user from list

  const cardActionsData = [
    {
      actionText: 'Last updated:  ',
      actionData: (
        <Moment format="MMMM Do YYYY, [at] HH:mm">{lastUpdated}</Moment>
      ),
      actionIcon: <MdEdit></MdEdit>,
    },
    {
      actionText: 'Shared with: ',
      actionData: sharedWith.map((u, i) => (
        <span key={u._id} className={classes.sharedWithText}>
          {u.name}
          {i === sharedWith.length - 1 ? null : ','} {''}
        </span>
      )),
      actionIcon: <MdEdit></MdEdit>,
    },
  ];

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDeleteList = (id) => {
    dispatch(deleteList(id, history));
  };

  return (
    <Card className={classes.root}>
      <Link className={classes.link} to={`/lists/${_id}`}>
        <CardContent>
          <div className={classes.title}>
            <Typography variant="h6">{title}</Typography>
          </div>
        </CardContent>
        <div className={classes.actionContent}>
          {cardActionsData.map((data) => (
            <CardActions key={data.actionText} className={classes.cardAction}>
              <Typography variant="caption">
                {data.actionText} {data.actionData}
              </Typography>
            </CardActions>
          ))}
        </div>
      </Link>
      <div className={classes.actionIcons}>
        <Tooltip aria-label="edit list title" title="edit">
          <EditOutlined
            aria-label="edit list title"
            className={classes.icon}
          ></EditOutlined>
        </Tooltip>
        {creator && (
          <Tooltip aria-label="delete" title="delete">
            <DeleteOutlined
              className={classes.icon}
              color={user._id === creator ? 'inherit' : 'disabled'}
              onClick={() => setDialogOpen(true)}
              list={list}
            />
          </Tooltip>
        )}
        {dialogOpen ? (
          <DeleteList
            dialogOpen
            handleDialogClose={() => handleDialogClose()}
            handleDeleteList={(id) => handleDeleteList(list._id)}
            list={list}
          />
        ) : null}
      </div>
    </Card>
  );
};

List.propTypes = {
  list: PropTypes.object.isRequired,
};

export default List;
