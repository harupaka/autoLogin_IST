chrome.storage.local.get(['studentId', 'password', 'tableData'], data => {
    if (document.querySelector('input[name="usr_name"]')) {
        handleLoginPage(data);
    } else if (document.querySelector('input[name="message3"]')) {
        handleInputPage(data.tableData || []);
    }
});

function handleLoginPage(data) {
    const idInput = document.querySelector('input[name="usr_name"]');
    if (idInput) {
        idInput.value = data.studentId || '';
    }
    const pwInput = document.querySelector('input[name="usr_password"]');
    if (pwInput) {
        pwInput.value = data.password || '';
    }
    document.querySelector('input[name="OK"]')?.click();
}

function handleInputPage(table) {
    const rows = document.querySelectorAll('tr');
    rows.forEach(row => {
        const th = row.querySelector('th');
        const match = th?.textContent.match(/\[([A-J]),([1-7])\]/);
        if (!match) return;
    
        const [_, col, rowNum] = match;
        const value = getTableValue(table, col, parseInt(rowNum));
    
        const input = row.querySelector('input[name^="message"]');
        if (input) input.value = value;
    });

    document.querySelector('input[name="OK"]')?.click();
}

function getTableValue(table, colLetter, rowNumber) {
    const colIndex = colLetter.charCodeAt(0) - 'A'.charCodeAt(0);
    const rowIndex = rowNumber - 1;
    return table[rowIndex]?.[colIndex] || '';
}