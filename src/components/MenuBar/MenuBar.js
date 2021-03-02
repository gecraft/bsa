import React from 'react';
import { AppBar, Toolbar, Typography, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { UserMenu } from 'gitea-react-toolkit';

import SelectLanguage from './SelectLanguage/SelectLanguage';
import useStyles from './style';

const MenuItems = [
  { title: 'Bible' },
  { title: 'OBS' },
  { title: 'Bible in your language' },
];

export default function MenuBar() {
  const classes = useStyles();
  const Menu = MenuItems.map((MenuItems, index) => (
    <Typography className={classes.menuItem} variant="h6" noWrap key={index}>
      {MenuItems.title}
    </Typography>
  ));

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            ROB Resources
          </Typography>
          <div className={classes.menu}>{Menu}</div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder=""
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <SelectLanguage />

          <UserMenu/>
        </Toolbar>
      </AppBar>
    </div>
  );
}
