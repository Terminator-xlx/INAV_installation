'use strict';

import $ from 'jquery';
import { GUI, TABS } from './../js/gui';
import tabs from './../js/tabs';

TABS.custom_task = {};

TABS.custom_task.initialize = function (callback) {
    GUI.active_tab = 'custom_task';

    import('./custom_task.html?raw').then(({default: html}) => {
        // Прячем экран Landing, чтобы не было прокрутки
        $('#landing').hide();
        
        // Очищаем #content перед загрузкой, чтобы вкладки не дублировались
        $('#content').empty();

        GUI.load(html, function() {
            // Показываем рабочую область
            $('#content').show();
            
            tabs.init($('.tab-custom_task'));
            GUI.content_ready(callback);
        });
    });
};

TABS.custom_task.cleanup = function (callback) {
    if (callback) callback();
};

// Обработчик клика
$(document).ready(function() {
    $(document).on('click', '.tab_custom_task a', function (e) {
        e.preventDefault();
        
        // Очистка
        GUI.tab_switch_cleanup(function() {
            $('#tabs ul li').removeClass('active');
            $('.tab_custom_task').addClass('active');

            TABS.custom_task.initialize();
        });
    });
});