import React from 'react';
import { bibleList } from '../../config/base';

// import { AppContext } from '../../App.context';

import {
  // Button,
  // Dialog,
  // DialogTitle,
  // Input,
  //   DialogActions,
  // DialogContent,
  // DialogContentText,
} from '@material-ui/core';

function QuickSelect() {
  // const [open, setOpen] = useState(false);

  // const handleOpen = () => {
  //   console.log(open);
  //   setOpen(!open);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };
  const input = (
    <>
      <input name="city" list="cities" />
      <datalist id="cities">
        {bibleList.map((el) => (
          
          <option key = {el.sort} value={el.identifier}></option>
        ))}
      </datalist>
    </>
  );

  return (
    <>
      {/* <Button onClick={handleOpen}>QuickSelect</Button> */}
      {/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle>sometext</DialogTitle>
        <DialogContent>
          <DialogContentText>sometext0</DialogContentText> */}

          {input}
          {/* <DialogContentText>{/* {errorMessage}</DialogContentText> 
        // </DialogContent> */}
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
      </DialogActions>
      // </Dialog> */}
    </>
  );
}

export default QuickSelect;
