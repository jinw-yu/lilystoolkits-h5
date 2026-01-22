// 工具列表数据
const toolsData = [
    {
        id: 'converter',
        name: '进制转换器',
        description: '支持各种进制之间的转换',
        path: 'converter.html'
    },
    {
        id: 'hexascii',
        name: 'Hex/ASCII转换器',
        description: '十六进制与ASCII码之间的转换',
        path: 'hexascii.html'
    },
    {
        id: 'optical',
        name: '光模块计算器',
        description: '光模块相关计算工具',
        path: 'optical.html'
    }
];

// 初始化页面
function initPage() {
    const toolsList = document.getElementById('toolsList');
    
    // 生成工具列表
    toolsData.forEach(tool => {
        const toolElement = document.createElement('div');
        toolElement.className = 'tool-item';
        toolElement.setAttribute('data-id', tool.id);
        
        toolElement.innerHTML = `
            <h2>${tool.name}</h2>
            <p>${tool.description}</p>
        `;
        
        // 添加点击事件
        toolElement.addEventListener('click', () => {
            navigateToTool(tool.path);
        });
        
        toolsList.appendChild(toolElement);
    });
}

// 页面导航
function navigateToTool(path) {
    window.location.href = path;
}

// 当DOM加载完成后初始化页面
document.addEventListener('DOMContentLoaded', initPage);