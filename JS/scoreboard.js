// Entire script will be in strict mode
"use strict";
function generateTable() {
    let usersArray = JSON.parse(localStorage.getItem('usersArray')) || [];
    usersArray.sort((a, b) => b.highScore - a.highScore);

    let tableBody = document.getElementById('scoreTable').getElementsByTagName('tbody')[0]; // Get the table by ID

    // Clear any existing content in the table body
    tableBody.innerHTML = '';

    // Loop through the sorted usersArray and populate the table
    for (let i = 0; i < usersArray.length; i++) {
        let row = tableBody.insertRow(i);
        let rankCell = row.insertCell(0);
        let playerCell = row.insertCell(1);
        let scoreCell = row.insertCell(2);

        // Set medals emojis and hover effects for the first three rows 
        if (i === 0) {
            rankCell.textContent = '🥇'; // First place medal emoji
            row.classList.add('gold-hover'); // Apply gold hover class
        } else if (i === 1) {
            rankCell.textContent = '🥈'; // Second place medal emoji
            row.classList.add('silver-hover'); // Apply silver hover class
        } else if (i === 2) {
            rankCell.textContent = '🥉'; // Third place medal emoji
            row.classList.add('bronze-hover'); // Apply bronze hover class
        } else {
            rankCell.textContent = i + 1; // Rank for other rows
            row.classList.add('normal-hover');
        }

        playerCell.textContent = usersArray[i].name; // Player's name from usersArray
        scoreCell.textContent = usersArray[i].highScore; // Score from usersArray
    }
}

// Call the function when the page loads
window.onload = generateTable;