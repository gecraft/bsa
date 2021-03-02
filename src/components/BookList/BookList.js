import React from 'react';

import { ResourcesContext } from 'scripture-resources-rcl';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { bibleList } from '../config';

import { Projects, useStyles } from './styled';


function BookList({ onBook }) {
  const { state } = React.useContext(ResourcesContext);
  const classes = useStyles();  
  let issetCheck = false;
  const resourseList = bibleList;

  const [checkState, setCheckState] = React.useState({
    checkedA: false,
  });

  const handleChange = (event) => {
    setCheckState({ ...checkState, [event.target.name]: event.target.checked });
  };

  const stateResourseId =
    state && state.resources && state.resources[0] && state.resources[0].projects? state.resources[0].projects.map((project) =>
     project.identifier)    : [];
  const stateResourse =
     state && state.resources && state.resources[0] && state.resources[0].projects? state.resources[0].projects.map((project) =>
      project)    : [];


  resourseList.forEach(function (item) {
    stateResourseId.includes(item.identifier) ? (item.isset = true) : (issetCheck = true);
  });

   function linkBook(item){
     for (let i=0;i<stateResourse.length; ++i){
       if (item === stateResourse[i].identifier) {
         return stateResourse[i];
       }
     }
   }

  function renderBookList(mainResourse, categories) {
    return mainResourse
      .filter((mainResourse) =>
        checkState.checkedA
          ? mainResourse.categories === categories && mainResourse.isset === true
          : mainResourse.categories === categories
      )
      .map((mainResourse) => (
        <p key={mainResourse.sort}>
          {mainResourse.isset ? (
            <button onClick={() => onBook(linkBook(mainResourse.identifier), state.resources[0])}>
              {mainResourse.title}
            </button>
          ) : (
            <span className={classes.falseElement} >{mainResourse.title}</span>
          )}
        </p>
      ));
  }

  const otBookList = renderBookList(resourseList, 'bible-ot');
  const ntBookList = renderBookList(resourseList, 'bible-nt');

  const hideCheckRender =
    issetCheck === true ? (
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checkedA}
            onChange={handleChange}
            name="checkedA"
            color="primary"
          />
        }
        label="show only existing books"
      />
    ) : (
      []
    );

  return (
    <Projects>
      {hideCheckRender}
      <h2>New Testament</h2>
      <div>{ntBookList}</div>
      <h2>Old Testament</h2>
      <div>{otBookList}</div>
    </Projects>
  );
}

export default BookList;
