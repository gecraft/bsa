import React, { useContext, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

import { AppContext } from '../../App.context';
import { langs, subjects } from './config';

import { MenuItem, Menu } from '@material-ui/core';
import { defaultCard } from '../../config';

import { getUniqueResources } from '../../helper';

import { useStyles } from './style';

function SearchResources({ anchorEl, onClose, open }) {
  const {
    state: { appConfig, resourcesApp },
    actions: { setAppConfig, setResourcesApp },
  } = useContext(AppContext);

  const { t } = useTranslation();
  const classes = useStyles();

  const [currentLang] = useState(langs[0]);

  const uniqueResources = getUniqueResources(appConfig, resourcesApp);

  const handleAddMaterial = (item) => {
    setAppConfig((prev) => prev.concat({ ...defaultCard, i: item.name }));
    onClose();
  };
  /*'https://git.door43.org/api/catalog/v5/search?owner=Door43-Catalog&sort=title&limit=50&page=' + currentPage*/
  useEffect(() => {
    axios
      .create({
        adapter: setupCache({
          maxAge: 60 * 60 * 1000,
        }).adapter,
      })
      .get('https://git.door43.org/api/v1/repos/search?owner=Door43-catalog')
      .then((res) => {
        const result = res.data.data.map((el) => {
          return {
            id: el.id,
            languageId: el.language,
            name: el.name,
            subject: el.subject,
            title: el.title,
            branch: el.default_branch,
            owner: el.owner.username.toString().toLowerCase(),
            link: el.full_name + '/' + el.default_branch,
          };
        });
        setResourcesApp(
          result.filter(
            (el) =>
              el.languageId !== '' &&
              langs.includes(el.languageId) &&
              el.subject !== '' &&
              subjects.includes(el.subject)
          )
        );
      })
      .catch((err) => console.log(err));
    return () => {};
  }, [currentLang, setResourcesApp]);

  const menuItems = uniqueResources.map((el) => (
    <MenuItem key={el.id} classes={classes} onClick={() => handleAddMaterial(el)}>
      {t(el.languageId)} - {el.title}
    </MenuItem>
  ));

  return (
    <Menu
      color="transparent"
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={onClose}
    >
      {menuItems}
    </Menu>
  );
}

export default SearchResources;
