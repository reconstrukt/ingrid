(function($) {

    function ModernGrid(target_, options_) {
    
    var cfg = {

        /*  Basic Table Config */
        tableType : 'static',                           // type of table - static, hybrid, or dynamic
        initialLoad : false,                            // when modernGrid is initialized, should it load data immediately?
        width: 0,                                       // width of div containing table
        colWidths: [],                                  // array of column widths eg [120, 120, 100, 100]
        minColWidth: 20,                                // minimum column width Column width will not go below this number
        target: null,                                   // the div that will hold the finished product
        tableNetWidth: 0,                               // table net width (width - scrollbar width)
        minHeight: 100,                                 // minimum height of table
        footer: false,                                  // show footer
		headerHeight: 18,

        /* Main Table Classes */
        headerBgClass: 'grid-header-bg',                // header background class
        footerBgClass: 'grid-footer-bg',                // footer background class
        bodyTableDivClass: 'grid-bodyDiv',              // main div to hold the body table (to allow horizontal scrolling of whole table
        bodyTableClass: 'grid-body',                    // body table class
        headerTableClass: 'grid-header',                // header table class
        footerTableClass: 'grid-footer',                // footer table class
        colClasses: [],                                 // array of classes for columns : i.e. ['','col-2','','']
        rowClasses: ['grid-odd', 'grid-even'],          // array of classes for rows
        rowHoverClass: 'grid-row-hover',                // hovering over a row? use this class
        rowSelectedClass: 'grid-row-selected',          // row selected?  use this class
        headerSelectedClass: 'grid-header-selected',    // header selected class

        /* Column Alignment */
        colAlignments: {},                              // array for column alignment : ie ['left', 'left', 'right', 'left']
        defaultColAlign: 'left',                        // default column alignment - used if col alignment array isn't defined
        bodyTdDivRightClass: 'grid-bodyData-right',     // data alignment class - right alignment
        bodyTdDivLeftClass: 'grid-bodyData-left',       // data alignment class - left alignment
        bodyTdDivCenterClass: 'grid-bodyData-center',   // data alignment class - center alignment

        /* Information Bar Classes */
        infoBarTClass: 'grid-infoBar-T',                // info bar top class
        infoBarBClass: 'grid-infoBar-B',                // info bar bottom class
        TLClass: 'grid-infoBar-tl',                     // info bar top left class
        TCClass: 'grid-infoBar-tc',                     // info bar top center class
        TRClass: 'grid-infoBar-tr',                     // info bar top right class
        BLClass: 'grid-infoBar-bl',                     // info bar bottom left class
        BCClass: 'grid-infoBar-bc',                     // info bar bottom center class
        BRClass: 'grid-infoBar-br',                     // info bar bottom right class

        /* Row checkboxes */
        rowCheckBoxes: false,                           // display row checkboxes?
        checkedClass: 'grid-checked',                   // row checked class
        checkBoxClass: 'grid-checkBoxes',               // row unchecked class

        /* Search box config */
        search: { show: false, position: 'tr'},         // show search?  if yes, position (Top Left - tl, top right - tr, etc)
        searchClass: 'grid-search',                     // search box class
        go: { divClass: 'grid-go', text: 'Go'},            // "Go" / search button class
        searchTerm: 'Search',                           // search box initial text

        /* Row Selection */
        rowSelection: false,                            // allow row selection?
        onRowSelect: function(tr, selected){},          // function to call when row is clicked
        multipleRowSelect: function(rows, selected){},	// function to call when row multiple row selected
        selectedRowCount: 0,                            // used for sending data from table
        getSelectedColumns: 0,                          // number of columns of data to pass back
        previousRow: null,                              // previously selected row?  For shift select
        selectStyle: "single",                          // Determines how row selection works - single, multiple (Shift/CTRL keys)
        rightClick: "false",                            // Enable custom right click menu
        rightClickItems: [],                            // array of items to add to menu
        rightClickItemClasses: [],                      // array of classes to use for menu items
        rightClickMenuClass: 'rightClickMenu',          // default class for right click menu
        rightClickHeaderClass: 'rightClickHeader',      // default class for right click header
        menuHeader: 'Actions',                          // text for right click menu header

        /* Error Config */
        error: "There was an error in getting data.",   // standard error message to display on no data
        errorClass: "grid-error",                       // error class
		hideTableOnError: false,						// if there is an error getting data, hide the container

        /* Sorting Config */
        sorting: false,                                 // make table sortable?
        sortAscParam: 'asc',                            // param passed on ascending sort (i.e. '&dir=asc)
        sortDescParam: 'desc',                          // param passed on ascending sort (i.e. '&dir=desc)
        sortedColDir: 'asc',                           // current data's sorted directions
        sortDefaultDir: 'asc',                         // on 1st click, sort this direction
        sortAscClass: 'grid-sort-asc',                  // class for ascending sorted col
        sortDescClass: 'grid-sort-desc',                // class for descending sorted col
        sortNoneClass: 'grid-sort-none',                // ... not sorted? use this class
        resizableCols: false,                           // make columns resizable via drag + drop
        inlineSortingArray: null,                       // for inline sorting of page
        defaultCol: 'col',                              // attribute name used to groups TDs in columns
        defaultSortColClass: '',                        // class of intial sorted col (optional)

        /* Paging Config */
        paging: { show: false, position: 'bl'},         // create a paging toolbar
        rowCount: { show: false, position: 'br'},       // show row count?
        pageNumber: 1,                                  // page number (starting, advances with each page returned)
        recordsPerPage:  0,                             //  # of records per page to calculate # pages from total records
        totalRecords: null,                             // total records found 
        pageToolbarHeight: 25,                          // height of the paging toolbar
        pageStartClass: 'grid-page-start icon-fast-backward-1',              // class for paging starting page (1)
        pagePrevClass: 'grid-page-prev icon-backward',                // class for previous page
        pageInfoClass: 'grid-page-info',                // class for information
        pageInputClass: 'grid-page-input',              // class for input box
        searchInfoClass: 'grid-search-info',            // class for information
        searchInputClass: 'grid-search-input',          // class for input box
        pageNextClass: 'grid-page-next icon-forward-1',                // class for next button
        pageEndClass: 'grid-page-end icon-step-forward',                  // class for last page
        pageLoadingClass: 'grid-page-loading',          // class for loading page
        loadingDoneClass: 'grid-page-loading-done icon-ok-circled2',     // class for finished page loading
        pageRecordsInfo: 'grid-page-records-info',      // class for records info
        pagingDivClass: 'grid-paging',                  // paging class
        rowCountWidth: 175,                             // minimum width of row count

        /* Ajax Config */
        url: 'remote.html',                             // url to fetch data
        type: 'GET',                                    // 'POST' or 'GET'
        dataType: 'html',                               // 'html' or 'json' - expected dataType returned
        extraParams: {},                                // a map of extra params to send to the server
        loadingClass: 'grid-loading',                   // loading loading mask div
        loadingHtml: '<div>&nbsp;</div>',               // default html for loading mask

        /* Edit In Place */
        editInPlace: false,                             // allows for ajax data editing in grid
        editInPlaceEdit: 'edit',                        // edit in place normal edit class
        editInPlaceSelect: 'select',                    // edit in place select class
        editInPlaceError: function(jqXHR, textStatus, errorThrown){},   //function to deal with edit in place errors
        editInPlaceSelectList: '',                      // list of value/text for select box, eg. {'Y':'Yes', 'N':'No'}

        /* should seldom change */
        resizeHandleHtml: '',                           // resize handle html + css
        resizeHandleClass: 'grid-col-resize',           // resize handle class
        scrollbarW: 17,                                 // width allocated for scrollbar

        /* cookie, for saving state */                  // not used yet
        cookieExpiresDays: 360,                         // cookie expiry date
        cookiePath: '/',                                // cookie path
        cookie: false,                                  // save state of modernGrid?

        /* not yet implemented */
        resizableGrid: false,                           // resizable grid?
        dragDropCols: false,                            // drag/drop cols?
        sortType: 'server|client|none'                  // sort server side, client side, or none
    };

/*********  Basic Setup of modernGrid **********/

    cfg.target = target_;
    $(cfg.target).addClass('modernGrid');
    $.extend(cfg, options_);
    if (!cfg.height) { 
        cfg.scrollbarW = 0; // remove scrollbar spacing if no scrollbar
    }
    var params = { order_by : cfg.sortedCol, order_dir : cfg.sortDefaultDir, current_page:cfg.pageNumber, records_per_page: cfg.recordsPerPage };
    var data = $.extend(cfg.extraParams, params);
    if ( cfg.width == 0 ) {
        cfg.width = $(cfg.target).parent().width();
    }
    if (cfg.tableType == 'dynamic') { cfg.initialLoad = true;}
	
    $(document).find(cfg.target).css('width', cfg.width);
    cfg.tableNetWidth = (cfg.width-cfg.scrollbarW);
    createInfoBars();
    this.infoBarTLeft = $(cfg.infoBarTLeft);
    this.infoBarTCenter = $(cfg.infoBarTCenter);
    this.infoBarTRight = $(cfg.infoBarTRight);
    this.infoBarBLeft = $(cfg.infoBarBLeft);
    this.infoBarBCenter = $(cfg.infoBarBCenter);
    this.infoBarBRight = $(cfg.infoBarBRight);
    this.clearSelected = clearSelected;
    this.getSelectedRows = getSelectedRows;
    this.updatePaging = function(totalRecords){
        cfg.totalRecords = totalRecords;
        if ( tableCheck(body) && (cfg.paging.show)) {
            setPaging();
        }
        if ( tableCheck(body) && (cfg.rowCount.show)) {
            setRowCount();
        }   
    };
    this.closeRightClickMenu = function(){
        $('.'+cfg.rightClickMenuClass).remove();
    }

    this.refresh = function(){
        refresh();
    }

    this.reload = function(params){
        if (!params.current_page) {
            cfg.pageNumber = 1;
        }
        $(cfg.target).find('.' + cfg.bodyTableDivClass).prepend(loadingOverlay());
        var combinedParams = $.extend(params,{ order_by :cfg.sortedCol, order_dir : cfg.sortDir, current_page: cfg.pageNumber });
        var data = $.extend(cfg.extraParams, combinedParams);
        load(data, true);
    };
    if (cfg.initialLoad){
        $(cfg.target).html(loadingOverlay());
        $(cfg.target).css('height', cfg.minHeight);
        $(window).resize( function() {
            windowResize();
        });
        load(data);
    }
    else {

        $(function() { 
            var table = $(cfg.target).find('table');
            $(cfg.target).html('');
            $(cfg.target).prepend(loadingOverlay());
            $(cfg.target).css('height', cfg.minHeight);
            $(window).resize( function() {
                windowResize();
            });
            setTimeout( function(){
                mainBuild(table);
            }, 0);
        });
    }

/*********  START OF LOADING FUNCTIONS **********/

    function load(data, reload) {
            getData(data, reload);
    }

	function refresh() {
            var data = $.extend(cfg.extraParams, params);
            load(data, true);
	}

/*********  START OF GET DATA FUNCTION **********/

    function getData(data, reload) {
        
        $.ajax({
            type: cfg.type,
            url: cfg.url,
            data: data,
            dataType: cfg.dataType,
            success: function(result){
                mainBuild(result, reload);

            },
            error: function(jqXHR, textStatus, errorThrown) {
                var loadingMask = $(cfg.target).find('.'+ cfg.loadingClass).fadeTo('fast', 0,  function () {
                    $(this).remove();
                });
					placeErrorMsg(cfg.error+' '+errorThrown, false);

            }
        });
    }
/*********  START OF MAIN BUILD FUNCTION **********/
    function mainBuild(data, reload) {
        
        if ( cfg.width == 0 ) {
            cfg.width = $(cfg.target).parent().width();
        }
        var errorText = cfg.error;
        var overflow = (cfg.height == undefined) ? 'hidden' : 'auto';
        if ( ((cfg.dataType == 'json') && (cfg.initialLoad == true)) && (data.error)) {
            errorText = data.error;
        }
        var body = ((cfg.dataType == 'json') && (cfg.initialLoad == true)) ? data.body : $(data).find('tbody');
        var header = ((cfg.dataType == 'json') && (cfg.initialLoad == true)) ? data.header : $(data).find('thead');
        var footer = ((cfg.dataType == 'json') && (cfg.initialLoad == true)) ? data.footer : $(data).find('tfoot');
        cfg.rowClasses = ((cfg.dataType == 'json') && (cfg.initialLoad == true)) ? ( (data.row_classes) ? data.row_classes : cfg.rowClasses) : cfg.rowClasses;
        cfg.colClasses = ((cfg.dataType == 'json') && (cfg.initialLoad == true)) ? ((data.column_classes) ? data.column_classes : cfg.colClasses) : cfg.colClasses;
        cfg.totalRecords = ((cfg.dataType == 'json') && (cfg.initialLoad == true)) ? ((data.total_num_results) ? data.total_num_results : null) : (cfg.searchTerm!='Search') ? $(data).html() : cfg.totalRecords;
        cfg.footer = (cfg.footer)? ((((cfg.dataType == 'json') && (cfg.initialLoad == true)) && (footer.length == 0)) ? false : true) : false;

        if ((reload) || ($(cfg.target).children().hasClass(cfg.bodyTableClass))) {
            if (body) { 
                $(cfg.target).find('.'+cfg.bodyTableClass).replaceWith(formatBody(body));
            }
            else{ 
                placeErrorMsg(errorText, reload);
            }
            if((body) && (header)) {
                $(cfg.target).find('.'+cfg.headerTableClass).replaceWith(formatHead(header));
                $(cfg.target).find('.'+cfg.headerTableClass).show();
            }
            else { 
                $(cfg.target).find('.'+cfg.headerTableClass).hide();
            }
            if ((body) && (footer) && (cfg.footer)) {
                $(cfg.target).find('.'+cfg.footerTableClass).replaceWith(formatFoot(footer));
                $(cfg.target).find('.'+cfg.footerTableClass).show();
            }
            else {
                $(cfg.target).find('.'+cfg.footerTableClass).hide();
            }
        }
        else {
            var tblBody = $('<div />').addClass(cfg.bodyTableDivClass)
                .css({
                    overflow: overflow,
                    width: cfg.tableNetWidth
                    });
            $(cfg.target).append(tblBody);
            if (tableCheck(body)) {
                $(cfg.target).append(formatBody(body));
            }
            else {
                placeErrorMsg(errorText, reload);
            }
            if ( tableCheck(body) && tableCheck(header)) {
                $(cfg.target).prepend(formatHead(header));
            }
            if ( tableCheck(body) && tableCheck(footer) && (cfg.footer)) {
                $(cfg.target).append(formatFoot(footer));
            }
            if (cfg.infoBarTop) {
                $(cfg.target).prepend(cfg.infoBarT);
            }
            if (cfg.infoBarBottom) {
                $(cfg.target).append(cfg.infoBarB);
            }
        }

        cfg.tableNetHeight = $(cfg.target).find('.'+cfg.bodyTableClass).height();

        if ( tableCheck(body) && (cfg.paging.show)) {
            setPaging();
        }
        if ( tableCheck(body) && (cfg.rowCount.show)) {
            setRowCount();
        }
        if (cfg.search.show) {
            createSearchBox();
        }


        if (cfg.rightClick == true) {
           $(cfg.target).contextmenu( function(event) {
                return false;   
            });

            $('body').bind("mousedown", function (e) {

            	if (!$(e.target).parents('.modernGrid').length > 0) {

                        $('.'+cfg.rightClickMenuClass).remove();

                }
            });           

        }        

        $(cfg.target).css('height', 'auto');
        // resize if parent is smaller/larger than current table
        if  (($(cfg.target).parent().width() !==0) && ($(cfg.target).parent().width()  <  cfg.width)  ||  ($(cfg.target).parent().width()  >  cfg.width))   {
            windowResize();
        }

        if (cfg.editInPlace) {
            editInPlace();
        }

        cfg.initialLoad = ((cfg.tableType == 'hybrid') && (cfg.initialLoad == false)) ? true : cfg.initialLoad;
        $(cfg.target).find('.'+ cfg.loadingClass).fadeTo('slow', 0,  function () {
            $(this).remove();
        });
		

    }

/*********  START OF ERROR HANDLING FUNCTIONS ************/

    function tableCheck(table){
     if ((table && cfg.dataType == 'json' && cfg.initialLoad == true) || (table && $.trim(table.text()) != '')) {
        return true;
     }
    }

    function placeErrorMsg(errorText, reload) {
		if (cfg.hideTableOnError) {
				console.log($(cfg.target).attr('id'));
				$(cfg.target).hide();
		} else {
			var error = $('<table>').addClass(cfg.bodyTableClass).css('width', cfg.tableNetWidth)
				.append('<div class="'+cfg.errorClass+'">'+errorText+'</div>');
			if (!reload) {
				$(cfg.target).append(error);
				$(cfg.target).find('.'+cfg.pageRecordsInfo).remove();
			}
			else {
				$(cfg.target).find('.'+cfg.bodyTableClass).replaceWith(error);
				$(cfg.target).find('.'+cfg.pageRecordsInfo).remove();
			}
		}
    }

/*********  START OF TABLE BUILDING FUNCTIONS **********/

    function formatHead(header){
        var row  = $(cfg.target).find('tr:first');
        var cols = row.find('td');
        cols = cols.length;
        var avgColWidth = cfg.width/cols;
        $(row).find('td').each(function(i){
		 if (cfg.colWidths.length>0) {
			$(this).width(cfg.colWidths[i]);
		 }
		 else {
            if(cols > 1) {
                if ( (i == 0) && !(cfg.rowCheckBoxes) ){
                    cfg.colWidths[i] = ($(this).width() > (avgColWidth+((cols-1)*avgColWidth*0.1)))
                        ? avgColWidth+((cols-1)*avgColWidth*0.1) : $(this).width();
                }
                else if ( (i == 1) && (cfg.rowCheckBoxes) ){
                    cfg.colWidths[i] = ($(this).width() > (avgColWidth+((cols-1)*avgColWidth*0.1)))
                        ? avgColWidth+((cols-1)*avgColWidth*0.1) : $(this).width();
                }
                else if (i==0) {
                    cfg.colWidths[i] = $(this).width();
                }
                else {
                     cfg.colWidths[i] = (avgColWidth * 0.9);
                }
            }
            else {
                cfg.colWidths[i] = $(this).width();
            }
			}
        });
        var headerTable = $('<table>').addClass(cfg.headerTableClass).css('width', cfg.tableNetWidth);
        var tableRow = ((cfg.dataType == 'json') && (cfg.initialLoad == true)) ? $('<tr>').addClass(cfg.headerBgClass) 
            : header.find('tr').addClass(cfg.headerBgClass);
        var count = 0;
        if (cfg.rowCheckBoxes) {
            var checkColumn = $('<th></th>');
            if (cfg.selectStyle !== "single") {
                checkColumn.addClass(cfg.checkBoxClass).html('&nbsp;').width(cfg.colWidths[count])
                .bind('click', function(){
                    initHeaderCheckBox(this);
                });
            }
            else {
            }
            tableRow.prepend(checkColumn);
        }
        if ((cfg.dataType == 'json') && (cfg.initialLoad == true)) {
            $.each(header, function(i){
               count =  buildHeaderCells(this, count, i, tableRow);
            });
         }
         else {
            tableRow.each(function(i){
                $(this).addClass(cfg.headerBgClass);
                $(this).find('th').each(function(j){
                    if ((cfg.rowCheckBoxes) && (j == 0)) {
                    }
                    else if (cfg.rowCheckBoxes){
                        count = buildHeaderCells(this, count, j-1);
                    }
                    else {
                        count = buildHeaderCells(this, count, j);
                    }
                });
            });
        }
        if ((cfg.dataType == 'json') && (cfg.initialLoad == true)) { 
            $(headerTable).append(tableRow);
        }
        else {
            $(headerTable).append(header);
        }
        return headerTable;
    }

    function formatBody(body){
	
        var bodyTable = $('<table>').addClass(cfg.bodyTableClass).css('width', cfg.tableNetWidth).css('table-layout', 'inherit');
        if ((cfg.dataType == 'json') && (cfg.initialLoad == true)) {
            $.each(body, function(i) {
                buildTableRows(this, i, bodyTable);
            });
        }
        else {

            var tableRow = $(body).find('tr');
            if (cfg.totalRecords == null) {
                //cfg.totalRecords = tableRow.length;
            }
            tableRow.each(function(i){
                buildTableRows(this, i);

            });
            $(bodyTable).append(body);
        }
        return bodyTable;
    }

    function formatFoot(footer){
        var count = 0;
        var footerTable = $('<table>').addClass(cfg.footerTableClass).css('width', cfg.tableNetWidth);
        var tableRow = ((cfg.dataType == 'json') && (cfg.initialLoad == true)) ? $('<tr>') : footer.find('tr'); 
		$.each(tableRow, function(i) {
			$(this).addClass(cfg.footerBgClass);
			var currentCell = ((cfg.dataType == 'json') && (cfg.initialLoad == true)) ? footer : $(this).find('td');
			$.each(currentCell, function(i){
				var w = (cfg.rowCheckBoxes) ? cfg.colWidths[count+1] : cfg.colWidths[count];
				var cell = ((cfg.dataType == 'json') && (cfg.initialLoad == true)) ?  $('<td>') : $(this);
				var  colClass   =   (cfg.colClasses.length   >   0)   ?   cfg.colClasses[count]   : '';
				cell.addClass(colClass)
					.attr(cfg.defaultCol, i)
					.css({
						width: w
					});
				var footerText = ((cfg.dataType == 'json') && (cfg.initialLoad == true)) ? '' + this : cell.html();
				cell.text('');
				var footerDiv = $('<div>').html(footerText);
				cell.append(footerDiv);
				count ++;
				$(this).append(cell);
			});
			$(footerTable).append($(this));
		});


        return footerTable;
    }

/*********  START OF ROW AND CELL BUILDING FUNCTIONS **********/

    function buildHeaderCells(headerCell, count, k, tableRow) {
        var curColClass = ((cfg.dataType == 'json') && (cfg.initialLoad == true)) ? null : $(headerCell).attr('class');
        var w = (cfg.rowCheckBoxes) ? cfg.colWidths[count+1] : cfg.colWidths[count];
        var  colClass   =   (cfg.colClasses.length   >   0)   ?   cfg.colClasses[count]   :   '';
        var cell = ((cfg.dataType == 'json') && (cfg.initialLoad == true)) ? $('<th>').addClass(colClass) : $(headerCell).addClass(colClass);
        cell.css({
            width: w,
            height: cfg.headerHeight
        })  
            .attr(cfg.defaultCol, k)
            .css('-moz-user-select', 'none')
            .css('-khtml-user-select', 'none')
            .css('user-select', 'none')
            .attr('unselectable', 'on');
        var headerDiv = $('<div>');
        if ((cfg.dataType == 'json') && (cfg.initialLoad == true)) {
            headerDiv.text('' + headerCell);
        }
        else {
            var headerText =$(headerCell).text();
            cell.text('');
            headerDiv.text(headerText);
        }
        if (cfg.sorting) {
            columnSorting(count, k, headerDiv, cell.attr('class'));
        }
        cell.append(headerDiv)
            .bind('resizeColumn', {col_num : k}, function(e, w){
                $(this).width(w);
                $(cfg.target).find("."+cfg.colClasses[e.data.col_num]).each(function(){
                    $(this).width(w);
                });
            });
        if (cfg.resizableCols) {
            columnResize(cell);
        }
        count ++;
        if ((cfg.dataType == 'json') && (cfg.initialLoad == true)) {
            tableRow.append(cell);
        }
        return count;
    }

    function buildTableRows(currentRow, i, bodyTable){
        
        // find column count - used to find col width if not explicitly set

        if (i == 0) {
            cfg.colCount = $(currentRow).find('td').length;
            if (cfg.colWidths.length == 0) {
                var cWidth = cfg.width/cfg.colCount;
                for (var cnt = 0; cnt < cfg.colCount; cnt++) {
                    cfg.colWidths[cnt] = cWidth;
                }
            }
        }

        var tableRow =  ((cfg.dataType == 'json') && (cfg.initialLoad == true)) ? $('<tr>') : $(currentRow);
        if ((cfg.dataType == 'json') && (cfg.initialLoad == true)) {
            tableRow.attr('data-id', i);
        }
        
        var count = 0;
        if (((cfg.dataType == 'json')) || ((cfg.dataType == 'html')) ) {

            // custom row styles (striping, etc) & hover
            if (cfg.rowClasses.length > 0) {
                var cursor = (i == 0 ? 0 : i % cfg.rowClasses.length);
                if (cfg.rowClasses[cursor] !== '') {

                    // custom row class
                    tableRow.addClass(cfg.rowClasses[cursor]);
                }
            }
            if (cfg.rowHoverClass !== '') {

                // hover class
                tableRow.hover(
                    function() {
                        if ($(this).attr('_selected') !== 'true') {
                            $(this).addClass(cfg.rowHoverClass);
                        }
                    },
                    function() {
                        if ($(this).attr('_selected') !== 'true') {
                            $(this).removeClass(cfg.rowHoverClass);
                        }
                    }
                );
            }
			
            // bind row selection behaviors
            if (cfg.rowSelection == true) {
                selectRows(tableRow, i);
            }
            if ((cfg.dataType == 'json') && (cfg.initialLoad == true)) {
                $.each(currentRow, function(j){
                    data = buildBodyCells(this, count, j, tableRow);
                    count = data;
                });
            }
            else {
                var cells = $(currentRow).find('td');
                cells.each(function(j){
                  data = buildBodyCells(this, count, j);
                  count = data;
                });
            }
            if ((cfg.dataType == 'json') && (cfg.initialLoad == true)) {
                $(bodyTable).append(tableRow);
            } else {
                return tableRow;
            }
        }
        else {
            $(currentRow).html('');
        }
    }

    function buildBodyCells(bodyCell, count, k, tableRow) {
        var w = (cfg.rowCheckBoxes) ? cfg.colWidths[count+1] : cfg.colWidths[count];
        var  colClass  =  (cfg.colClasses.length  >  0)   ?   cfg.colClasses[count]   : '';
        var cell = ((cfg.dataType == 'json') && (cfg.initialLoad == true)) ? $('<td>') : $(bodyCell);
        cell.css({
            height: cfg.headerHeight
        }) 
        if (cfg.rowSelection) {
            cell.addClass(colClass)
                .attr(cfg.defaultCol, k)
                .css('-moz-user-select', 'none')
                .css('-khtml-user-select', 'none')
                .css('user-select', 'none')
                .attr('unselectable', 'on');
        }
        else {
            cell.addClass(colClass).attr(cfg.defaultCol, k);
        }
        if (cfg.colAlignments.length == undefined){
            cfg.colAlignments[k] = cfg.defaultColAlign;
        }
        var tdClass = cfg.bodyTdDivLeftClass;

        if (cfg.colAlignments[k] == 'center') {
            tdClass = cfg.bodyTdDivCenterClass;
        }
        else if (cfg.colAlignments[k] == 'right'){
            tdClass = cfg.bodyTdDivRightClass;
        }
        var bodyText = ((cfg.dataType == 'json') && (cfg.initialLoad == true)) ? '' + bodyCell : cell.html();
        cell.html('');
        var bodyDiv = $('<div>').addClass(tdClass).html(bodyText);
        if ((cfg.rowCheckBoxes) && (k==0)) {
            var checkColumn = $('<td>').addClass(cfg.checkBoxClass);
            if ((cfg.dataType == 'json') && (cfg.initialLoad == true)) {
                tableRow.prepend(checkColumn);
            }
            else {
                cell.parent().prepend(checkColumn);
            }
        }
		bodyDiv.css({
            width: w,
            height: cfg.headerHeight
        }) 
        cell.append(bodyDiv);
        count++;
        if ((cfg.dataType == 'json') && (cfg.initialLoad == true)) {
            tableRow.append(cell);
        }
        return count;
    }

    function initHeaderCheckBox(checkBox){
        $(checkBox).attr('_selected', 'true').removeClass(cfg.checkBoxClass).addClass(cfg.checkedClass);
        var allRows = $(cfg.target).find('.'+cfg.bodyTableClass).find('tr');
        allRows.each(function(){
            $(this).attr('_selected', 'true').addClass(cfg.rowSelectedClass);
        });
        $(checkBox).unbind().click(function(){
            resetHeaderCheckBox(checkBox);
        });
    }

    function resetHeaderCheckBox(checkBox){
        $(checkBox).attr('_selected', 'false').removeClass(cfg.checkedClass).addClass(cfg.checkBoxClass);
        var allRows = $(cfg.target).find('.'+cfg.bodyTableClass).find('tr');
        allRows.each(function(){
            $(this).attr('_selected', 'false').removeClass(cfg.rowSelectedClass).removeClass(cfg.rowHoverClass);
        });
        $(checkBox).unbind().click(function(){
            initHeaderCheckBox(checkBox);
        });
    }

/*********  START OF COLUMN FUNCTIONS (SORTING & RESIZE) **********/

    function columnSorting(count, i, headerDiv, cellClass){
        cfg.sortedCol = (!cfg.sortedCol && cfg.defaultSortColClass == '') ? 0 :
            ((!cfg.sortedCol && cfg.defaultSortColClass) ? cfg.defaultSortColClass : cfg.sortedCol);
        var cls = ((i == cfg.sortedCol) || (cellClass == cfg.sortedCol)) ?
            ( ( cfg.sortedColDir == cfg.sortAscParam ) ? cfg.sortAscClass : cfg.sortDescClass ) :
            ( cfg.sortNoneClass );
        headerDiv.addClass(cls).click(function(){
            var loadingMask = loadingOverlay();
            $(cfg.target).find('.' + cfg.bodyTableDivClass).prepend(loadingMask);
            cfg.sortedColDir = ( $(this).attr('class') == cfg.sortDescClass ) ? cfg.sortAscParam  :
                ($(this).attr('class') == cfg.sortAscClass ? cfg.sortDescParam : cfg.sortDefaultDir );
            var dir = (cls == cfg.sortNoneClass)
                ?  cfg.sortDefaultDir  :  (  cls  ==  cfg.sortAscClass)  ?  cfg.sortDescParam   :   cfg.sortAscParam   ;
            var clicked = $(this).parent().attr('class');
            if (clicked !== '') {
                clicked = clicked.split(" ", 1);
                cfg.sortedCol = $(this).parent().attr(cfg.defaultCol);
            }
            else {
                clicked = $(this).parent().attr(cfg.defaultCol);
                cfg.sortedCol = clicked;
            }
			
            cfg.sortDir = dir;
            params = { order_by : clicked, order_dir : dir, current_page:1 };
            cfg.pageNumber = 1;
            var data = $.extend(cfg.extraParams, params);
			cfg.sortedCol = data.order_by;
            load(data, true);
        });
    }

    function columnResize(cell){

        // make column headers resizable
        var handle = $('<span />').html(cfg.resizeHandleHtml == '' ? '-' :
            cfg.resizeHandleHtml).addClass(cfg.resizeHandleClass);
        handle.bind('mousedown', function(e){

            // start resize drag
            var th      = $(this).parent();
            var left  = e.clientX;
            z.resizeStart(th, left);
        });
        cell.prepend(handle);
        var z_sel = 'vertical-resize-divider' + new Date().getTime();
					var ht = (cfg.height) ? cfg.headerHeight + cfg.height: cfg.headerHeight;
        var z   = $('<div id="' + z_sel + '"></div>')

            .css({
                backgroundColor: '#ababab',
                height: ht+('px'),
                width: '4px',
                position: 'absolute',
                zIndex: '10',
                display: 'block'
            })
            .extend({
                resizeStart : function(th, eventX){

                    // this is fired onmousedown of the column's resize handle
                    var pos = th.offset();
                    $(this).show().css({
                        top: pos.top,
                        left: eventX
                    });

                    // when resizing, bind some listeners for mousemove & mouseup events
                    $(cfg.target).bind('mousemove', {col : th}, function(e){

                        // on mousemove, move the vertical-resize-divider
                        var th      = e.data.col;
                        var pos     = th.offset();
                        var col_w   = e.clientX - pos.left;

                        // make sure cursor isn't trying to make column smaller than minimum
                        if (col_w > cfg.minColWidth) {
                            $('#' + z_sel).css('left', e.clientX);
                        }
                    });
                    $(cfg.target).bind('mouseup', {col : th}, function(e){

                        // on mouseup,
                        // 1.) unbind resize listener events from body
                        // 2.) hide the vertical-resize-divider
                        // 3.) trigger the resize event on the column
                        $(this).unbind('mousemove').unbind('mouseup');
                        $('#' + z_sel).hide();
                        var th      = e.data.col;
                        var pos     = th.offset();
                        var col_w   = e.clientX - pos.left;
                        if (col_w > cfg.minColWidth) {
                            th.trigger('resizeColumn', [col_w]);
                        } else {
                            th.trigger('resizeColumn', [cfg.minColWidth]);
                        }
                    });
                }
            });
    }

/*********  START OF ROW FUNCTIONS (SELECT & CLEAR) **********/

    function selectRows(row, i){
        row.mousedown   (function(e){

            if (cfg.selectStyle == 'app') {
                if (e.button == 2 && cfg.rightClick == true) {
                    y = e.pageY-75;
                    x = e.pageX-200;
                    rightClickMenu(row, x, y);
  
                } else if (e.ctrlKey) {
                    selectMultiRows(row);
                	$('.'+cfg.rightClickMenuClass).remove();
                }
                else if (e.shiftKey){
                    if ((cfg.previousRow !== null) && (cfg.previousRow !== i)) {
                        shiftSelectRows(row, i);
                    }
                    else if (cfg.previousRow == i){
                        clearSelected();
                    }
                    else {
                        row.attr('_selected', 'true').addClass(cfg.rowSelectedClass);
                    }
                    $('.'+cfg.rightClickMenuClass).remove();
                }
                else {
                    if ((cfg.previousRow == i) && (row.hasClass(cfg.rowSelectedClass))) {
                        clearSelected();
                    }
                    else {
                        clearSelected();
                        row.attr('_selected', 'true').addClass(cfg.rowSelectedClass);
                    }
                    $('.'+cfg.rightClickMenuClass).remove();
                }
                cfg.previousRow = i;

            }
            else if (cfg.selectStyle == 'single') {
                if ((cfg.previousRow == i) && (row.hasClass(cfg.rowSelectedClass))) {
                    clearSelected();
                }
                else {
                    clearSelected();
                    row.attr('_selected', 'true').addClass(cfg.rowSelectedClass);
                }
                cfg.previousRow = i;
                $('.'+cfg.rightClickMenuClass).remove();
                if (e.button == 2 && cfg.rightClick == true) {
                    y = e.pageY-75;
                    x = e.pageX-200;
                    rightClickMenu(row, x, y);
  
                } else if (cfg.onRowSelect) {
                    cfg.onRowSelect(row, ($(row).attr('_selected') == 'true' ? true : false) );
                }

            }
            else {
                selectMultiRows(this);
            }
            if (cfg.cookie) {
                saveSelectedRows(true);
            }
        });
    }

    function rightClickMenu(row, x, y) {
        var isVis = false;
        cfg.initialMenu = false;
        if ($('.'+cfg.rightClickMenuClass).is(':visible')) {
            isVis = true;
        }

        if (isVis == false) {
            cfg.initialMenu = true;
        }

        var cMenu = $('<div>').addClass(cfg.rightClickMenuClass).css({
            top: y + "px",
            left: x + "px"
        });
        var menuHeader = $('<div>').addClass(cfg.rightClickHeaderClass);
        $(menuHeader).html(cfg.menuHeader);

        $(cMenu).append(menuHeader);
        var menu = $('<ul>');

        menuItems = cfg.rightClickItems;
        menuClasses = cfg.rightClickItemClasses;
        $(menuItems).each(function(i) {
        	var currentItem = $('<li>');
			$.each(row.data(), function (name, value) {
			    currentItem.attr('data-' + name, value);
			});
        	$(currentItem).addClass(menuClasses[i]);
        	$(currentItem).html(this);
          $(menu).append(currentItem);       
        });
        $(cMenu).append(menu);
        $(cfg.target).append(cMenu);
        $(cMenu).show();        
    }

    function shiftSelectRows(row, i){
        if (Number(i) < Number(cfg.previousRow)) {
            highlightSelectedRows(i, cfg.previousRow);
        }
        else {
            highlightSelectedRows(cfg.previousRow, i);
        }
        if (cfg.multipleRowSelect) {

			
            cfg.multipleRowSelect($('tr[_selected="true"]'), ($(row).attr('_selected') == 'true' ? true : false) );
        }
    }

    function highlightSelectedRows(start, end) {
        $(cfg.target).find('.'+ cfg.bodyTableClass).find('tr').each(function(j){
            if ((j >= start) && (j <= end)){
                $(this).attr('_selected', 'true').addClass(cfg.rowSelectedClass);
            }
        });
    }

    function selectMultiRows(row){
        if ($(row).attr('_selected')) {
            if ($(row).attr('_selected') == 'true') {
                $(row).attr('_selected', 'false').removeClass(cfg.rowSelectedClass) ;
            }
            else {
                $(row).attr('_selected', 'true').addClass(cfg.rowSelectedClass);
            }
        } else {
            $(row).attr('_selected', 'true').addClass(cfg.rowSelectedClass);
        }
        if (cfg.onRowSelect) {
             cfg.multipleRowSelect($('tr[_selected="true"]'), ($(row).attr('_selected') == 'true' ? true : false) );
            }
        if ($(row).attr('_selected') == 'true') {
            cfg.selectedRowCount++;
        }
        else {
            if (cfg.selectedRowCount >0) {
                cfg.selectedRowCount--;
            }
        }
    }

    function getSelectedRows(getRowNumbers){
        var rows = [];
        var rowCount = 0;
        var rowNumbers = [];
        if ((cfg.getSelectedColumns>0) || (getRowNumbers)) {
            $(cfg.target).find('.'+cfg.bodyTableClass).find('tr').each(function(i){
                var count = 0;
                var column = [];
                if ($(this).attr('_selected') == 'true'){
                    rowNumbers.push([$(this).attr('row')]);
                    $(this).find('td').find('div').each(function(j){
                        if (j < cfg.getSelectedColumns) {
                            column[count] = $(this).text();
                            count++;
                        }
                    });
                    rows[rowCount] = column;
                    rowCount++;
                }
            });
            var output = (getRowNumbers) ? rowNumbers : rows;
            return output;
        }
    }

    function clearSelected(){
        $(cfg.target).find('.'+ cfg.bodyTableClass).find('tr').each(function(i){
            $(this).attr('_selected', 'false').removeClass(cfg.rowHoverClass).removeClass(cfg.rowSelectedClass);
        });
    }

    function saveSelectedRows() {
        if (jQuery.cookie) {
            var rowNums	= getSelectedRows(true);
            if (rowNums.length > 0) {
                jQuery.cookie( 'rows',  null, {expires: cfg.cookieExpiresDays, path: cfg.cookiePath});
                jQuery.cookie( 'rows',  rowNums, {expires: cfg.cookieExpiresDays, path: cfg.cookiePath});
            }
            
        }
        getSavedRows();
    }

    function getSavedRows() {
        var rowNums = [];
        if (jQuery.cookie) {
            rowNums = jQuery.cookie( 'rows' );
            if (rowNums) {
               // TODO use saved info to recreate state of modernGrid
            }
        }			
        return rowNums;
	}


/*********  START OF PAGING FUNCTIONS **********/

    function setRowCount(){
        var pv;
        if (cfg.totalRecords > 0) {
            pv = $('<div />')
                .addClass(cfg.pageRecordsInfo).css('width', cfg.rowCountWidth)
                .extend({
                    updateViewInfo : function(loaded_rows, page){
                        var _start = ( (loaded_rows * (page - 1) + 1) );
                        var _end   = ( (loaded_rows * page) > cfg.totalRecords ? cfg.totalRecords : loaded_rows * page );
                        this.html('Viewing Rows ' + _start + ' -  '  +  _end  +  '  of  '  +  cfg.totalRecords);
                        return this;
                    }
                });

            // update the "viewing x of y" record info
            pv.updateViewInfo(cfg.totr, cfg.pageNumber);
        }
        placePaging(pv, cfg.rowCount.position);
    }

    function setPaging() {
        var data = '';

        // create a paging toolbar
        var recordsOnPage = $(cfg.target).find('.'+ cfg.bodyTableClass).find('tr').length;
        cfg.totr  = cfg.recordsPerPage > 0 ? cfg.recordsPerPage : recordsOnPage;

        // create our paging control container
        var pagingContainer = $('<div />').addClass(cfg.pagingDivClass);


        // start page button
        var pb1 = $('<span>').addClass(cfg.pageStartClass).click(function(){
            var loadingMask = loadingOverlay();
            $(cfg.target).find('.' + cfg.bodyTableDivClass).prepend(loadingMask);
            var input = $(cfg.pagingDivClass).find('input.' + cfg.pageInputClass);
            //pload.html('<img src="'+cfg.pageLoadingImage+'">');
            cfg.pageNumber = 1;
            var params = {
                order_by : cfg.sortedCol,
                order_dir : cfg.sortDir,
                current_page:cfg.pageNumber
            };
            data = $.extend(cfg.extraParams, params);
            load(data, true);
        });

        // prev page button
        var pb2 = $('<span />').addClass(cfg.pagePrevClass).click(function(){
            if (cfg.pageNumber !== 1) {
                var loadingMask = loadingOverlay();
                $(cfg.target).find('.' + cfg.bodyTableDivClass).prepend(loadingMask);
            }
            var _p  =  Number($(cfg.target).find('.'+  cfg.pagingDivClass).find('input.'  +  cfg.pageInputClass).val());
            if (_p > 1) {
                _p--;
                //pload.html('<img src="'+cfg.pageLoadingImage+'">');
                cfg.pageNumber = _p;
                var params = {
                    order_by : cfg.sortedCol,
                    order_dir : cfg.sortDir,
                    current_page:cfg.pageNumber
                };
                data = $.extend(cfg.extraParams, params);
                load(data, true);
            }
        });

        // next page button
        if (cfg.totalRecords > 0) {
            var totp = Math.ceil(cfg.totalRecords / cfg.totr);
        }
        var pb3 = $('<span />').addClass(cfg.pageNextClass).click(function(){
            if (totp) {
                var loadingMask = loadingOverlay();
                $(cfg.target).find('.' + cfg.bodyTableDivClass).prepend(loadingMask);
                var params = '';
                if (cfg.pageNumber + 1 <= totp) {
                    //pload.html('<img src="'+cfg.pageLoadingImage+'">');
                    cfg.pageNumber++;
                    params = {
                        order_by :cfg.sortedCol,
                        order_dir : cfg.sortDir,
                        current_page:cfg.pageNumber
                    };
                    
                    data = $.extend(cfg.extraParams, params);
                    load(data, true);
                } else {
                    $(cfg.target).find('.'+ cfg.loadingClass).fadeTo('slow', 0,  function () {
                        $(this).remove();
                    });
                }
            } else {
                var loadingMask = loadingOverlay();
                $(cfg.target).find('.' + cfg.bodyTableDivClass).prepend(loadingMask);
                //pload.html('<img src="'+cfg.pageLoadingImage+'">');
                cfg.pageNumber++;
                params = {
                    order_by : cfg.sortedCol,
                    order_dir : cfg.sortDir,
                    current_page:cfg.pageNumber
                };
                data = $.extend(cfg.extraParams, params);
                load(data, true);
            }
            return false;
        });

        // loading indicator
        var pload   = $('<span />').addClass(cfg.loadingDoneClass);

        // page field & form
        var  pfld  =  $('<input   type="text"   value="'   +   cfg.pageNumber   +   '"/>').addClass(cfg.pageInputClass);
        var pinfo = $('<span />')
            .addClass(cfg.pageInfoClass)
            .append(pfld);
        var pform = $('<form />').append(pinfo).submit(function(){
            var loadingMask = loadingOverlay();
            var _p  =  Number($(cfg.target).find('.'+  cfg.pagingDivClass).find('input.'  +  cfg.pageInputClass).val());
            if (_p) {
                if (totp) {
                    var input =  $(cfg.target).find('.'+  cfg.pagingDivClass).find('input.'  +  cfg.pageInputClass);
                    var params = '';
                    if (_p <= totp) {
                        $(cfg.target).find('.' + cfg.bodyTableDivClass).prepend(loadingMask);
                        //pload.html('<img src="'+cfg.pageLoadingImage+'">');
                        cfg.pageNumber = _p;
                        params = {
                            order_by :cfg.sortedCol,
                            order_dir : cfg.sortDir,
                            current_page:cfg.pageNumber
                        };
                        data = $.extend(cfg.extraParams, params);
                        load(data, true);
                    }
                } else if (_p > 0) {
                    $(cfg.target).find('.' + cfg.bodyTableDivClass).prepend(loadingMask);
                    //pload.html('<img src="'+cfg.pageLoadingImage+'">');
                    cfg.pageNumber = _p;
                    params = {
                        order_by : cfg.sortedCol,
                        order_dir : cfg.sortDir,
                        current_page:cfg.pageNumber
                    };
                    data = $.extend(cfg.extraParams, params);
                    load(data, true);
                }
            } else {
                alert('Please Enter a Valid Page Number.');
            }
            return false;
        });

        // last page button & info (if we know total records)
        var pb4;
        if (cfg.totalRecords > 0) {
            pinfo.html('Page ' + pinfo.html() + ' of ' + totp);
            pb4 = $('<span />').addClass(cfg.pageEndClass).click(function(){
                var loadingMask = loadingOverlay();
                $(cfg.target).find('.' + cfg.bodyTableDivClass).prepend(loadingMask);
                var _p = Number($(cfg.target).find('.'+ cfg.pagingDivClass).find('input.' + cfg.pageInputClass).val()); _p++;
                if (totp) {
                    var  input  =  $(cfg.target).find('.'+  cfg.pagingDivClass).find('input.'   +   cfg.pageInputClass);
                    //pload.html('<img src="'+cfg.pageLoadingImage+'">');
                    cfg.pageNumber = totp;
                    var params = {
                        order_by : cfg.sortedCol,
                        order_dir : cfg.sortDir,
                        current_page:cfg.pageNumber
                    };
                    data = $.extend(cfg.extraParams, params);
                    load(data, true);
                }
            });
        } else {
            pinfo.html('Page ' + pinfo.html());
        }
        $(pagingContainer).append(pb1).append(pb2).append(pform).append(pb3).append(pb4).append(pload);
        placePaging(pagingContainer, cfg.paging.position);
    }
    function placePaging(pagingItem, position) {
        switch (position) {
            case 'tl':
                $(cfg.infoBarTLeft).html(pagingItem);
            break;
            case 'tc':
                $(cfg.infoBarTCenter).html(pagingItem);
            break;
            case 'tr':
                $(cfg.infoBarTRight).html(pagingItem);
            break;
            case 'bl':
                $(cfg.infoBarBLeft).html(pagingItem);
            break;
            case 'bc':
                $(cfg.infoBarBCenter).html(pagingItem);
            break;
            case 'br':
                $(cfg.infoBarBRight).html(pagingItem);
            break;
            default:
            break;
        }
    }

/*********  START OF SEARCH FUNCTIONS **********/

    function createSearchBox() {
        var pfld  = $('<input type="text" value=\"' + cfg.searchTerm + '""/>').addClass(cfg.searchInputClass).click(function(){
            $(this).val('');
        });
        var pinfo = $('<div />')
                                .addClass(cfg.searchInfoClass)
                                .append(pfld);
        var sb = $('<form></form>').append(pinfo).submit(function(){
            searchClick();
            return false;
        });
        go = $('<div></div>').addClass(cfg.go.divClass)
                .text(cfg.go.text)
                .css({
                    cursor: 'pointer',
                    display: 'inline',
                    padding: '0 3px'
                })
                .bind('click', function(){
                    rows = getSelectedRows();
                    var clicked = $(this).attr("class");
                    searchClick();
            });
        pinfo.append(go);
        var searchBox = $('<div></div>').addClass(cfg.searchClass);
        searchBox.append(sb);
        placePaging(searchBox, cfg.search.position);
        }

    function searchClick() {
            var loadingMask = loadingOverlay();
            $(cfg.target).find('.' + cfg.bodyTableDivClass).prepend(loadingMask);
            cfg.searchTerm  =  $(cfg.target).find('.'+  cfg.searchClass).find('input.' + cfg.searchInputClass).val();
            cfg.pageNumber = 1;
            var params = {
                order_by : cfg.sortedCol,
                order_dir : cfg.sortDefaultDir,
                search_term : cfg.searchTerm,
                current_page:cfg.pageNumber
            };
            var data = $.extend(cfg.extraParams, params);
            load(data, true);
    }

/*********  START OF MISC FUNCTIONS (OVERLAY, RESIZE) **********/

    function editInPlace() {

        $('.'+cfg.editInPlaceEdit).on('click', function() {
            var initialData = $(this).text();
            var id = $(this).attr('id');
            if ($(this).hasClass('editbox')) {

            } else {
                $(this).addClass('editbox').removeClass('edit');
                var editbox = $('<input class="newData" value="'+initialData+'">');
                $(this).html(editbox);
                $(this).find('.newData').focus();
                $('.newData').on('focusout', function() {
                    var newData = $(this).val();
                    var parent = $(this).parent();
                    $.ajax({
                      type: "POST",
                      url: cfg.updatePage,
                      data: {
                        id: id,
                        value: newData
                      },
                      success: function(msg) {
                        parent.html(msg);
                        parent.addClass('edit').removeClass('editbox');
                      },
                      error: function(jqXHR, textStatus, errorThrown) {
                        editInPlaceError(jqXHR, textStatus, errorThrown);
                      }
                    });
                });
                $('.newData').keypress(function(e){
                    if(e.which == 13){
                        $(this).blur();    
                    }
                });
            }
        });

        $('.'+cfg.editInPlaceSelect).click(function() {
            var initialData = $(this).text();
            var id = $(this).attr('id');
            if ($(this).hasClass('selectbox')) {

            } else {
                $(this).addClass('selectbox').removeClass('select'); 
                var selList = $('<select>').addClass('selList');
                $.each(cfg.editInPlaceSelectList, function(index, value) {
                    var opt = $('<option>').attr('val', index).text(value);
                    if (value == $.trim(initialData)) {
                        $(opt).attr('selected', 'selected');
                    }
                    $(selList).append(opt);
                });
                $(this).html(selList);

                $('.selList').on('change', function() {
                    var newData = $(this).val();
                    var parent = $(this).parent();
                    $.ajax({
                      type: "POST",
                      url: cfg.updatePage,
                      data: {
                        id: id,
                        value: newData
                      },
                      success: function(msg) {
                        parent.html(msg);
                        parent.addClass('select').removeClass('selectbox');
                      },
                      error: function(jqXHR, textStatus, errorThrown) {
                        editInPlaceError(jqXHR, textStatus, errorThrown);
                      }
                    });
                });
          }         
        });

    }
		
    function createInfoBars(){
        cfg.infoBarT = $('<div>').addClass(cfg.infoBarTClass).css({
            width: cfg.tableNetWidth,
            height: cfg.pageToolbarHeight
        });
        var spacer = $('<div>').css({
            visibility: 'hidden',
            clear: 'both'
        });
        cfg.infoBarTLeft = $('<span>').addClass(cfg.TLClass);
        cfg.infoBarTCenter = $('<span>').addClass(cfg.TCClass);
        cfg.infoBarTRight = $('<span>').addClass(cfg.TRClass);
        $(cfg.infoBarT).append(cfg.infoBarTRight).append(cfg.infoBarTLeft).append(cfg.infoBarTCenter).append(spacer);
        cfg.infoBarB = $('<div>').addClass(cfg.infoBarBClass).css({
            width: cfg.tableNetWidth,
            height: cfg.pageToolbarHeight
        });
        cfg.infoBarBLeft = $('<span>').addClass(cfg.BLClass);
        cfg.infoBarBCenter = $('<span>').addClass(cfg.BCClass);
        cfg.infoBarBRight = $('<span>').addClass(cfg.BRClass);
        $(cfg.infoBarB).append(cfg.infoBarBRight).append(cfg.infoBarBLeft).append(cfg.infoBarBCenter).append(spacer);
    }

    function loadingOverlay() {
        var height = (cfg.tableNetHeight == undefined) ? cfg.minHeight : cfg.tableNetHeight;
        return $('<div />').html(cfg.loadingHtml).addClass(cfg.loadingClass)
            .css({
                width: cfg.width,
                height: height,
                position: 'absolute',
                zIndex: '1000'
            });
    }

    function windowResize() {
            cfg.width = $(cfg.target).parent().width();
            cfg.tableNetWidth = (cfg.width-cfg.scrollbarW);
            $(cfg.target).css('width', cfg.width);
            $(cfg.target).find('.' + cfg.bodyTableDivClass).css({width: cfg.tableNetWidth});
            $(cfg.target).find('.'+cfg.bodyTableClass).css({width: cfg.tableNetWidth});
            $(cfg.target).find('.'+cfg.headerTableClass).css({width: cfg.tableNetWidth});
            $(cfg.target).find('.'+cfg.footerTableClass).css({width: cfg.tableNetWidth});
            $(cfg.target).find('.'+cfg.infoBarBClass).css({width: cfg.width});
            $(cfg.target).find('.'+cfg.infoBarTClass).css({width: cfg.width});
    }
}

    $.modernGrid = function(target, options) {
        var modernGrid = new ModernGrid(target, options);
        return modernGrid;
    }

})(jQuery);
