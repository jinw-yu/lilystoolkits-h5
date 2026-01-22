// DOM元素
const asciiInput = document.getElementById('asciiInput');
const hexInput = document.getElementById('hexInput');
const asciiToHexBtn = document.getElementById('asciiToHexBtn');
const hexToAsciiBtn = document.getElementById('hexToAsciiBtn');
const clearAsciiBtn = document.getElementById('clearAsciiBtn');
const clearHexBtn = document.getElementById('clearHexBtn');

// ASCII文本转Hex
asciiToHexBtn.addEventListener('click', () => {
    const asciiText = asciiInput.value;
    if (!asciiText) {
        showToast('请输入ASCII文本');
        showError(asciiInput, '请输入ASCII文本');
        return;
    }

    try {
        let hexResult = '';
        for (let i = 0; i < asciiText.length; i++) {
            hexResult += asciiText.charCodeAt(i).toString(16).toUpperCase().padStart(2, '0') + ' ';
        }
        
        hexInput.value = hexResult.trim();
        clearError(asciiInput);
        clearError(hexInput);
    } catch (error) {
        showToast('转换失败，请检查输入');
        showError(asciiInput, '转换失败，请检查输入');
    }
});

// Toast样式
const toastStyle = document.createElement('style');
toastStyle.textContent = `
.toast-message {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s;
    max-width: 80%;
    text-align: center;
}
.toast-message.show {
    opacity: 1;
}
`;
document.head.appendChild(toastStyle);

// 模拟微信小程序的Toast提示
function showToast(message, duration = 2000) {
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, duration);
    }, 50);
}

// 确保所有依赖函数存在
if (typeof showToast !== 'function' || typeof showError !== 'function' || typeof clearError !== 'function') {
    console.error('缺少必要的工具函数');
    // 提供默认实现防止崩溃
    window.showToast = window.showToast || function(message) { console.log('Toast:', message); };
    window.showError = window.showError || function(input, message) { console.error('Error:', input.id, message); };
    window.clearError = window.clearError || function(input) { console.log('Cleared:', input.id); };
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM完全加载，开始初始化转换器');
    
    // 获取所有需要的DOM元素
    const elements = {
        asciiToHexBtn: document.getElementById('asciiToHexBtn'),
        clearBtn: document.getElementById('clearBtn'),
        asciiInput: document.getElementById('asciiInput'),
        hexInput: document.getElementById('hexInput')
    };

    // 验证元素是否存在
    Object.entries(elements).forEach(([name, element]) => {
        if (!element) {
            console.error(`找不到元素: ${name}`);
        }
    });

    // 仅当所有必需元素都存在时才初始化
    if (elements.asciiToHexBtn && elements.clearBtn && elements.asciiInput && elements.hexInput) {
        // 清除所有输入
        elements.clearBtn.addEventListener('click', function() {
            console.log('清空按钮点击');
            try {
                elements.asciiInput.value = '';
                elements.hexInput.value = '';
                clearError(elements.asciiInput);
                clearError(elements.hexInput);
                showToast('已清除所有输入');
            } catch (error) {
                console.error('清空时出错:', error);
            }
        });

        // ASCII文本转Hex
        elements.asciiToHexBtn.addEventListener('click', function() {
            console.log('转换按钮点击');
            try {
                const asciiText = elements.asciiInput.value;
                if (!asciiText) {
                    showToast('请输入ASCII文本');
                    showError(elements.asciiInput, '请输入ASCII文本');
                    return;
                }

                let hexResult = '';
                for (let i = 0; i < asciiText.length; i++) {
                    hexResult += asciiText.charCodeAt(i).toString(16).toUpperCase().padStart(2, '0') + ' ';
                }
                
                elements.hexInput.value = hexResult.trim();
                clearError(elements.asciiInput);
                clearError(elements.hexInput);
                console.log('转换成功:', hexResult);
            } catch (error) {
                console.error('转换时出错:', error);
                showToast('转换失败，请检查输入');
                showError(elements.asciiInput, '转换失败，请检查输入');
            }
        });
        
        console.log('转换器初始化完成');
    } else {
        console.error('无法初始化转换器，缺少必需元素');
    }
});

// Hex转ASCII文本
hexToAsciiBtn.addEventListener('click', () => {
    const hexText = hexInput.value.replace(/\s+/g, '');
    if (!hexText) {
        showToast('请输入HEX文本');
        showError(hexInput, '请输入HEX文本');
        return;
    }

    // 验证hex格式
    if (!/^[0-9A-Fa-f]+$/.test(hexText)) {
        showToast('请输入有效的HEX字符');
        showError(hexInput, '请输入有效的HEX字符');
        return;
    }

    // 检查字符数量是否为偶数
    if (hexText.length % 2 !== 0) {
        showToast('HEX字符数量必须为偶数');
        showError(hexInput, 'HEX字符数量必须为偶数');
        return;
    }

    try {
        let asciiResult = '';
        for (let i = 0; i < hexText.length; i += 2) {
            const charCode = parseInt(hexText.substr(i, 2), 16);
            asciiResult += String.fromCharCode(charCode);
        }
        
        asciiInput.value = asciiResult;
        clearError(asciiInput);
        clearError(hexInput);
    } catch (error) {
        showToast('转换失败，请检查输入');
        showError(hexInput, '转换失败，请检查输入');
    }
});

// 清空ASCII输入
clearAsciiBtn.addEventListener('click', () => {
    asciiInput.value = '';
    clearError(asciiInput);
});

// 清空Hex输入
clearHexBtn.addEventListener('click', () => {
    hexInput.value = '';
    clearError(hexInput);
});

// ASCII输入框实时验证
asciiInput.addEventListener('input', () => {
    clearError(asciiInput);
});

// Hex输入框实时验证
hexInput.addEventListener('input', (e) => {
    clearError(hexInput);
    
    // 自动格式化：确保每两个字符后有一个空格
    const value = e.target.value.replace(/[^0-9A-Fa-f\s]/g, ''); // 移除非法字符
    const formatted = value
        .replace(/\s+/g, '') // 移除所有空格
        .match(/.{1,2}/g) // 每两个字符分组
        ?.join(' ') // 用空格连接
        || '';
    
    if (value !== e.target.value) {
        e.target.value = formatted;
    }
});

// 显示错误提示
function showError(element, message) {
    element.classList.add('error');
    
    // 创建或更新错误消息元素
    let errorMessage = element.parentElement.querySelector('.error-message');
    if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        element.parentElement.insertBefore(errorMessage, element.nextSibling);
    }
    errorMessage.textContent = message;
    errorMessage.classList.add('visible');
}

// 清除错误提示
function clearError(element) {
    element.classList.remove('error');
    const errorMessage = element.parentElement.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.classList.remove('visible');
    }
}

// 添加复制到剪贴板功能
function addCopyToClipboard(element) {
    element.addEventListener('dblclick', async () => {
        if (!element.value) return;
        
        try {
            await navigator.clipboard.writeText(element.value);
            const originalBg = element.style.backgroundColor;
            element.style.backgroundColor = '#e8f5e9';
            setTimeout(() => {
                element.style.backgroundColor = originalBg;
            }, 200);
        } catch (err) {
            console.error('复制失败:', err);
        }
    });
}

// 为输入框添加复制功能
addCopyToClipboard(asciiInput);
addCopyToClipboard(hexInput);

// 添加输入框提示
function addTooltip(element, message) {
    element.title = message;
}

// 添加双击复制提示
addTooltip(asciiInput, '双击全选并复制内容');
addTooltip(hexInput, '双击全选并复制内容');

// 初始化
function init() {
    // 清空输入框
    asciiInput.value = '';
    hexInput.value = '';
    
    // 清除可能的错误状态
    clearError(asciiInput);
    clearError(hexInput);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);