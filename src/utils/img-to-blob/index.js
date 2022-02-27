const fetchImage = (url) => {
  return new Promise((resolve, reject) => {
    try {
      const xhr = new window.XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.onerror = () => reject('Network error.');
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response);
        }
        reject(`Loading error: ${xhr.statusText}`);
      };
      xhr.send();
    } catch (err) {
      reject(err.message);
    }
  });
};

export default fetchImage;
