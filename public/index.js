document.getElementById('applicationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents form from submitting in a traditional way
    
    // Basic validation example
    const resume = document.getElementById('resume').files[0];
    const experience = document.getElementById('experience').value;
    const jobsPerDay = document.getElementById('jobsPerDay').value;

    if (!resume) {
        alert('Please upload your resume.');
        return;
    }

    if (experience === '' || experience < 0) {
        alert('Please enter your years of experience.');
        return;
    }

    if (jobsPerDay === '' || jobsPerDay < 1) {
        alert('Please enter the number of jobs you want to apply for per day.');
        return;
    }

    // Create a FormData object and append the files and other data
    let formData = new FormData();
    formData.append('resume', resume);
    formData.append('experience', experience);
    formData.append('jobsPerDay', jobsPerDay);

      // Send the form data to the server using the fetch API
      fetch('/api/upload', { // Use the correct endpoint that you have configured on your server
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.text(); // or `response.json()` if your server sends back JSON
    })
    .then(data => {
        window.location.href = '/upload-success';
    })
    .catch(error => {
        // Handle any errors here
        console.error('There has been a problem with your fetch operation:', error);
        alert('Failed to upload the resume.');
    });
});
