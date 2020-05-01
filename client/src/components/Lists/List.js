import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
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

import Moment from 'react-moment';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(1),
    border: '1px solid rgba(255,105,180,0.2)',
    boxShadow: '3px 3px 10px rgba(255,105,180,0.2)',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  downIcon: {
    height: '100%',
    margin: '0 1%',
    cursor: 'pointer',
  },
  actionIcons: {
    float: 'right',
    flexGrow: 1,
  },
  icon: {
    margin: '0 1rem',
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
}));

const List = ({ list }) => {
  const [showListInfo, setShowListInfo] = useState(false);
  const dispatch = useDispatch();
  const setShowListHandler = () => {
    setShowListInfo(!showListInfo);
  };
  const classes = useStyles();
  const { title, dateCreated, lastUpdated, listUsers } = list;

  const cardActionsData = [
    {
      actionText: 'Last updated:  ',
      actionData: (
        <Moment format="MMMM Do YYYY, [at] HH:mm">{lastUpdated}</Moment>
      ),
      actionIcon: <MdEdit></MdEdit>,
    },
    // {
    //   actionText: 'Created: ',
    //   actionData: (
    //     <Moment format="MMMM Do YYYY, [at] h:mm a">{dateCreated}</Moment>
    //   ),
    //   actionIcon: <MdEdit></MdEdit>,
    // },
    {
      actionText: 'Shared with: ',
      actionData: (
        <span style={{ color: 'rgba(255,105,180,1)' }}>
          {listUsers.length <= 1 ? 'No one' : listUsers}
        </span>
      ),
      actionIcon: <MdEdit></MdEdit>,
    },
  ];

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.title}>
          <Typography variant="h6">{title}</Typography>
          <div className={classes.actionIcons}>
            <Tooltip aria-label="edit list title" title="edit">
              <EditOutlined
                aria-label="edit list title"
                className={classes.icon}
              ></EditOutlined>
            </Tooltip>
            <Tooltip aria-label="delete" title="delete">
              <DeleteOutlined
              // onClick={() => dispatch(deleteList(id))}
              />
            </Tooltip>
          </div>
        </div>

        {showListInfo ? (
          <ul>
            <li>ss</li>
            <li>ss</li>
            <li>s</li>
          </ul>
        ) : null}
      </CardContent>
      {cardActionsData.map((data) => (
        <CardActions key={data.actionText} className={classes.cardAction}>
          <Typography variant="caption">
            {data.actionText} {data.actionData}
          </Typography>
        </CardActions>
      ))}

      {showListInfo ? (
        <CardActions>
          <p> Something here</p>
        </CardActions>
      ) : null}
    </Card>
  );
};

List.propTypes = {
  list: PropTypes.object.isRequired,
};

export default List;
