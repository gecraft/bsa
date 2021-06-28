import React, { useEffect, useState } from 'react';
import { Verse } from 'scripture-resources-rcl';
import { getVerseText } from '../../helper';
import { AppContext } from '../../App.context';
import { useTranslation } from 'react-i18next';

function ChapterContent({ chapter, reference, setPosition, content, setChapter, type }) {
  const { t } = useTranslation();
  console.log(content);
  const [verses, setVerses] = useState();
  const {
    actions: { setReferenceBlock, setReferenceSelected },
  } = React.useContext(AppContext);

  useEffect(() => {
    if (
      content?.resource?.project &&
      Object.keys(content.resource.project).length !== 0
    ) {
      content.resource.project
        .parseUsfm()
        .then((result) => {
          console.log({ result: result });
          if (Object.keys(result.json.chapters).length > 0) {
            setChapter(result.json.chapters[reference.chapter]);
          }
        })
        .catch((error) => console.log(error));
    } else {
      setChapter(null);
    }
  }, [content.resource, reference.chapter, setChapter]);
  useEffect(() => {
    const handleContextMenu = (e, key, verseObjects) => {
      setReferenceBlock({
        ...reference,
        type,
        verse: key,
        text: getVerseText(verseObjects),
      });
      e.preventDefault();
      setPosition({
        mouseX: e.clientX - 2,
        mouseY: e.clientY - 4,
      });
    };

    let _verses = [];
    for (let key in chapter) {
      if (parseInt(key).toString() !== key.toString()) {
        continue;
      }
      const { verseObjects } = chapter[key];

      const verse = (
        <span
          className="verse"
          key={key}
          onContextMenu={(e) => handleContextMenu(e, key, verseObjects)}
          onClick={() => setReferenceSelected({ ...reference, verse: key })}
          style={{ cursor: 'context-menu' }}
        >
          <Verse
            verseKey={key}
            verseObjects={verseObjects}
            paragraphs={false}
            showUnsupported={false}
            disableWordPopover={false}
            reference={{ ...reference, verse: key }}
            renderOffscreen={false}
          />
        </span>
      );

      _verses.push(verse);
    }
    setVerses(_verses);
  }, [chapter, reference, type, setReferenceBlock, setReferenceSelected, setPosition]);

  return <>{chapter ? verses : t('No_content')}</>;
}

export default ChapterContent;
