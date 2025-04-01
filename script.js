document.addEventListener('DOMContentLoaded', function() {
    const menuData = {
        'Книги': {
            'Отечественные': ['Детективы', 'Научная фантастика', 'Исторические'],
            'Зарубежные': ['Детективы', 'Научная фантастика', 'Исторические']
        },
        'DVD': {
            'Отечественные': ['Детективы', 'Научная фантастика', 'Исторические'],
            'Зарубежные': ['Детективы', 'Научная фантастика', 'Исторические']
        }
    };

    function createMenuItem(text, hasChildren = false) {
        const div = document.createElement('div');
        div.classList.add('menu-item');

        if (hasChildren) {
            const toggleBtn = document.createElement('span');
            toggleBtn.className = 'toggle-btn';
            toggleBtn.textContent = '□';
            div.appendChild(toggleBtn);
        }

        const textSpan = document.createElement('span');
        textSpan.className = 'item-text';
        textSpan.textContent = text;
        div.appendChild(textSpan);

        return div;
    }

    function createMenuList(items) {
        const ul = document.createElement('ul');
        ul.className = 'menu';

        for (const [key, value] of Object.entries(items)) {
            const li = document.createElement('li');
            
            if (typeof value === 'object') {
                li.appendChild(createMenuItem(key, true));
                if (Array.isArray(value)) {
                    const subUl = document.createElement('ul');
                    value.forEach(item => {
                        const subLi = document.createElement('li');
                        subLi.appendChild(createMenuItem(item));
                        subUl.appendChild(subLi);
                    });
                    li.appendChild(subUl);
                } else {
                    li.appendChild(createMenuList(value));
                }
            } else {
                li.appendChild(createMenuItem(value));
            }
            
            ul.appendChild(li);
        }

        return ul;
    }

    const menuContainer = document.getElementById('menu-container');
    menuContainer.appendChild(createMenuList(menuData));

    menuContainer.addEventListener('click', function(e) {
        const menuItem = e.target.closest('.menu-item');
        if (!menuItem) return;

        const li = menuItem.closest('li');
        if (!li) return;

        const hasSubmenu = li.querySelector('ul');
        if (hasSubmenu) {
            e.stopPropagation();
            li.classList.toggle('active');
            
            const toggleBtn = menuItem.querySelector('.toggle-btn');
            if (toggleBtn) {
                toggleBtn.textContent = li.classList.contains('active') ? '■' : '□';
            }
        }
    });
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.menu')) {
            const activeItems = document.querySelectorAll('.menu li.active');
            activeItems.forEach(item => {
                item.classList.remove('active');
                const toggleBtn = item.querySelector('.toggle-btn');
                if (toggleBtn) {
                    toggleBtn.textContent = '□';
                }
            });
        }
    });
});
