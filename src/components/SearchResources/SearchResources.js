import React, { useContext, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

import { AppContext } from '../../App.context';
import { langs, subjects, owners, blackListResources } from '../../config/materials';
import { defaultCard } from '../../config/base';
import { getUniqueResources } from '../../helper';

import { MenuItem, Menu } from '@material-ui/core';
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
  useEffect(() => {
    axios
      .create({
        adapter: setupCache({
          maxAge: 15 * 60 * 1000,
        }).adapter,
      })
      .get(
        'https://git.door43.org/api/catalog/v5/search?sort=lang,title&owner=' +
          owners.join(',') +
          '&lang=' +
          langs.join(',') +
          '&subject=' +
          subjects.join(',')
      )
      .then((res) => {
        const result = res.data.data.map((el) => {
          return {
            id: el.id,
            languageId: el.language,
            name: el.name,
            subject: el.subject,
            title: el.title,
            branch: el.default_branch,
            owner: el.owner.toString().toLowerCase(),
            link: el.full_name + '/' + el.default_branch,
          };
        });
        setResourcesApp(result);
      })
      .catch((err) => console.log(err));
    return () => {};
  }, [currentLang, setResourcesApp]);

  const menuItems = uniqueResources
    .filter(
      (el) =>
        !blackListResources.some(
          (value) =>
            JSON.stringify(value) === JSON.stringify({ owner: el.owner, name: el.name })
        )
    )
    .map((el) => (
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
