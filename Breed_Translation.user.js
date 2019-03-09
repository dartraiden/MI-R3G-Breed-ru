// ==UserScript==
// @name		Breed Bootloader Russian Translation
// @description	Перевод загрузчика Breed для Xiaomi Mi Router 3G
// @namespace	breed_mi_r3g_ru
// @version		20190307.1
// @author		LESHIY_ODESSA, dartraiden
// @include		http://192.168.1.1/*
// ==/UserScript==

(function () {

	function findAndReplace(searchText, replacement, searchNode) {
		if (!searchText || typeof replacement === 'undefined') {
			// Throw error here if you want...
			return;
		}
		var regex = typeof searchText === 'string' ? new RegExp(searchText, 'g') : searchText,
			childNodes = (searchNode || document.body).childNodes,
			cnLength = childNodes.length;
		excludes = 'html,head,style,title,link,meta,script,object,iframe';
		while (cnLength--) {
			var currentNode = childNodes[cnLength];
			if (currentNode.nodeType === 1 && (',' + excludes + ',').indexOf(',' + currentNode.nodeName.toLowerCase() + ',') === -1) {
				arguments.callee(searchText, replacement, currentNode);
			}
			if (currentNode.nodeType !== 3 || !regex.test(currentNode.data) ) {
				continue;
			}
			var parent = currentNode.parentNode,
				frag = (function(){
					var html = currentNode.data.replace(regex, replacement),
						wrap = document.createElement('div'),
						frag = document.createDocumentFragment();
					wrap.innerHTML = html;
					while (wrap.firstChild) {
						frag.appendChild(wrap.firstChild);
					}
					return frag;
				})();
			parent.insertBefore(frag, currentNode);
			parent.removeChild(currentNode);
		}
	}

	function translate() {
		var ts = {
		// Порядок имеет значение — чем короче строка, тем ниже она располагается, в противном случае короткие строки будут иметь приоритет, если встретятся в составе длинных
		"本产品仅供个人免费使用，禁止用于商业目的":"Этот продукт предназначен только для личного использования, а не для использования в коммерческих целях.",
		"请选择正确的固件类型，错误选择可能损坏固件。":"Внимательно выберите тип прошивки. Неправильный выбор может повредить прошивку.",
		"本页面不会自动刷新，请自行检查是否重启成功。":"Эта страница не обновляется автоматически, самостоятельно проверьте, перезагрузилось ли устройство",
		"同一时间只允许有一个备份任务":"Одновременно разрешена лишь одна задача резервного копирования.",
		// По неизвестной причине строка не переводится, если в ней содержится значение, которому должен быть кратен размер EEPROM, поэтому она разбита на две части
		"EEPROM 大小是":"Размер EEPROM должен быть кратен",
		" 的整倍数":"",
		"以恢复出厂设置。":"для сброса к заводским настройкам.",
		"更新完成，设备正在重启。本页面不会刷新，请手动检查设备状态。":"Перезагрузка. Самостоятельно проверьте состояние устройства",
		"正在更新固件，请耐心等待至进度条完成":"Обновляется прошивка, подождите, пока индикатор выполнения не заполнится.",
		"警告：在操作进行过程中请不要断开电源":"ПРЕДУПРЕЖДЕНИЕ: не отключайте питание во время работы.",
		"更新完成，2 秒后跳转到系统信息页面。":"Успешно завершено, переход на страницу «Сведения о системе» через 2 секунды",
		"操作完成，2 秒后跳转到系统信息页面。":"Завершено, переход на страницу «Сведения о системе» через 2 секунды",
		"作完成，2 秒后跳转到系统信息页面。":"Завершено, переход на страницу «Сведения о системе» через 2 секунды",
		"单击按钮备份相应的数据":"Нажмите кнопку для создания резервной копии соответствующих данных.",
		"按钮以重启路由":"для перезагрузки устройства.",
		"正在擦除 编程器固件":"Стирание",
		"正在擦除 固件设置":"Стирание",		
		"正在擦除 固件":"Стирание",
		"正在擦除 Bootloader":"Стирание",
		"正在擦除 EEPROM":"Стирание",
		"正在校验 编程器固件 擦除块":"Проверка стёртых блоков",
		"正在校验 固件 擦除块":"Проверка стёртых блоков",
		"正在校验 Bootloader 擦除块":"Проверка стёртых блоков",
		"正在校验 EEPROM 擦除块":"Проверка стёртых блоков",
		"正在写入 编程器固件":"Запись",
		"正在写入 固件":"Запись",
		"正在写入 Bootloader":"Запись",
		"正在写入 EEPROM":"Запись",
		"正在校验 编程器固件 数据":"Проверка записанных данных",
		"正在校验 固件 数据":"Проверка записанных данных",
		"正在校验 Bootloader 数据":"Проверка записанных данных",
		"正在校验 EEPROM 数据":"Проверка записанных данных",
		"MAC 地址已经被成功修改":"MAC-адреса успешно изменены",
		"上传的 Bootloader 无效":"Неправильный или повреждённый загрузчик.",
		"此固件不是小米 R3G 固件":"Прошивка не подходит для этой модели.",
		"编程器固件大小不合法，不能判定为有效的编程器固件。":"Размер дампа не соответствует ожидаемому.",
		"无法判断固件类型":"Не удалось определить тип прошивки.",
		"文件已上传，请确认下方列出的信息":"Файл загружен, проверьте указанные ниже сведения.",
		"小米路由器 3G 原厂固件":"Стоковая",
		"MAC 地址修改":"MAC-адреса",
		"恢复出厂设置":"Сброс",
		"文件未找到":"Не найдено",
		"请求的页面不存在。":"Запрошенная страница не существует.",
		"浏览器不支持 Ajax!":"Ваш браузер не поддерживает AJAX!",
		"Breed 内部错误!":"Внутренняя ошибка Breed!",
		"校验失败，请重试!":"Проверка не удалась, повторите попытку!",
		"擦除操作正在进行，请耐心等待至进度条完成":"Выполняется сброс, подождите, пока индикатор выполнения не заполнится.",
		"您选择的操作正在进行":"Выполняется выбранная вами операция.",
		"保留现有 Bootloader":"Сохранить существующий загрузчик",
		"保留现有 EEPROM":"Сохранить существующий EEPROM",
		"环境变量编辑":"Переменные",
		"Breed Web 恢复控制台":"Консоль восстановления Breed Web",
		"通信错误":"Ошибка соединения",
		"小米路由器 3G 固件 1":"Раздел 1",
		"小米路由器 3G 固件 2":"Раздел 2",
		"小米 R3G 设置":"Настройки",
		"配置已被成功更新。":"Настройки успешно обновлены",
		"环境变量已被成功更新。":"Переменные успешно обновлены",
		"Bdata 已被成功更新。":"Bdata успешно обновлена",
		"系统信息":"Сведения о системе",
		"固件更新":"Перепрошивка",
		"更新确认":"Подтвердите обновление",
		"路由正在重启，请耐心等待。":"Подождите, устройство перезагружается.",
		"路由正在重启":"Перезагрузка устройства",
		"常规固件":"Обычная прошивка",
		"编程器固件":"Полный дамп",
		"小米 R3G Bdata":"Bdata",
		"自动重启":"Автоматическая перезагрузка",
		"正在等待":"Ожидание",
		"闪存布局":"Разметка",
		"RT6855/RT6856/MT7621 独立参数":" Независимые параметры RT6855/RT6856/MT7621",
		"固件类型":"Тип прошивки",
		"固件备份":"Резервная копия",
		"操作正在进行":"Операция выполняется",
		"内存":"Память",
		"单击":"Нажмите кнопку",
		"以太网":"Ethernet",
		"时钟频率":"Частота",
		"编译日期":"Сборка",
		"文件名":"Имя файла",
		"大小":"Размер",
		"MD5 校验":"MD5-сумма",
		"版本":"Версия",
		"类型":"Тип",
		"固件":"Прошивка",
		"上传":"Загрузить",
		"执行":"Выполнить",
		"字段":"Поле",
		"值":"Значение",
		"删除":"Удалить",
		"添加":"Добавить",
		"保存":"Сохранить",
		"修改":"Изменить",
		"重启":"Перезагрузка",
		"关于":"О Breed",
		"修订号":"Ревизия",
		"联系作者":"Связаться с автором",
		"更新：":"Последняя версия: ",
		"更新":"Обновить",
		"错误":"Ошибка",
		"提示":"Подсказка",
		"返回":"Назад",
		"。":".",
		};
		for(var t in ts) {
			findAndReplace(t,ts[t]);
		}
		setTimeout(translate, 500);
	}

	setTimeout(translate, 500);

})();
