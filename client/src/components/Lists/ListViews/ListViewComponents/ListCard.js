import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CustomDivider from '../../../Layout/CustomDivider';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(1),
    border: '1px solid rgba(255,105,180,0.2)',
    boxShadow: '3px 3px 10px rgba(255,105,180,0.2)',
  },
  activeBackground: { backgroundColor: theme.palette.background.paper },
  completedBackground: { background: 'rgba(157,157,157,0.5)' },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
  eg: {
    backgroundColor: 'pink',
  },
  eg2: {
    margin: theme.spacing(8),
  },
  cardAction: {
    padding: theme.spacing(0, 1),
  },
  sharedWithContainer: {
    margin: theme.spacing(1, 0),
  },
}));

const ListCard = ({
  isOverview,
  id,
  bottomOfListActionButtons,
  bottomOfListInfo,
  completedList,
  listTitle,
  listItems,
  middleOfListCardContent,
  topOfListActionButtons,
  topOfListSharedWith,
}) => {
  const classes = useStyles();

  const ConditionalWrapper = ({ condition, wrapper, children }) =>
    condition ? wrapper(children) : children;

  return (
    <Card
      //Shows different background if list is(not) completed
      className={`${classes.root} ${
        completedList ? classes.completedBackground : classes.activeBackground
      }`}>
      {/* Allows Link to be rendered if ListOverview card, and not if DetailedListView. https://blog.hackages.io/conditionally-wrap-an-element-in-react-a8b9a47fab2 */}
      <ConditionalWrapper
        condition={isOverview}
        wrapper={(children) => (
          <Link className={classes.link} to={`/lists/${id}`}>
            {children}
          </Link>
        )}>
        <>
          <CardContent>
            <>{topOfListActionButtons || null}</>
            <>{listTitle}</>
            <CustomDivider />
            <div className={classes.sharedWithContainer}>
              {topOfListSharedWith || null}
            </div>
            {middleOfListCardContent}
          </CardContent>
        </>
        {bottomOfListInfo &&
          bottomOfListInfo.map((data, index) => (
            <CardActions key={index} className={classes.cardAction}>
              {data}
            </CardActions>
          ))}
      </ConditionalWrapper>
      {bottomOfListActionButtons || null}
      <>{listItems}</>
    </Card>
  );
};

ListCard.propTypes = {
  isOverview: PropTypes.bool,
  id: PropTypes.string,
  bottomOfListActionButtons: PropTypes.object,
  bottomOfListInfo: PropTypes.array,
  completedList: PropTypes.bool.isRequired,
  listTitle: PropTypes.object.isRequired,
  listItems: PropTypes.node,
  middleOfListCardContent: PropTypes.node,
  topOfListActionButtons: PropTypes.node,
  topOfListSharedWith: PropTypes.node,
};

export default ListCard;
