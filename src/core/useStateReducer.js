import { useCallback, useReducer } from 'react';

import { stateReducer } from './state.reducer';
import defaults from './state.defaults';

export const useStateReducer = ({
  resourceLinks,
  absoluteLayout,
}) => {
  // const _defaults = {
  //   ...defaults,
  //   resourceLinks,
  //   absoluteLayout,
  // };
  const [state, dispatch] = useReducer(stateReducer, defaults);

  const setResourceLinks = useCallback(
    (value) => {
      if (value !== state.resourceLinks) {
        dispatch({ type: 'set_resource_links', value });
      }
    },
    [state.resourceLinks]
  );
  
  const addResourceLink = useCallback(
    (value) => {
      // Add element:
      // TODO ??? : do not add duplicates.
      const _newResourceLinks = [...state.resourceLinks, value];

      // { w: 4, h: 5, x: 0, y: 0, i: absoluteLayout + 1 }
      const _newAbsoluteLayout = [...absoluteLayout, { w: 4, h: 5, x: 0, y: 0, i: absoluteLayout + 1 }];

      // TODO: only dispatch() if you actually added an element.
      dispatch({ type: 'set_resource_links', _newResourceLinks });
      dispatch({ type: 'set_absolute_layout', _newAbsoluteLayout });
    },
    [state.resourceLinks]
  );
  
  const removeResourceLink = useCallback(
    (value) => {
      // TODO? do we pass in INDEX?  or LINK STRING?

      // TODO: find element & remove from array (split).
      // see scripture-resources-rcl: src/components/resources/resourcesHelper.js

      // TODO: 
      // dispatch({ type: 'set_resource_links', _newResourceLinks });
      // dispatch({ type: 'set_absolute_layout', _newAbsoluteLayout });
    },
    [state.resourceLinks]
  );
  
  const setAbsoluteLayout = useCallback(
    (value) => {
      if (value !== state.absoluteLayout) {
        dispatch({ type: 'set_absolute_layout', value });
      }
    },
    [state.absoluteLayout]
  );

  const actions = {
    setResourceLinks,
    addResourceLink,
    removeResourceLink,
    setAbsoluteLayout,
  };
  return [state, actions];
};
