import React from 'react';
import { bibleList } from '../../config/base';
import { useTranslation } from 'react-i18next';
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
  const chapters =[1,2,3]
  const verses =[1,2,3]
  const { t } = useTranslation();
  const input = (
    <>
      <input name="book" list="books" />
      <datalist id="books">
        {bibleList.map((el) => (
          
          <option key = {el.sort} value={t(el.identifier)}></option>
        ))}
      </datalist>
      <input name="chapter" list="chapters" />
      <datalist id="chapters">
        {chapters.map((el) => (
          
          <option key = {el.id} value={el}></option>
        ))}
      </datalist>
      <input name="verse" list="verses" />
      <datalist id="verses">
        {verses.map((el) => (
          
          <option key = {el.id} value={el}></option>
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
