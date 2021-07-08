import React, { useState, useContext } from 'react';

import { FontSizeSlider } from 'translation-helps-rcl';
import { useTranslation } from 'react-i18next';

import { AppContext } from '../../App.context';
import {
  BookSelect,
  WorkspaceManager,
  SearchResources,
  ChapterSelect,
  SelectLanguage,QuickSelect
} from '../../components';

import {
  AppBar,
  Toolbar,
  MenuItem,
  Menu,
  IconButton,
  FormHelperText,
  FormControl,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import useStyles from './style';

function SubMenuBar() {
  const {
    state: { fontSize },
    actions: { setFontSize },
  } = useContext(AppContext);

  const classes = useStyles();

  const [anchorAddMaterial, setAnchorAddMaterial] = useState(null);
  const [anchorMainMenu, setAnchorMainMenu] = useState(null);

  const { t } = useTranslation();

  const handleClickAddMaterial = (event) => {
    setAnchorAddMaterial(event.currentTarget);
    handleCloseMainMenu();
  };
  const handleClickMainMenu = (event) => {
    setAnchorMainMenu(event.currentTarget);
  };

  const handleCloseMainMenu = () => {
    setAnchorMainMenu(null);
  };
  const handleCloseAddMaterial = () => {
    setAnchorAddMaterial(null);
  };

  return (
    <>
      <AppBar position="relative">
        <Toolbar className={classes.grow}>
          <Typography variant="h6" color="inherit">
            Bible App
          </Typography>
          <div className={classes.centerButtons}>
            <BookSelect />
            <ChapterSelect />
            <QuickSelect />
          </div>

          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleClickMainMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            color="transparent"
            anchorEl={anchorMainMenu}
            keepMounted
            open={Boolean(anchorMainMenu)}
            onClose={handleCloseMainMenu}
          >
            <MenuItem button={false} divider={true}>
              <SelectLanguage />
            </MenuItem>
            <MenuItem onClick={handleClickAddMaterial}>
              <AddIcon size={'small'} /> {t('Add_material')}
            </MenuItem>
            <MenuItem button={false} divider={true}>
              <FontSizeSlider
                onChange={setFontSize}
                marks={false}
                max={150}
                min={50}
                step={10}
                value={fontSize}
              />
            </MenuItem>
            <MenuItem button={false} className={classes.menu} divider={true}>
              <FormControl>
                <FormHelperText>
                  {t('Text_under_checkbox_error1')}
                  <br />
                  {t('Text_under_checkbox_error2')}
                </FormHelperText>
              </FormControl>
            </MenuItem>
            <WorkspaceManager />
          </Menu>
          <SearchResources
            anchorEl={anchorAddMaterial}
            onClose={handleCloseAddMaterial}
            open={Boolean(anchorAddMaterial)}
          />
        </Toolbar>
      </AppBar>
    </>
  );
}

export default SubMenuBar;
