import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

// import { AppContext } from '../../App.context';

import {
  
  Button,
  Dialog,
  DialogTitle,
  //   DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from '@material-ui/core';

function QuickSelect() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleOpen = () => {
    console.log(open);
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>QuickSelect</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>sometext</DialogTitle>
        <DialogContent>
          <DialogContentText>sometext0</DialogContentText>
          
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label={t('Your_comment')}
            type="text"
            //   value={valueComment}
            //   onChange={handleChange}
            fullWidth
          />
          <DialogContentText>{/* {errorMessage} */}</DialogContentText>
        </DialogContent>
        {/* <DialogActions className={classes.actions}>
        <Button
          onClick={handleCancel}
          variant="contained"
          color="primary"
          className={classes.cancel}
        >
          {t('Cancel')}
        </Button>
        <Button
          disabled={valueComment === '' || referenceBlock?.text === ''}
          onClick={handleSend}
          variant="contained"
          color="secondary"
          className={classes.send}
        >
          {t('Send_message')}
        </Button>
      </DialogActions> */}
      </Dialog>
    </>
  );
}

export default QuickSelect;
