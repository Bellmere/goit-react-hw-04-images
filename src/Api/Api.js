import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api`;

export const fetchImages = async (inputValue, pageNr) => {

  try {
    const response = await axios.get(`/?q=${inputValue}&page=${pageNr}&key=31733300-b569f31f89a42522564474d93&image_type=photo&orientation=horizontal&per_page=12`);

    if (response.status === 200) {
      return response.data.hits.map(image => {
        return {
          id: image.id,
          webformatURL: image.webformatURL,
          largeImageURL: image.largeImageURL,
          tags: image.tags,
        };
      });
    }
  } catch (error) {
    return Promise.reject(
      new Error('Sorry something go wrong ;('),
    );
  }
};
