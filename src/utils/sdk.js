export const sdkPromise = (sdkCall, topic) =>
  new Promise((resolve, reject) => {
    const handleResponse = event => {
      if (event.data.topic !== undefined && event.data.topic[0] === topic) {
        const { error, response } = event.data;
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
        window.removeEventListener('message', handleResponse, false);
      }
    };
    window.addEventListener('message', handleResponse);
    window.parent.postMessage(sdkCall, '*');
  });
