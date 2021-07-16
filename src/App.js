import React, { useContext } from 'react';

import { Workspace } from 'resource-workspace-rcl';

import { AppContext } from './App.context';
import { SubMenuBar, Card, TypoReport } from './components';
import Shortcut from './KeyboardShortcut';
import './styles/app.css';
import useStyles from './style';

export default function App() {
  const { state, actions } = useContext(AppContext);
  const { appConfig, referenceSelected } = state;
  const { setAppConfig } = actions;
  const classes = useStyles();
  const layout = {
    absolute: appConfig,
  };
  Shortcut();
  const onLayoutChange = (newLayout) => {
    localStorage.setItem('appConfig', JSON.stringify(newLayout));
    setAppConfig(newLayout);
  };

  const onClose = (index) => {
    setAppConfig((prev) => prev.filter((el) => el.i !== index));
  };
  const cards = appConfig.map((item) => (
    <Card
      classes={classes}
      key={item.i}
      onClose={() => onClose(item.i)}
      reference={referenceSelected}
      type={item.i}
    />
  ));

  return (
    <>
      <SubMenuBar />
      <TypoReport />
      <Workspace
        gridMargin={[15, 15]}
        rowHeight={30}
        totalGridUnits={12}
        classes={classes}
        layout={layout}
        onLayoutChange={onLayoutChange}
      >
        {cards}
      </Workspace>
    </>
  );
}
