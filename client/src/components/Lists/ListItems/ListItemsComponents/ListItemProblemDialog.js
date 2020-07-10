import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import DialogBox from '../../../Layout/DialogBox';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { listItemProblem } from '../../../../store/actions/listActions';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

const ListItemProblem = ({
  listId,
  itemId,
  userName,
  dialogOpen,
  handleDialogClose,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [otherTextField, setOtherTextField] = useState(false);
  const [listProblemReason, setListProblemReason] = useState({
    reason: '',
    optionalNote: '',
  });

  const reasonButtons = [
    { text: 'Sold Out' },
    { text: 'Too Expensive' },
    { text: 'Poor Quality' },
  ];

  const itemProblemSubmitHandler = (e, listId, itemId, userName) => {
    e.preventDefault();
    const reason = listProblemReason.reason;
    const optionalNote = listProblemReason.optionalNote || null;

    dispatch(listItemProblem(listId, itemId, userName, reason, optionalNote));
    handleDialogClose();
  };

  return (
    <>
      <DialogBox
        dialogOpen={dialogOpen}
        handleDialogClose={handleDialogClose}
        dialogTitle={`Why couldn't you get the item?`}>
        <form
          onSubmit={(e) =>
            itemProblemSubmitHandler(e, listId, itemId, userName)
          }>
          {reasonButtons.map((btn) => (
            <Button
              disabled={otherTextField ? true : false}
              className={classes.button}
              fullWidth
              variant='outlined'
              color='primary'
              key={btn.text}
              type={otherTextField ? 'button' : 'submit'}
              onClick={() => setListProblemReason({ reason: btn.text })}>
              {btn.text}
            </Button>
          ))}
          <Divider />
          <Button
            fullWidth
            variant='text'
            color='primary'
            onClick={() => setOtherTextField(!otherTextField)}>
            Other
          </Button>
          {otherTextField ? (
            <div>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='reason'
                label='Reason'
                name='optionalNote'
                value={listProblemReason.optionalNote}
                onChange={(e) =>
                  setListProblemReason({
                    ...listProblemReason,
                    [e.target.name]: e.target.value,
                  })
                }
                autoFocus
              />

              <Button
                fullWidth
                variant='text'
                color='primary'
                type='submit'
                onClick={() =>
                  setListProblemReason({
                    ...listProblemReason,
                    reason: 'Other',
                  })
                }>
                Submit
              </Button>
            </div>
          ) : null}
        </form>
      </DialogBox>
    </>
  );
};

ListItemProblem.propTypes = {
  listId: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  dialogOpen: PropTypes.bool.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
};

export default ListItemProblem;
