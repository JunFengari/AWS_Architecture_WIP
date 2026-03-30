async function getData() {
    const response = await fetch('YOUR_API_GATEWAY_URL');
    const data = await response.json();

    const results = document.getElementById('results');
    results.innerHTML = '';

    data.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item.name;
        results.appendChild(li);
    });
}

// examples... might not work irl

async function checkEC2() {
    const response = await fetch('EC2_ALB_URL/status');
    const text = await response.text();
    alert(text); // simple pop-up or append to page
}
