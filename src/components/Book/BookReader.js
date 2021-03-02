import React, { useContext, useState, useEffect } from 'react';
import { Chapter, ResourcesContext } from 'scripture-resources-rcl';
import { AuthenticationContext, useFile } from 'gitea-react-toolkit';

import { BookContainer } from './styled';

function BookReader(props) {
  const { project, onBook } = props;
  const [parsedBook, setParsedBook] = useState(null);
  const [chapter, setChapter] = useState(1);
  const [fault, setFault] = useState('');

  const { state: authentication, actions: authenticationActions, component: authenticationComponent } = useContext(
    AuthenticationContext
  );
  
  const { state: resourcesState } = React.useContext(ResourcesContext);
  // const {
  //   state: resourceFile
  // } = useFile({
  //   config: (authentication && authentication.config),
  //   authentication,
  //   repository: { owner: { username: 'unfoldingWord' }, name: 'en_ta' },
  //   filepath: 'manifest.yaml',
  //   defaultContent: '',
  // });
  console.log("resourcesState");
  console.log(resourcesState && resourcesState.resources && resourcesState.resources[0]);

  useEffect(() => {
    const parseBook = project ? project.parseUsfm() : null;
    const successCallback = (result) => {
      if (Object.keys(result.chapters).length > 0) {
        setParsedBook(result);
      } else {
        setFault('Book not found or not translated');
      }
    };
    const errorCallback = (error) => console.log(error);
    parseBook.then(successCallback, errorCallback);
  }, [project]);

  return (
    <>
    <BookContainer>
      <button
        onClick={() => {
          onBook(null);
        }}
      >
        Back
      </button>
      <h1>{fault}</h1>

      {project ? <h1>{project.title}</h1> : ''}
      {parsedBook && parsedBook.chapters
        ? Object.keys(parsedBook.chapters).map((key) => (
            <button key={key} onClick={() => setChapter(key)}>
              Chapter {key}
            </button>
          ))
        : ''}
      {chapter && parsedBook && parsedBook.chapters ? (
        <Chapter
          disableWordPopover={true}
          chapter={parsedBook.chapters[chapter]}
          chapterKey={chapter.toString()}
        />
      ) : (
        ''
      )}
    </BookContainer>
    
    <hr/>
    Permissions?
    <br/>
    
    </>
  );
}

export default BookReader;
