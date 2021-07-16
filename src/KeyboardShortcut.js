import { useContext } from 'react';

import { ResourcesContext } from 'scripture-resources-rcl';

import { getBookChapters } from '@texttree/tt-reference-rcl';
import { AppContext } from './App.context';

export default function Shortcut() {
  const { state } = useContext(ResourcesContext);
  const {
    state: { referenceSelected },
    actions: { setReferenceSelected },
  } = useContext(AppContext);

  let uniqueBookID = new Set();

  if (state.resources.length > 0) {
    state.resources.forEach((resource) => {
      resource.projects.map((project) => uniqueBookID.add(project.identifier));
    });
  }

  document.onkeyup = (event) => {
    let availableBookList = Array.from(uniqueBookID);
    let chapterNumber = parseInt(referenceSelected.chapter);
    let chapters = Object.keys(getBookChapters(referenceSelected.bookId));
    let openBook = availableBookList.indexOf(referenceSelected.bookId);
    let pastBookIndex = openBook - 1;
    let nextBookIndex = openBook + 1;
    let pastBook = availableBookList[pastBookIndex];
    let nextBook = availableBookList[nextBookIndex];
    let pastChapters = Object.keys(getBookChapters(pastBook));
    let lastBook = availableBookList[availableBookList.length - 1];
    let firstBook = availableBookList[0];

    if (event.code === 'ArrowRight' && event.ctrlKey) {
      if (referenceSelected.bookId === 'obs' && chapterNumber === chapters.length) {
        setReferenceSelected({
          ...referenceSelected,
          chapter: String(chapters.length),
          verse: 1,
        });
      } else if (referenceSelected.bookId === 'obs') {
        chapterNumber++;
        setReferenceSelected({
          ...referenceSelected,
          chapter: String(chapterNumber),
          verse: 1,
        });
      }
      if (referenceSelected.bookId === lastBook && chapterNumber === chapters.length) {
        setReferenceSelected({
          bookId: lastBook,
          chapter: String(chapters.length),
          verse: 1,
        });
      } else if (
        chapterNumber !== chapters.length &&
        referenceSelected.bookId !== 'obs'
      ) {
        chapterNumber++;
        setReferenceSelected({
          ...referenceSelected,
          chapter: String(chapterNumber),
          verse: 1,
        });
      } else if (referenceSelected.bookId !== 'obs') {
        setReferenceSelected({
          bookId: nextBook,
          chapter: '1',
          verse: 1,
        });
      }
    } else if (event.code === 'ArrowLeft' && event.ctrlKey) {
      if (
        (referenceSelected.bookId === firstBook && chapterNumber === 1) ||
        (referenceSelected.bookId === 'obs' && chapterNumber === 1)
      ) {
        setReferenceSelected({
          ...referenceSelected,
          chapter: '1',
          verse: 1,
        });
      } else {
        if (chapterNumber === 1) {
          setReferenceSelected({
            bookId: pastBook,
            chapter: String(pastChapters.length),
            verse: 1,
          });
        } else {
          chapterNumber--;
          setReferenceSelected({
            ...referenceSelected,
            chapter: String(chapterNumber),
            verse: 1,
          });
        }
      }
    }
  };
  return Shortcut;
}
