document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name');
    const organization = document.getElementById('organization');
    const email = document.getElementById('email');
    const contactNumber = document.getElementById('contact-number');
    const message = document.getElementById('message');
    let valid = true;

    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(span => span.textContent = '');

    // Validate name
    if (name.value.trim() === '') {
        name.nextElementSibling.textContent = 'Name is required';
        valid = false;
    }

    // Validate organization
    if (organization.value.trim() === '') {
        organization.nextElementSibling.textContent = 'Organization name is required';
        valid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
        email.nextElementSibling.textContent = 'Invalid email address';
        valid = false;
    }

    // Validate contact number
    if (contactNumber.value.trim() === '') {
        contactNumber.nextElementSibling.textContent = 'Contact number is required';
        valid = false;
    }

    // Validate message
    if (message.value.trim() === '') {
        message.nextElementSibling.textContent = 'Message is required';
        valid = false;
    }

    if (valid) {
        this.submit();
    }
});


document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const form = this;
    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', form.action, true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.success) {
                document.getElementById('form-success').classList.remove('hidden');
                setTimeout(() => {
                    document.getElementById('form-success').classList.add('hidden');
                }, 5000);
                form.reset();
            } else {
                Object.keys(response.errors).forEach(key => {
                    const errorSpan = document.getElementById(key).nextElementSibling;
                    errorSpan.textContent = response.errors[key];
                });
            }
        }
    };
    xhr.send(formData);
});

