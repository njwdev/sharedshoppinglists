import React, { useEffect, useState } from 'react';
import {
  fetchList,
  updateList,
  deleteList,
} from '../../store/actions/listActions';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import CardContent from '@material-ui/core/CardContent';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import EditOutlined from '@material-ui/icons/EditOutlined';
import Done from '@material-ui/icons/Done';
import Settings from '@material-ui/icons/Settings';
import Spinner from '../Layout/Spinner';
import PageContainer from '../Layout/PageContainer';
import AddItem from './AddItem';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import ListItems from './ListItems';
import DeleteList from './DeleteList';
import Input from '@material-ui/core/Input';
import { useHistory } from 'react-router-dom';

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
  divider: {
    border: `1px solid ${theme.palette.primary.light}`,
    opacity: '0.2',
    margin: theme.spacing(1, 0),
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
  addItemBox: {
    padding: theme.spacing(0, 2),
  },
  title: {
    // display: 'flex',
    flexGrow: 1,
  },
  sharedWithText: {
    color: theme.palette.primary.light,
    // margin: theme.spacing(0, 1),
  },
  sharedWithSettings: {
    float: 'right',
    display: 'inline-flex',
    verticalAlign: 'middle',
  },
  editTitleContainer: {},
  editTitle: {},
}));

const DetailedListDisplay = ({ match }) => {
  const history = useHistory();
  const { id } = match.params;
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({ title: '' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const list = useSelector((state) => state.list.list);
  const user = useSelector((state) => state.auth.user);

  const editHandler = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    const getList = async () => {
      await dispatch(fetchList(id));
    };
    getList();
    setLoading(false);
  }, [dispatch, id]);

  const { title } = formData;

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(updateList(id, { title }, history));
    setFormData({ title: '' });
    setEdit(!edit);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDeleteList = (id) => {
    dispatch(deleteList(id, history));
  };

  return loading || !list ? (
    <Spinner />
  ) : (
    <PageContainer>
      <Card className={classes.root}>
        <CardContent>
          <div className={classes.actionIcons}>
            <Tooltip aria-label="edit list title" title="edit">
              <EditOutlined
                aria-label="edit list title"
                className={classes.icon}
                onClick={() => editHandler()}
              ></EditOutlined>
            </Tooltip>
            {list.creator && (
              <Tooltip aria-label="delete" title="delete">
                <DeleteOutlined
                  className={classes.icon}
                  color={user._id === list.creator ? 'inherit' : 'disabled'}
                  onClick={
                    user._id === list.creator ? () => setDialogOpen(true) : null
                  }
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
          <div style={{ display: 'inline' }} className={classes.title}>
            <Typography display="inline" variant="h6">
              {edit ? (
                <form onSubmit={(e) => onSubmitHandler(e)}>
                  <Input
                    required
                    id="title"
                    placeholder="List name"
                    name="title"
                    value={title}
                    autoFocus
                    onChange={(e) => onChangeHandler(e)}
                  />
                  <IconButton type="submit" size="small">
                    <Done />
                  </IconButton>
                </form>
              ) : (
                list.title
              )}
            </Typography>

            <Divider variant="middle" className={classes.divider} />

            <div className={classes.sharedWithContainer}>
              <Typography display="inline" variant="caption">
                Shared with: {''}
              </Typography>
              {list.listUsers
                .filter((u) => u.userId !== user._id)
                .map((user) => (
                  <Typography
                    key={user._id}
                    className={classes.sharedWithText}
                    variant="caption"
                  >
                    {user.name}
                  </Typography>
                ))}

              {/* @TODO - Only show if user = creator */}
              <Typography
                className={classes.sharedWithSettings}
                variant="caption"
              >
                <Icon>
                  <Settings />
                </Icon>
              </Typography>
            </div>
          </div>
          <div className={classes.addItemBox}>
            <AddItem id={id} />
          </div>
        </CardContent>
        <div className={classes.actionContent}>
          <ListItems
            userName={user.profile.name}
            listId={list._id}
            listItems={list.listItems}
          />
        </div>
      </Card>
    </PageContainer>
  );
};

export default DetailedListDisplay;
