// Fetch the JSON data from the API
fetch('https://api.npoint.io/f26432e9e880999eeb1b')
  .then(response => response.json())
  .then(jsonData => {
    // Convert JSON data to a string
    const jsonString = JSON.stringify(jsonData, null, 2); // Indent with 2 spaces for readability

    // Create a Blob from the JSON string
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Create a URL for the Blob
    const blobUrl = URL.createObjectURL(blob);

    // Create a link element for downloading
    const downloadLink = document.createElement('a');
    downloadLink.href = blobUrl;
    downloadLink.download = 'api_response.json'; // Specify the filename

    // Programmatically click the link to trigger the download
    downloadLink.click();

    // Clean up the Blob URL after the download is initiated
    URL.revokeObjectURL(blobUrl);
  })
  .catch(error => console.error('Error fetching data:', error));
