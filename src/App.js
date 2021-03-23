import React, { useContext, useState, useEffect } from 'react';

import {
  ResourcesContextProvider,
  ReferenceSelectedContextProvider,
} from 'scripture-resources-rcl';

import { AppContext } from './App.context';
import { Workspace } from 'resource-workspace-rcl';
import Chapter from './components/Chapter/Chapter';
import SupportTQ from './components/SupportTQ/SupportTQ';
import SupportTN from './components/SupportTN/SupportTN';
import BookList from './components/BookList/BookList';
import MenuBar from './components/MenuBar/MenuBar';
import TypoReport from './components/TypoReport';

import {
  Switch,
  FormControlLabel,
  FormGroup,
  AppBar,
  Button,
  Toolbar,
  Fab,
  Dialog,
  DialogContent,
  MenuItem,
  Menu,
} from '@material-ui/core';

import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import './styles/app.css';

import { bibleList } from './config';

const BlueMenu = styled(Menu)`
  .MuiPaper-root {
    background-color: #303f9f;
    color: #ffffff;
  }
`;
const config = { server: 'https://git.door43.org' };

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

export default function App(params) {
  
const { state, actions } = useContext(AppContext);
const { resourceLinks, absoluteLayout, resources } = state;
const { addResourceLink, removeResourceLink, setAbsoluteLayout, setResourceLinks, setResources } = actions;

const [showBookSelect, setShowBookSelect] = React.useState(false);
  const [check, setCheck] = React.useState({
    checkedA: false,
  });
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setCheck({ ...check, [event.target.name]: event.target.checked });
  };
  const [referenceSelected, setReferenceSelected] = useState({
    bookId: 'tit',
    chapter: 1,
  });

  const layout = {
    absolute: absoluteLayout,
  };

  function onLayoutChange(layout) {
    localStorage.setItem('layout', JSON.stringify(layout));
  }

  const classes = useStyles();

  const onBook = (project) => {
    setShowBookSelect(false);
    setReferenceSelected({
      ...referenceSelected,
      bookId: project ? project.identifier : null,
    });
  };
  const onClose = (index) => {
    // TODO: use reducer.
    //setAbsoluteLayout(layout.absolute.filter((el) => el.i !== index));
    removeResourceLink(index);
  };
  function handleAddNew() {
    // setAbsoluteLayout(
    //   absoluteLayout.concat({ w: 4, h: 5, x: 0, y: 0, i: absoluteLayout + 1 })
    // );
    
    // TODO: pick which resource you add:
    actions.addResourceLink('bsa/ru/rlob/master');
    handleClose();
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (referenceSelected?.verse) {
      console.log(
        'Reference: ' + referenceSelected?.chapter + ':' + referenceSelected?.verse
      );
    }
  }, [referenceSelected?.chapter, referenceSelected?.verse]);

  console.log(check);

  if (check.checkedA === false) {
    return (
      <ResourcesContextProvider
        reference={referenceSelected}
        resourceLinks={resourceLinks}
        defaultResourceLinks={resourceLinks}
        onResourceLinks={setResourceLinks}
        resources={resources}
        onResources={setResources}
        config={config}
      >
        <ReferenceSelectedContextProvider
          referenceSelected={referenceSelected}
          onReferenceSelected={setReferenceSelected}
        >
          <MenuBar />
          <AppBar position="relative">
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
                onClick={() => setShowBookSelect(!showBookSelect)}
              >
                {referenceSelected.chapter} ch.
              </Button>
            </Toolbar>
          </AppBar>
          <Dialog
            fullWidth={true}
            maxWidth={true}
            open={showBookSelect}
            onClose={() => setShowBookSelect(false)}
          >
            <DialogContent>
              <BookList onBook={onBook} />
            </DialogContent>
          </Dialog>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={check.checkedA}
                  onChange={handleChange}
                  name="checkedA"
                  color="primary"
                />
              }
              label="With Button +"
            />
          </FormGroup>
          <Workspace
            gridMargin={[15, 15]}
            classes={classes}
            layout={layout}
            onLayoutChange={onLayoutChange}
          >
            <Chapter
              type="0"
              title="RLOB"
              classes={classes}
              onClose={onClose}
              index={'1'}
              reference={referenceSelected}
              onReference={setReferenceSelected}
            />
            <Chapter
              type="1"
              title="RSOB"
              classes={classes}
              onClose={onClose}
              index={'2'}
              reference={referenceSelected}
              onReference={setReferenceSelected}
            />
            <Chapter
              type="2"
              title="ROB"
              classes={classes}
              onClose={onClose}
              index={'3'}
              reference={referenceSelected}
              onReference={setReferenceSelected}
            />
            <SupportTQ title="TQ" classes={classes} onClose={onClose} index={'4'} />
            <SupportTN
              title="TN TSV"
              classes={classes}
              onClose={onClose}
              index={'5'}
            />
          </Workspace>
        </ReferenceSelectedContextProvider>
        <TypoReport />
      </ResourcesContextProvider>
    );
  } else {
    return (
      <ResourcesContextProvider
        reference={referenceSelected}
        resourceLinks={resourceLinks}
        defaultResourceLinks={resourceLinks}
        onResourceLinks={setResourceLinks}
        resources={resources}
        onResources={setResources}
        config={config}
      >
        <ReferenceSelectedContextProvider
          referenceSelected={referenceSelected}
          onReferenceSelected={setReferenceSelected}
        >
          <MenuBar />
          <AppBar position="relative">
            <Toolbar>
              <Toolbar classname={classes.addMenu}>
                <Fab color="primary" aria-label="add" onClick={handleClick}>
                  <AddIcon />
                </Fab>
                <BlueMenu
                  color="transparent"
                  classes={classes.root}
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem classes={classes.root} onClick={handleAddNew}>
                    Bible
                  </MenuItem>
                  <MenuItem onClick={handleClose}>TN TSV</MenuItem>
                  <MenuItem onClick={handleClose}>TQ</MenuItem>
                </BlueMenu>
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
                  onClick={() => setShowBookSelect(!showBookSelect)}
                >
                  {referenceSelected.chapter} ch.
                </Button>
              </Toolbar>
            </Toolbar>
          </AppBar>
          <Dialog
            fullWidth={true}
            maxWidth={true}
            open={showBookSelect}
            onClose={() => setShowBookSelect(false)}
          >
            <DialogContent>
              <BookList onBook={onBook} />
            </DialogContent>
          </Dialog>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={check.checkedA}
                  onChange={handleChange}
                  name="checkedA"
                  color="primary"
                />
              }
              label="With Button +"
            />
          </FormGroup>
          <Workspace
            gridMargin={[15, 15]}
            classes={classes}
            layout={layout}
            onLayoutChange={onLayoutChange}
          >
            {layout.absolute.map((item) => (
              <Chapter
                type="0"
                title="RLOB"
                classes={classes}
                onClose={onClose}
                index={item.i}
                reference={referenceSelected}
                onReference={setReferenceSelected}
              />
            ))}
            {/* <Chapter
            type="0"
            title="RLOB"
            classes={classes}
            onClose={onClose}
            index={'1'}
          /> */}
            {/* <Chapter
            type="1"
            title="RSOB"
            classes={classes}
            onClose={onClose}
            index={'2'}
          />
          <Chapter type="2" title="ROB" classes={classes} onClose={onClose} index={'3'} />
          <SupportQuestion title="TQ" classes={classes} onClose={onClose} index={'4'} />
          <SupportNotes title="TN TSV" classes={classes} onClose={onClose} index={'5'} /> */}
          </Workspace>
        </ReferenceSelectedContextProvider>
        <TypoReport />
      </ResourcesContextProvider>
    );
  }
}
