import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';

import { AppContext } from '../../App.context';
import { getBookChapters, getBookNames } from '@texttree/tt-reference-rcl';

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

  const referenceBlock = getBookChapters(referenceSelected.bookId);
  const chapters = Object.keys(referenceBlock);

  let verses = [];
  for (let i = 1; i <= referenceBlock[referenceSelected.chapter]; i++) {
    verses.push(String(i));
  }
  console.log(verses);
  const { t } = useTranslation();
  const BOOKS = getBookNames(['ot', 'nt', 'obs']);

  let translatedBooks = {};
  let translatedTitleBooks = [];
  for (let book in BOOKS) {
    translatedBooks[book] = t(book);
    translatedTitleBooks.push(t(book));
  }
  const getBookIdByName = (books, name) => {
    return Object.keys(books).find((bookId) => books[bookId] === name);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (translatedTitleBooks.includes(e.target.value)) {
        setReferenceSelected({
          bookId: getBookIdByName(translatedBooks, e.target.value),
          chapter: '1',
          verse: '1',
        });
      }
    }
  };
  const input = (
    <>
          <TextField
            id={'book'}
            style={{ width: 300, backgroundColor: 'white' }}
            variant="outlined"
            fullWidth
            onKeyDown={onKeyDown}
            
          />

      {/* <Autocomplete
        id="books"
        options={translatedTitleBooks}
        getOptionLabel={(option) => option}
        style={{ width: 300, backgroundColor: 'white' }}
        renderInput={(params) => (
          <TextField
            id={'book'}
            {...params}
            variant="outlined"
            fullWidth
            onKeyDown={onKeyDown}
          />
        )}
      /> */}
      {/* <Autocomplete
        id="chapters"
        options={chapters}
        getOptionLabel={(option) => option}
        style={{ width: 70 }}
        renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
      />
      <Autocomplete
        id="verse"
        options={verses}
        getOptionLabel={(option) => option}
        style={{ width: 70 }}
        renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
      />*/}
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
