import React, { useContext } from 'react';
import { bibleList } from '../../config/base';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../App.context';
import { getBookChapters, getAllChapters } from '@texttree/tt-reference-rcl';

import {
  // Button,
  // Dialog,
  // DialogTitle,

  TextField,
  //   DialogActions,
  // DialogContent,
  // DialogContentText,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

function QuickSelect() {
  // const [open, setOpen] = useState(false);
  const { state, actions } = useContext(AppContext);
  const { referenceSelected } = state;
  const { setReferenceSelected } = actions;
  // const handleOpen = () => {
  //   console.log(open);
  //   setOpen(!open);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  const verses = [1, 2, 3];
  const { t } = useTranslation();
  const chapters = Object.keys(getBookChapters(referenceSelected.bookId));
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      console.log(e.target.value);
    }
  };
  const input = (
    <>
      <Autocomplete
        options={bibleList}
        getOptionLabel={(option) => t(option.identifier)}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            id={'book'}
            {...params}
            variant="outlined"
            fullWidth
            onKeyDown={onKeyDown}
          />
        )}
      />
      <Autocomplete
        options={chapters}
        getOptionLabel={(option) => t(option)}
        style={{ width: 70 }}
        renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
      />
      <Autocomplete
        options={verses}
        getOptionLabel={(option) => t(option)}
        style={{ width: 70 }}
        renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
      />
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
