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

    // Here, you would typically send the data to your server for processing
    console.log('Form submitted!', { resume, experience, jobsPerDay });
    alert('Form submitted successfully!');
});
