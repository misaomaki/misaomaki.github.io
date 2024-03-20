const intervalMap = {};

self.addEventListener('message', (e) => {
  let event = e.data;
  let intervalId = event.data.id;

  if (event.type === "update") {
    // Start intervals in the Web Worker
    intervalMap[intervalId] = setInterval(() => {
      event.data.timeInSeconds -= 1;
      self.postMessage({ data: event, type: event.type });

      /* fail safe */
      if (event.data.timeInSeconds < 0) {
        clearInterval(intervalMap[intervalId]);
      }
    }, 1000); 
  } else if (event.type === "cancel") {
    // Cancel a specific interval
    const intervalId = event.data.id;
    if (intervalMap[intervalId]) {
      clearInterval(intervalMap[intervalId]);
      delete intervalMap[intervalId];
    }
  }
});

// Handle termination or cleanup if needed
self.addEventListener('terminate', () => {
  // Clear all intervals when the Web Worker is terminated
  Object.values(intervalMap).forEach((intervalId) => {
    clearInterval(intervalId);
  });
});