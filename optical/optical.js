/**
 * 光模块计算器 JavaScript
 * 实现DDM参数转换、BER/SNR转换、光功率单位转换和可靠性单位转换功能
 */

// DDM参数转换 - 温度
function convertTemp() {
    const tempInput = document.getElementById('temperature');
    const hexInput = document.getElementById('tempHex');
    
    if (tempInput.value && !hexInput.value) {
        // 温度转寄存器值 (-128℃ ~ +127℃, 1 LSB=1/256℃)
        const temp = parseFloat(tempInput.value);
        if (temp < -128 || temp > 127) {
            showToast('温度范围：-128℃ ~ +127℃');
            return;
        }
        const rawValue = Math.round(temp * 256);
        const hexValue = (rawValue & 0xFFFF).toString(16).padStart(4, '0').toUpperCase();
        hexInput.value = hexValue;
    } else if (hexInput.value && !tempInput.value) {
        // 寄存器值转温度
        const hexValue = hexInput.value;
        if (!/^[0-9A-Fa-f]{1,4}$/.test(hexValue)) {
            showToast('请输入有效的十六进制值');
            return;
        }
        const raw = parseInt(hexValue, 16);
        // 有符号16位整数转换
        const value = raw > 0x7FFF ? raw - 0x10000 : raw;
        const temp = (value / 256).toFixed(3);
        tempInput.value = temp;
    } else if (!tempInput.value && !hexInput.value) {
        showToast('请至少输入一个值');
    }
}

// 温度输入事件处理
document.getElementById('temperature').addEventListener('input', function(e) {
    const hexInput = document.getElementById('tempHex');
    if (hexInput.value) hexInput.value = '';
});

document.getElementById('tempHex').addEventListener('input', function(e) {
    const tempInput = document.getElementById('temperature');
    if (tempInput.value) tempInput.value = '';
});

// DDM参数转换 - 电压
function convertVolt() {
    const voltInput = document.getElementById('voltage');
    const hexInput = document.getElementById('voltHex');
    
    if (voltInput.value && !hexInput.value) {
        // 电压转寄存器值 (0V ~ 6.55V, 1 LSB=0.1mV)
        const volt = parseFloat(voltInput.value);
        if (volt < 0 || volt > 6.55) {
            showToast('电压范围：0V ~ 6.55V');
            return;
        }
        const rawValue = Math.round(volt * 10000); // 转换为0.1mV单位
        const hexValue = rawValue.toString(16).padStart(4, '0').toUpperCase();
        hexInput.value = hexValue;
    } else if (hexInput.value && !voltInput.value) {
        // 寄存器值转电压
        const hexValue = hexInput.value;
        if (!/^[0-9A-Fa-f]{1,4}$/.test(hexValue)) {
            showToast('请输入有效的十六进制值');
            return;
        }
        const raw = parseInt(hexValue, 16);
        const volt = (raw * 0.0001).toFixed(3); // 0.1mV转换为V
        voltInput.value = volt;
    } else if (!voltInput.value && !hexInput.value) {
        showToast('请至少输入一个值');
    }
}

// 电压输入事件处理
document.getElementById('voltage').addEventListener('input', function(e) {
    const hexInput = document.getElementById('voltHex');
    if (hexInput.value) hexInput.value = '';
});

document.getElementById('voltHex').addEventListener('input', function(e) {
    const voltInput = document.getElementById('voltage');
    if (voltInput.value) voltInput.value = '';
});

// DDM参数转换 - 偏置电流
function convertCurrent() {
    const currentInput = document.getElementById('current');
    const hexInput = document.getElementById('currentHex');
    
    if (currentInput.value && !hexInput.value) {
        // 电流转寄存器值 (0mA ~ 131mA, 1 LSB=0.002mA)
        const current = parseFloat(currentInput.value);
        if (current < 0 || current > 131) {
            showToast('电流范围：0mA ~ 131mA');
            return;
        }
        const rawValue = Math.round(current / 0.002); // 转换为0.002mA单位
        const hexValue = rawValue.toString(16).padStart(4, '0').toUpperCase();
        hexInput.value = hexValue;
    } else if (hexInput.value && !currentInput.value) {
        // 寄存器值转电流
        const hexValue = hexInput.value;
        if (!/^[0-9A-Fa-f]{1,4}$/.test(hexValue)) {
            showToast('请输入有效的十六进制值');
            return;
        }
        const raw = parseInt(hexValue, 16);
        const current = (raw * 0.002).toFixed(3); // 0.002mA单位转换为mA
        currentInput.value = current;
    } else if (!currentInput.value && !hexInput.value) {
        showToast('请至少输入一个值');
    }
}

// 电流输入事件处理
document.getElementById('current').addEventListener('input', function(e) {
    const hexInput = document.getElementById('currentHex');
    if (hexInput.value) hexInput.value = '';
});

document.getElementById('currentHex').addEventListener('input', function(e) {
    const currentInput = document.getElementById('current');
    if (currentInput.value) currentInput.value = '';
});

// DDM参数转换 - 光功率
function convertPower() {
    const powerInput = document.getElementById('power');
    const hexInput = document.getElementById('powerHex');
    
    if (powerInput.value && !hexInput.value) {
        // 功率转寄存器值 (-40dBm ~ +8.2dBm, 1 LSB=0.0001mW)
        const power = parseFloat(powerInput.value);
        if (power < -40 || power > 8.2) {
            showToast('功率范围：-40dBm ~ +8.2dBm');
            return;
        }
        // 将dBm转换为mW
        const mw = Math.pow(10, power/10);
        const rawValue = Math.round(mw * 10000); // 转换为0.0001mW单位
        const hexValue = rawValue.toString(16).padStart(4, '0').toUpperCase();
        hexInput.value = hexValue;
    } else if (hexInput.value && !powerInput.value) {
        // 寄存器值转功率
        const hexValue = hexInput.value;
        if (!/^[0-9A-Fa-f]{1,4}$/.test(hexValue)) {
            showToast('请输入有效的十六进制值');
            return;
        }
        const raw = parseInt(hexValue, 16);
        const mw = raw * 0.0001; // 0.0001mW单位转换为mW
        const dbm = (10 * Math.log10(mw)).toFixed(3);
        powerInput.value = dbm;
    } else if (!powerInput.value && !hexInput.value) {
        showToast('请至少输入一个值');
    }
}

// 光功率输入事件处理
document.getElementById('power').addEventListener('input', function(e) {
    const hexInput = document.getElementById('powerHex');
    if (hexInput.value) hexInput.value = '';
});

document.getElementById('powerHex').addEventListener('input', function(e) {
    const powerInput = document.getElementById('power');
    if (powerInput.value) powerInput.value = '';
});

// BER/SNR转换 - 误码率
function convertBer() {
    const berInput = document.getElementById('ber');
    const hexInput = document.getElementById('berHex');
    
    if (berInput.value && !hexInput.value) {
        try {
            // 解析科学计数法
            const [base, exp] = berInput.value.toLowerCase().split('e');
            const baseValue = Math.round(parseFloat(base));
            const expValue = parseInt(exp);
            
            // 计算s和m值
            const s = expValue + 24; // 从例子可知 s-24=exp，所以s=exp+24
            const m = baseValue;
            
            if (s < 0 || s > 31) { // s占5位，最大值31
                throw new Error('数值超出范围');
            }
            
            // 组合成16进制值：s占高5位，m占剩余11位
            const value = (s << 11) | (m & 0x7FF);
            const hexValue = value.toString(16).padStart(4, '0').toUpperCase();
            hexInput.value = hexValue;
        } catch (error) {
            showToast('请输入有效的科学计数法，如1e-12');
        }
    } else if (hexInput.value && !berInput.value) {
        // 寄存器值转BER
        const hexValue = hexInput.value;
        if (!/^[0-9A-Fa-f]{1,4}$/.test(hexValue)) {
            showToast('请输入有效的十六进制值');
            return;
        }
        const value = parseInt(hexValue, 16);
        const s = (value >> 11) & 0x1F; // 获取高5位
        const m = value & 0x7FF; // 获取低11位
        const exp = s - 24;
        const ber = `${m}e${exp}`;
        berInput.value = ber;
    } else if (!berInput.value && !hexInput.value) {
        showToast('请至少输入一个值');
    }
}

// BER/SNR转换 - 信噪比
function convertSnr() {
    const snrInput = document.getElementById('snr');
    const hexInput = document.getElementById('snrHex');
    
    if (snrInput.value && !hexInput.value) {
        try {
            // SNR单位是dB，1 LSB = 1/256 dB
            const snrValue = parseFloat(snrInput.value);
            if (isNaN(snrValue)) {
                throw new Error('请输入有效的SNR值');
            }
            // 转换为1/256 dB单位的整数
            const rawValue = Math.round(snrValue * 256);
            if (rawValue < 0 || rawValue > 65535) {
                throw new Error('SNR值超出范围');
            }
            const hexValue = rawValue.toString(16).padStart(4, '0').toUpperCase();
            hexInput.value = hexValue;
        } catch (error) {
            showToast(error.message || '请输入有效的SNR值');
        }
    } else if (hexInput.value && !snrInput.value) {
        // 寄存器值转SNR
        const hexValue = hexInput.value;
        if (!/^[0-9A-Fa-f]{1,4}$/.test(hexValue)) {
            showToast('请输入有效的十六进制值');
            return;
        }
        const raw = parseInt(hexValue, 16);
        // 转换回dB值
        const snrValue = (raw / 256).toFixed(3);
        snrInput.value = snrValue;
    } else if (!snrInput.value && !hexInput.value) {
        showToast('请至少输入一个值');
    }
}

// BER/SNR输入事件处理
document.getElementById('ber').addEventListener('input', function(e) {
    const hexInput = document.getElementById('berHex');
    if (hexInput.value) hexInput.value = '';
});

document.getElementById('berHex').addEventListener('input', function(e) {
    const berInput = document.getElementById('ber');
    if (berInput.value) berInput.value = '';
});

document.getElementById('snr').addEventListener('input', function(e) {
    const hexInput = document.getElementById('snrHex');
    if (hexInput.value) hexInput.value = '';
});

document.getElementById('snrHex').addEventListener('input', function(e) {
    const snrInput = document.getElementById('snr');
    if (snrInput.value) snrInput.value = '';
});

// 光功率单位转换 (mW <-> dBm)
function convertPowerUnit() {
    const mwInput = document.getElementById('mw');
    const dbmInput = document.getElementById('dbm');
    
    if (mwInput.value && !dbmInput.value) {
        // mW转dBm
        const mw = parseFloat(mwInput.value);
        if (mw <= 0) {
            showToast('mW值必须大于0');
            return;
        }
        const dbm = (10 * Math.log10(mw)).toFixed(3);
        dbmInput.value = dbm;
    } else if (dbmInput.value && !mwInput.value) {
        // dBm转mW
        const dbm = parseFloat(dbmInput.value);
        const mw = Math.pow(10, dbm / 10).toFixed(6);
        mwInput.value = mw;
    } else if (!mwInput.value && !dbmInput.value) {
        showToast('请至少输入一个值');
    }
}

// 可靠性单位转换 (FIT <-> PPM)
function convertReliability() {
    const fitInput = document.getElementById('fit');
    const ppmInput = document.getElementById('ppm');
    
    if (fitInput.value && !ppmInput.value) {
        // FIT转PPM (1 FIT = 8.76e-6 PPM)
        const fit = parseFloat(fitInput.value);
        if (fit < 0) {
            showToast('FIT值必须大于等于0');
            return;
        }
        const ppm = (fit * 8.76e-6).toFixed(6);
        ppmInput.value = ppm;
    } else if (ppmInput.value && !fitInput.value) {
        // PPM转FIT
        const ppm = parseFloat(ppmInput.value);
        if (ppm < 0) {
            showToast('PPM值必须大于等于0');
            return;
        }
        const fit = (ppm / 8.76e-6).toFixed(2);
        fitInput.value = fit;
    } else if (!fitInput.value && !ppmInput.value) {
        showToast('请至少输入一个值');
    }
}

// 光功率单位输入事件处理
document.getElementById('mw').addEventListener('input', function(e) {
    const dbmInput = document.getElementById('dbm');
    if (dbmInput.value) dbmInput.value = '';
});

document.getElementById('dbm').addEventListener('input', function(e) {
    const mwInput = document.getElementById('mw');
    if (mwInput.value) mwInput.value = '';
});

// 可靠性单位输入事件处理
document.getElementById('fit').addEventListener('input', function(e) {
    const ppmInput = document.getElementById('ppm');
    if (ppmInput.value) ppmInput.value = '';
});

document.getElementById('ppm').addEventListener('input', function(e) {
    const fitInput = document.getElementById('fit');
    if (fitInput.value) fitInput.value = '';
});

// 清空所有输入框
function clearAll() {
    // DDM参数
    document.getElementById('temperature').value = '';
    document.getElementById('tempHex').value = '';
    document.getElementById('voltage').value = '';
    document.getElementById('voltHex').value = '';
    document.getElementById('current').value = '';
    document.getElementById('currentHex').value = '';
    document.getElementById('power').value = '';
    document.getElementById('powerHex').value = '';
    
    // BER/SNR
    document.getElementById('ber').value = '';
    document.getElementById('berHex').value = '';
    document.getElementById('snr').value = '';
    document.getElementById('snrHex').value = '';
    
    // 光功率单位
    document.getElementById('mw').value = '';
    document.getElementById('dbm').value = '';
    
    // 可靠性单位
    document.getElementById('fit').value = '';
    document.getElementById('ppm').value = '';
    
    showToast('已清空所有输入');
}



// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 可以在这里添加页面初始化代码
    console.log('光模块计算器已加载');
});