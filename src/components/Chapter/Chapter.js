import React, { useState, /*useMemo,*/ useEffect } from 'react';

import { Card } from 'translation-helps-rcl';
import { Verse, ResourcesContext } from 'scripture-resources-rcl';
import { useTranslation } from 'react-i18next';

import { AppContext } from '../../App.context';
import { getVerseText } from '../../helper';

import { Menu, MenuItem } from '@material-ui/core';

const initialPosition = {
  mouseX: null,
  mouseY: null,
};

export default function Chapter({ title, classes, onClose, type, reference }) {
  const { t } = useTranslation();

  const [position, setPosition] = React.useState(initialPosition);
  const { state } = React.useContext(ResourcesContext);
  const {
    state: { resourcesApp, fontSize },
    actions: { setShowErrorReport, setReferenceBlock, setReferenceSelected },
  } = React.useContext(AppContext);

  const [chapter, setChapter] = useState();
  const [verses, setVerses] = useState();
  const [project, setProject] = useState({});
  const [resource, setResource] = useState(false);

  //  let project = useMemo(() => {}, []);

  const handleContextOpen = (event) => {
    event.preventDefault();
    setPosition({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleContextClose = () => {
    setPosition(initialPosition);
  };

  const handleOpenError = () => {
    setShowErrorReport(true);
    setPosition(initialPosition);
  };

  useEffect(() => {
    resourcesApp.forEach((el) => {
      if (el.name === type) {
        setResource(el);
      }
    });
  }, [resourcesApp, type]);

  const resources = state?.resources;
  useEffect(() => {
    if (resources) {
      resources.forEach((el) => {
        if (
          el.repository === resource.name &&
          el.username.toString().toLowerCase() === resource.owner.toString().toLowerCase()
        ) {
          setProject(el.project);
        }
      });
    }
  }, [resources, resource]);

  useEffect(() => {
    if (project && Object.keys(project).length !== 0) {
      project
        .parseUsfm()
        .then((result) => {
          if (Object.keys(result.json.chapters).length > 0) {
            setChapter(result.json.chapters[reference.chapter]);
          }
        })
        .catch((error) => console.log(error));
    } else {
      setChapter(null);
    }
  }, [project, reference.chapter]);

  useEffect(() => {
    let _verses = [];
    for (let key in chapter) {
      if (parseInt(key).toString() !== key.toString()) {
        continue;
      }
      const { verseObjects } = chapter[key];
      const verseStyle = {
        fontSize: fontSize + '%',
        cursor: 'context-menu',
      };
      const verse = (
        <span
          style={verseStyle}
          className="verse"
          key={key}
          onContextMenu={(e) => {
            setReferenceBlock({
              ...reference,
              resource: type,
              verse: key,
              text: getVerseText(verseObjects),
            });
            handleContextOpen(e);
          }}
          onClick={() => setReferenceSelected({ ...reference, verse: key })}
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
  }, [chapter, reference, type, setReferenceBlock, setReferenceSelected, fontSize]);
  const anchorPosition =
    position.mouseY !== null && position.mouseX !== null
      ? { top: position.mouseY, left: position.mouseX }
      : undefined;

  return (
    <Card
      closeable
      onClose={() => onClose(type)}
      title={title}
      type={type}
      classes={classes}
    >
      <Menu
        keepMounted
        open={position.mouseY !== null}
        onClose={handleContextClose}
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition}
      >
        <MenuItem onClick={handleOpenError}>{t('Error_report')}</MenuItem>
      </Menu>
      {chapter ? verses : t('No_content')}
    </Card>
  );
}
