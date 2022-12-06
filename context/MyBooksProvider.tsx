import { View, Text } from 'react-native';
import React, { ReactNode, useContext, useState } from 'react';
import { createContext } from "react";

type MyBookContextType = {
    onToggleSaved : (book : Book) => void;
    isBookSaved : (book : Book) => boolean;
    savedBooks : Book [];
}

const MyBooksContext = createContext<MyBookContextType>({
    //now specify the default values of our type of MyBookContextType
    onToggleSaved :()=>{},
    isBookSaved : ()=>false,
    savedBooks: [],


});

//the children that we will pass to the provider wrapped under <MyBooksProvider>
type Props = {
    children: ReactNode;
  };

const MyBooksProvider = ({children}: Props) => {

    const [savedBooks , setSavedBooks] = useState<Book[]>([]);

    // 1st method is addBook=>DeleteBook
   /* const addBook = (book: Book )=>{
        setSavedBooks((books)=>[book,...books]);
    }*/

    //2nd method using toggle around saved variable for testing
    const areBooksTheSame = (a: Book, b: Book) => {
        return JSON.stringify(a) === JSON.stringify(b);
      };

    const isBookSaved = (book: Book) => {
        return savedBooks.some((savedBook) => areBooksTheSame(savedBook, book));
      };

    const onToggleSaved = (book: Book) =>{
        if(isBookSaved(book)){
             // remove from saved
            setSavedBooks((books) =>
            books.filter((savedBook) => !areBooksTheSame(savedBook, book)))
            ;
        }
        else {
            // add to saved
            setSavedBooks((books) => [book, ...books]);
      }
    }



  return (
    <MyBooksContext.Provider value={{ onToggleSaved, isBookSaved, savedBooks }}>
        {children}
    </MyBooksContext.Provider>
  )
}

// custom hook made by me to automate the use of this context
export const useMyBooks = () => useContext(MyBooksContext);
export default MyBooksProvider