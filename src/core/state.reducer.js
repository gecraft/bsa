import deepFreeze from 'deep-freeze';

export const stateReducer = (state, action) => {
  let _state = { ...state };
  const { type, value } = action;

  switch (type) {
    case 'set_resource_links':
      _state['resourceLinks'] = value;
      break;
    case 'set_absolute_layout':
      _state['absoluteLayout'] = value;
      break;
    
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
  return deepFreeze(_state);
};
