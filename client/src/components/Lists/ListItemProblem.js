import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { listItemProblem } from '../../store/actions/listActions';

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
    console.log('inside submit');
    console.log(listId, itemId, userName, reason, optionalNote);
    dispatch(listItemProblem(listId, itemId, userName, reason, optionalNote));
    handleDialogClose();
  };

  console.log(listProblemReason);
  return (
    <div>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Why couldn't you get the item?`}</DialogTitle>
        <DialogContent>
          <>
            <form
              onSubmit={(e) =>
                itemProblemSubmitHandler(e, listId, itemId, userName)
              }
            >
              {reasonButtons.map((btn) => (
                <Button
                  className={classes.button}
                  fullWidth
                  variant="outlined"
                  color="primary"
                  key={btn.text}
                  type="submit"
                  onClick={() => setListProblemReason({ reason: btn.text })}
                >
                  {btn.text}
                </Button>
              ))}
              <Divider />
              <Button
                fullWidth
                variant="text"
                color="primary"
                onClick={() => setOtherTextField(!otherTextField)}
              >
                Other
              </Button>
              {otherTextField ? (
                <div>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="reason"
                    label="Reason"
                    name="optionalNote"
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
                    variant="text"
                    color="primary"
                    type="submit"
                    onClick={() =>
                      setListProblemReason({
                        ...listProblemReason,
                        reason: 'Other',
                      })
                    }
                  >
                    Submit
                  </Button>
                </div>
              ) : null}
            </form>
          </>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ListItemProblem;
