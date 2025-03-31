

const apiUrl = 'http://localhost:3000/api/items';

window.onload = () => {
    fetchItems();
};

function fetchItems() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(items => {
            const tableBody = document.getElementById('itemsTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear the table before adding new rows
            items.forEach(item => {
                const row = tableBody.insertRow();
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>
                        <button onclick="editItem(${item.id}, '${item.name}')">Edit</button>
                        <button class="delete" onclick="deleteItem(${item.id})">Delete</button>
                    </td>
                `;
            });
        });
}

function addItem() {
    const itemName = document.getElementById('itemName').value;
    if (!itemName) return alert('Please enter an item name.');

    const item = { name: itemName };

    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById('itemName').value = ''; // Clear the input
        fetchItems(); // Refresh the list
    });
}

function deleteItem(id) {
    fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
    .then(() => fetchItems());
}

function editItem(id, currentName) {
    const newName = prompt('Edit item name:', currentName);
    if (newName && newName !== currentName) {
        fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName })
        })
        .then(() => fetchItems());
    }
}