import React, { useState, useEffect } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { ResourcesContextProvider } from 'scripture-resources-rcl';

import { getResources } from './helper';
import { server, defaultTplBible, defaultBibleReference } from './config/base';

export const AppContext = React.createContext();

const _appConfig = localStorage.getItem('appConfig')
  ? JSON.parse(localStorage.getItem('appConfig'))
  : defaultTplBible;

let _reference = localStorage.getItem('reference')
  ? JSON.parse(localStorage.getItem('reference'))
  : defaultBibleReference;

let _resourcesApp = localStorage.getItem('resourcesApp')
  ? JSON.parse(localStorage.getItem('resourcesApp'))
  : [];

let _fontSize = parseInt(localStorage.getItem('fontSize'));

const config = { server };

export function AppContextProvider({ children }) {
  let history = useHistory();
  let location = useLocation();
  const currentLocation = location.pathname.split('/');
  const locationReference = {
    bookId: currentLocation[1] ? currentLocation[1] : _reference.bookId,
    chapter: currentLocation[2] ?? _reference.chapter,
    verse: currentLocation[3] ?? _reference.verse ?? 1,
  };

  const [appConfig, setAppConfig] = useState(_appConfig);
  const [referenceSelected, setReferenceSelected] = useState({
    bookId: currentLocation[1] ? currentLocation[1] : _reference.bookId,
    chapter: currentLocation[2] ?? _reference.chapter,
    verse: currentLocation[3] ?? _reference.verse ?? 1,
  });

  const [resourcesApp, setResourcesApp] = useState(_resourcesApp);

  const [referenceBlock, setReferenceBlock] = useState({});
  const _resourceLinks = getResources(appConfig, resourcesApp);
  const [resourceLinks, setResourceLinks] = useState(_resourceLinks);
  const [resources, setResources] = useState([]);
  const [showBookSelect, setShowBookSelect] = useState(true);
  const [showChapterSelect, setShowChapterSelect] = useState(false);
  const [showErrorReport, setShowErrorReport] = useState(false);
  const [fontSize, setFontSize] = useState(_fontSize ? _fontSize : 100);
  localStorage.setItem('fontSize', fontSize);

  useEffect(() => {
    setResourceLinks(getResources(appConfig, resourcesApp));
  }, [appConfig, resourcesApp]);

  useEffect(() => {
    localStorage.setItem('resourcesApp', JSON.stringify(resourcesApp));
  }, [resourcesApp]);

  React.useEffect(() => {
    if (locationReference?.bookId) {
      setReferenceSelected({
        bookId: locationReference.bookId,
        chapter: locationReference.chapter,
        verse: locationReference.verse,
      });
    }
  }, [
    locationReference.bookId,
    locationReference.chapter,
    locationReference.verse,
    setReferenceSelected,
  ]);

  useEffect(() => {
    localStorage.setItem(
      'reference',
      JSON.stringify({
        bookId: referenceSelected.bookId,
        chapter: referenceSelected.chapter,
        verse: referenceSelected.verse,
      })
    );

    if (
      history.location.pathname !==
      '/' +
        referenceSelected.bookId +
        '/' +
        referenceSelected.chapter +
        '/' +
        referenceSelected.verse
    ) {
      history.push(
        '/' +
          referenceSelected.bookId +
          '/' +
          referenceSelected.chapter +
          '/' +
          referenceSelected.verse
      );
    }
  }, [
    referenceSelected.bookId,
    referenceSelected.chapter,
    referenceSelected.verse,
    history,
  ]);

  const value = {
    state: {
      appConfig,
      referenceSelected,
      resourceLinks,
      resourcesApp,
      resources,
      _resourceLinks,
      showBookSelect,
      showChapterSelect,
      showErrorReport,
      referenceBlock,
      fontSize,
    },
    actions: {
      setAppConfig,
      setReferenceSelected,
      setResourceLinks,
      setResourcesApp,
      setResources,
      setShowBookSelect,
      setShowChapterSelect,
      setShowErrorReport,
      setReferenceBlock,
      setFontSize,
    },
  };

  return (
    <AppContext.Provider value={value}>
      <ResourcesContextProvider
        reference={{
          bookId: referenceSelected.bookId,
          chapter: referenceSelected.chapter,
        }}
        resourceLinks={resourceLinks}
        defaultResourceLinks={_resourceLinks}
        onResourceLinks={setResourceLinks}
        resources={resources}
        onResources={setResources}
        config={config}
      >
        {children}
      </ResourcesContextProvider>
    </AppContext.Provider>
  );
}
