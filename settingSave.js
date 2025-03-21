document.addEventListener('DOMContentLoaded', () => {
    const studentIdInput = document.getElementById('student-id');
    const passwordInput = document.getElementById('password');
    const saveButton = document.getElementById('save-button');
    const tableInputs = Array.from(document.querySelectorAll('.cell-input'));
    const ROWS = 7;
    const COLS = 10;

    // データを保存
    saveButton.addEventListener('click', () => {
        // 表データを2次元配列に変換
        const tableData = [];
        for (let r = 0; r < ROWS; r++) {
            const row = [];
            for (let c = 0; c < COLS; c++) {
            const index = r * COLS + c;
            row.push(tableInputs[index].value);
            }
            tableData.push(row);
        }
        // 保存処理
        chrome.storage.local.set({
            studentId: studentIdInput.value,
            password: passwordInput.value,
            tableData: tableData
        }, () => {
            alert('保存しました！');
        });
    });
    
    // 保存されたデータを読み込み
    chrome.storage.local.get(['studentId', 'password', 'tableData'], (data) => {
        if (data.studentId) studentIdInput.value = data.studentId;
        if (data.password) passwordInput.value = data.password;
        if (data.tableData) {
            for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const index = r * COLS + c;
                tableInputs[index].value = data.tableData[r]?.[c] || '';
            }
            }
        }
        });
    });