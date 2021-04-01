import React from 'react';
import ChapterSelection from '../ChapterSelection';
import BookList from '../BookList/BookList';

import {
  AppBar,
  Button,
  Toolbar,
  Fab,
  Dialog,
  DialogContent,
  MenuItem,
  Menu,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';

import { bibleList } from '../../config';

const useStyles = makeStyles(() => ({
  root: {
    padding: '0 !important',
    margin: '0 1px !important',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  dragIndicator: {},
}));

function SubMenuBar(props) {
  const { setAppConfig, referenceSelected, setReferenceSelected, appConfig } = props;
  const [showBookSelect, setShowBookSelect] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showChapterSelect, setShowChapterSelect] = React.useState(false);
  const onBook = (project) => {
    setShowBookSelect(false);
    setShowChapterSelect(false);
    setReferenceSelected({
      ...referenceSelected,
      bookId: project ? project.identifier : null,
    });
  };

  function handleAddNewBible() {
    setAppConfig((prev) =>
      prev.concat({ w: 4, h: 3, x: 0, y: 99, i: prev.length.toString(), type: 1 })
    );
    handleClose();
  }
  function handleAddNewTN() {
    setAppConfig((prev) =>
      prev.concat({ w: 4, h: 3, x: 0, y: 99, i: prev.length.toString(), type: 3 })
    );
    handleClose();
  }
  function handleAddNewTQ() {
    setAppConfig((prev) =>
      prev.concat({ w: 4, h: 3, x: 0, y: 99, i: prev.length.toString(), type: 4 })
    );
    handleClose();
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Toolbar className={classes.addMenu}>
            <Fab color="primary" aria-label="add" onClick={handleClick}>
              <AddIcon />
            </Fab>
            <Menu
              color="transparent"
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleAddNewBible}>Bible</MenuItem>
              <MenuItem onClick={handleAddNewTN}>TN TSV</MenuItem>
              <MenuItem onClick={handleAddNewTQ}>TQ</MenuItem>
            </Menu>
          </Toolbar>
          <Toolbar style={{ margin: '0 auto' }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setShowBookSelect(!showBookSelect)}
            >
              {
                bibleList.filter(
                  (book) => book.identifier === referenceSelected.bookId
                )[0]?.title
              }{' '}
            </Button>
            <Button
              style={{ marginLeft: '10px' }}
              variant="contained"
              color="secondary"
              onClick={() => setShowChapterSelect(!showChapterSelect)}
            >
              {referenceSelected.chapter} ch.
            </Button>
          </Toolbar>
        </Toolbar>
      </AppBar>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={showBookSelect}
        onClose={() => setShowBookSelect(false)}
      >
        <DialogContent>
          <BookList onBook={onBook} />
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={showChapterSelect}
        onClose={() => setShowChapterSelect(false)}
      >
        <DialogContent>
          <ChapterSelection
            setReferenceSelected={setReferenceSelected}
            referenceSelected={referenceSelected}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SubMenuBar;
