import React, { useContext } from 'react';

import { Card, CardContent, useContent, useCardState } from 'translation-helps-rcl';

import { AppContext } from '../../App.context';
import { resourcesList, server } from '../../config';

export default function OBS(props) {
  const { title, classes, onClose, type } = props;
  const appContext = useContext(AppContext);
  const { referenceSelected, fontSize } = appContext.state;

  const {
    markdown,
    items,
    isLoading,
    props: { languageId },
  } = useContent({
    verse: referenceSelected.verse,
    chapter: referenceSelected.chapter,
    projectId: referenceSelected.bookId,
    branch: resourcesList[type].branch ?? 'master',
    languageId: resourcesList[type].languageId ?? 'ru',
    resourceId: resourcesList[type].resourceId ?? 'obs',
    filePath:
      
      String(referenceSelected.verse).padStart(2, '0') +
      '.md',
    owner: resourcesList[type].owner ?? 'bsa',
    server,
  });
  const {
    state: { item, headers, filters, itemIndex, markdownView },
    actions: { setFilters, setItemIndex, setMarkdownView },
  } = useCardState({
    items,
  });

  return (
    <Card
      closeable
      title={title}
      onClose={() => onClose(type)}
      classes={{ ...classes, children: 'tqcard' }}
      items={items}
      headers={headers}
      filters={filters}
      fontSize={fontSize}
      itemIndex={itemIndex}
      setFilters={setFilters}
      setItemIndex={setItemIndex}
      markdownView={markdownView}
      setMarkdownView={setMarkdownView}
    >
      <CardContent
        item={item}
        filters={filters}
        fontSize={fontSize}
        markdown={markdown}
        isLoading={isLoading}
        languageId={languageId}
        markdownView={markdownView}
      />
    </Card>
  );
}