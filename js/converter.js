// 当前选中的进制
let currentBase = 10;

// DOM元素
const inputValue = document.getElementById('inputValue');
const decimalValue = document.getElementById('decimalValue');
const hexValue = document.getElementById('hexValue');
const binaryValue = document.getElementById('binaryValue');
const deleteBtn = document.getElementById('deleteBtn');
const clearBtn = document.getElementById('clearBtn');

// 进制按钮事件处理
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // 更新按钮状态
        document.querySelectorAll('.btn').forEach(b => b.classList.remove('btn-active'));
        btn.classList.add('btn-active');
        
        // 更新当前进制
        currentBase = parseInt(btn.getAttribute('data-base'));
        
        // 更新键盘按钮状态
        updateKeypadState();
        
        // 保留当前数值并转换为新进制
        let newValue = '';
        if (decimalValue.textContent !== '待输入') {
            try {
                const decimal = BigInt(decimalValue.textContent);
                switch (currentBase) {
                    case 10:
                        newValue = decimal.toString(10);
                        break;
                    case 16:
                        newValue = decimal.toString(16).toUpperCase();
                        break;
                    case 2:
                        newValue = decimal.toString(2);
                        break;
                }
            } catch (error) {
                console.error('进制转换错误:', error);
                newValue = '';
            }
        }
        
        // 格式化新值并更新显示
        inputValue.value = formatInput(newValue);
        updateResults(newValue);
        
        // 聚焦输入框
        inputValue.focus();
    });
});

// 数字键盘事件处理
document.querySelectorAll('.keypad-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const value = btn.getAttribute('data-value');
        if (!value) return; // 跳过空白按钮
        
        if (value === 'DEL') {
            deleteLastChar();
        } else if (value === 'CLR') {
            clearAll();
        } else {
            appendValue(value);
        }
    });
});

// 输入框事件处理
let inputTimeout;
const MAX_INPUT_LENGTH = 32; // 限制输入长度防止大数计算问题

inputValue.addEventListener('input', (e) => {
    clearTimeout(inputTimeout);
    inputTimeout = setTimeout(() => {
        handleInputChange(e);
    }, 50);
});

// 键盘事件处理
inputValue.addEventListener('keydown', (e) => {
    // 限制输入长度
    if (inputValue.value.replace(/\s/g, '').length >= MAX_INPUT_LENGTH && 
        e.key !== 'Backspace' && e.key !== 'Delete' && 
        e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
        e.preventDefault();
        return;
    }
    
    // 根据当前进制限制输入字符
    if (currentBase === 2 && !/^[01]$|Backspace|Delete|Arrow/.test(e.key)) {
        e.preventDefault();
        return;
    }
    if (currentBase === 10 && !/^[0-9]$|Backspace|Delete|Arrow/.test(e.key)) {
        e.preventDefault();
        return;
    }
    if (currentBase === 16 && !/^[0-9A-Fa-f]$|Backspace|Delete|Arrow/.test(e.key)) {
        e.preventDefault();
        return;
    }
    
    // 快捷键支持
    if (e.key === 'Enter') {
        clearAll();
        e.preventDefault();
    } else if (e.key === 'Escape') {
        deleteLastChar();
        e.preventDefault();
    }
});

function handleInputChange(e) {
    const cursorPosition = e.target.selectionStart;
    let value = e.target.value.toUpperCase();
    
    // 处理粘贴操作 - 移除所有非有效字符
    if (e.inputType === 'insertFromPaste') {
        value = value.replace(/[^0-9A-F]/g, '');
        if (currentBase === 2) {
            value = value.replace(/[^01]/g, '');
        } else if (currentBase === 10) {
            value = value.replace(/[^0-9]/g, '');
        }
    }
    
    // 移除所有空格后验证
    const unformattedValue = value.replace(/\s/g, '');
    
    if (isValidInput(unformattedValue)) {
        // 格式化并更新显示
        const formattedValue = formatInput(unformattedValue);
        e.target.value = formattedValue;
        
        // 计算新的光标位置
        let newPosition = cursorPosition;
        if (e.inputType !== 'deleteContentBackward') {
            const addedSpaces = formattedValue.slice(0, cursorPosition).split(' ').length - 1;
            newPosition = cursorPosition + addedSpaces;
        }
        
        // 确保光标位置不超过输入框长度
        newPosition = Math.min(newPosition, formattedValue.length);
        
        // 恢复光标位置
        e.target.setSelectionRange(newPosition, newPosition);
        
        // 更新结果
        updateResults(unformattedValue);
    } else {
        // 如果输入无效，回退到上一个有效值
        const lastValidValue = unformattedValue.slice(0, -1);
        e.target.value = formatInput(lastValidValue);
        updateResults(lastValidValue);
        
        // 恢复光标位置
        e.target.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
    }
}

// 验证输入是否合法
function isValidInput(value) {
    if (!value) return true;
    
    // 移除所有空格后验证
    value = value.replace(/\s/g, '');
    
    switch (currentBase) {
        case 2:
            return /^[01]*$/.test(value);
        case 10:
            return /^[0-9]*$/.test(value);
        case 16:
            return /^[0-9A-F]*$/.test(value);
        default:
            return false;
    }
}

// 格式化输入显示
function formatInput(value) {
    if (!value) return '';
    
    // 移除所有空格
    value = value.replace(/\s/g, '');
    
    switch (currentBase) {
        case 16:
            // 确保偶数位，并每2位添加空格
            if (value.length % 2 !== 0) {
                value = '0' + value;
            }
            return value.replace(/([0-9A-F]{2})(?=.)/g, '$1 ');
        case 2:
            // 确保4位对齐，并每4位添加空格
            while (value.length % 4 !== 0) {
                value = '0' + value;
            }
            return value.replace(/(\d{4})(?=.)/g, '$1 ');
        default:
            return value;
    }
}

// 更新键盘按钮状态
function updateKeypadState() {
    document.querySelectorAll('.keypad-btn').forEach(btn => {
        const value = btn.getAttribute('data-value');
        if (!value || value === 'DEL' || value === 'CLR') return;
        
        if (currentBase === 2 && !/^[01]$/.test(value)) {
            btn.classList.add('keypad-btn-disabled');
        } else if (currentBase === 10 && !/^[0-9]$/.test(value)) {
            btn.classList.add('keypad-btn-disabled');
        } else {
            btn.classList.remove('keypad-btn-disabled');
        }
    });
}

// 添加数字
function appendValue(value) {
    // 移除当前输入中的所有空格
    const currentValue = inputValue.value.replace(/\s/g, '');
    const newValue = currentValue + value;
    
    if (isValidInput(newValue)) {
        // 格式化新值并更新显示
        inputValue.value = formatInput(newValue);
        updateResults(newValue);
    }
}

// 删除最后一个字符
function deleteLastChar() {
    // 移除所有空格
    const currentValue = inputValue.value.replace(/\s/g, '');
    if (currentValue.length > 0) {
        // 删除最后一个字符
        const newValue = currentValue.slice(0, -1);
        // 重新格式化并更新
        inputValue.value = formatInput(newValue);
        updateResults(newValue);
    }
}

// 清空所有
function clearAll() {
    inputValue.value = '';
    clearResults();
}

// 清空结果显示
function clearResults() {
    decimalValue.innerHTML = '<span class="result-value-placeholder">待输入</span>';
    hexValue.innerHTML = '<span class="result-value-placeholder">待输入</span>';
    binaryValue.innerHTML = '<span class="result-value-placeholder">待输入</span>';
}

// 更新结果显示
function updateResults(value) {
    // 清除之前的错误状态
    inputValue.classList.remove('input-error');
    decimalValue.innerHTML = '<span class="result-value-placeholder">待输入</span>';
    hexValue.innerHTML = '<span class="result-value-placeholder">待输入</span>';
    binaryValue.innerHTML = '<span class="result-value-placeholder">待输入</span>';

    if (!value) {
        return;
    }
    
    try {
        // 移除所有空格并转换为十进制
        value = value.replace(/\s/g, '');
        if (!isValidInput(value)) {
            showError();
            return;
        }
        
        // 转换为十进制
        const decimal = BigInt(currentBase === 10 ? value : 
                             currentBase === 16 ? '0x' + value : 
                             '0b' + value);
        
        // 更新显示
        decimalValue.textContent = decimal.toString(10);
        
        // 十六进制显示格式化为每2位一组
        let hexStr = decimal.toString(16).toUpperCase();
        // 确保字节对齐（偶数位）
        if (hexStr.length % 2 !== 0) {
            hexStr = '0' + hexStr;
        }
        const formattedHex = hexStr.replace(/([0-9A-F]{2})(?=.)/g, '$1 ');
        hexValue.textContent = formattedHex;
        
        // 二进制显示格式化为每4位一组
        let binaryStr = decimal.toString(2);
        // 确保4位对齐
        while (binaryStr.length % 4 !== 0) {
            binaryStr = '0' + binaryStr;
        }
        const formattedBinary = binaryStr.replace(/(\d{4})(?=.)/g, '$1 ');
        binaryValue.textContent = formattedBinary;
        
    } catch (error) {
        console.error('转换错误:', error);
        showError();
    }
}

// 显示错误状态
function showError() {
    inputValue.classList.add('input-error');
    decimalValue.innerHTML = '<span class="result-value-error">无效输入</span>';
    hexValue.innerHTML = '<span class="result-value-error">无效输入</span>';
    binaryValue.innerHTML = '<span class="result-value-error">无效输入</span>';
}

// 初始化
function init() {
    updateKeypadState();
    clearResults();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);