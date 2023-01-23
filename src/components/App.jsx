import { useState } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";

export const App = () => {
  const [inputSearch, setInputSearch] = useState('');


  const handleSearchSubmit = inputSearch => {
    setInputSearch(inputSearch);
  }

  return (
    <div>
      <Searchbar onSubmit={handleSearchSubmit} />
      <div
      style={{
        height: '100vh',
        fontSize: 40,
        color: '#010101'
      }}
      >
        <ImageGallery 
        currentSearch={inputSearch}
        />
    </div>
    </div>
  );
}
