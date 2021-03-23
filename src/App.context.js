import React, { useState } from 'react';

// import { loadState } from './core/persistence';

import { useStateReducer } from './core/useStateReducer';

export const AppContext = React.createContext();

export function AppContextProvider({
  resourceLinks: __resourceLinks,
  absoluteLayout: __absoluteLayout,
  children,
}) {
  const [state, actions] = useStateReducer({
    resourceLinks: __resourceLinks,
    absoluteLayout: __absoluteLayout,
  });

  const [resources, setResources] = useState();

  const {
    resourceLinks, absoluteLayout
  } = state;

  const addResourceLink = (_resourceLink) => {
    actions.addResourceLink(_resourceLink);
  };

  const removeResourceLink = (_resourceLink) => {
    // TODO: remove element matching this value.
  };

  const value = {
    state: { resourceLinks, absoluteLayout, resources },
    actions: {...actions, setResources},
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
