import React from 'react';

import { Menu, MenuItem } from '@material-ui/core';
import { AppContext } from '../../App.context';
import { useTranslation } from 'react-i18next';

function VerseMenu({ position, setPosition, initialPosition }) {
  const { t } = useTranslation();
  const {
    actions: { setShowErrorReport },
  } = React.useContext(AppContext);

  const handleContextClose = () => {
    setPosition(initialPosition);
  };

  const anchorPosition =
    position.mouseY !== null && position.mouseX !== null
      ? { top: position.mouseY, left: position.mouseX }
      : undefined;

  const handleOpenError = () => {
    setShowErrorReport(true);
    setPosition(initialPosition);
  };

  return (
    <Menu
      keepMounted
      open={position.mouseY !== null}
      onClose={handleContextClose}
      anchorReference="anchorPosition"
      anchorPosition={anchorPosition}
    >
      <MenuItem onClick={handleOpenError}>{t('Error_report')}</MenuItem>
    </Menu>
  );
}

export default VerseMenu;
