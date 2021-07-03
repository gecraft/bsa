import React, { useState } from 'react';

import { Card, useContent } from 'translation-helps-rcl';

import { AppContext } from '../../App.context';
import VerseMenu from './VerseMenu';
import ChapterContent from './ChapterContent';

import { server } from '../../config';

const initialPosition = {
  mouseX: null,
  mouseY: null,
};

export default function Chapter({ title, classes, onClose, type, reference }) {
  const [position, setPosition] = React.useState(initialPosition);
  const {
    state: { resourcesApp, referenceSelected },
  } = React.useContext(AppContext);

  const [chapter, setChapter] = useState();

  //  let project = useMemo(() => {}, []);

  let resource = false;
  resourcesApp.forEach((el) => {
    if (el.name === type) {
      resource = el;
    }
  });

  const content = useContent({
    chapter: referenceSelected.chapter,
    projectId: referenceSelected.bookId,
    branch: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: type.split('_')[1] ?? 'rob',
    owner: resource.owner ?? 'door43-catalog',
    server,
  });

  return (
    <Card
      closeable
      onClose={() => onClose(type)}
      title={title}
      type={type}
      classes={classes}
    >
      <VerseMenu
        position={position}
        setPosition={setPosition}
        initialPosition={initialPosition}
      />
      <ChapterContent
        reference={reference}
        chapter={chapter}
        setPosition={setPosition}
        content={content}
        setChapter={setChapter}
        type={type}
      />
    </Card>
  );
}
