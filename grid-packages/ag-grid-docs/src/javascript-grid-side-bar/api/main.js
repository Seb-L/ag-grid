var gridOptions = {
    columnDefs: [
        { field: "athlete", filter: 'agTextColumnFilter', minWidth: 200 },
        { field: "age" },
        { field: "country", minWidth: 200 },
        { field: "year" },
        { field: "date", minWidth: 160 },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" }
    ],
    defaultColDef: {
        flex: 1,
        minWidth: 100,
        // allow every column to be aggregated
        enableValue: true,
        // allow every column to be grouped
        enableRowGroup: true,
        // allow every column to be pivoted
        enablePivot: true,
        sortable: true,
        filter: true
    },
    sideBar: {
        toolPanels: [
            {
                id: 'columns',
                labelDefault: 'Columns',
                labelKey: 'columns',
                iconKey: 'columns',
                toolPanel: 'agColumnsToolPanel',
            },
            {
                id: 'filters',
                labelDefault: 'Filters',
                labelKey: 'filters',
                iconKey: 'filter',
                toolPanel: 'agFiltersToolPanel',
            }
        ],
        defaultToolPanel: 'filters',
        hiddenByDefault: true
    }
};

function setSideBarVisible(value) {
    gridOptions.api.setSideBarVisible(value);
}

function isSideBarVisible() {
    alert(gridOptions.api.isSideBarVisible());
}

function openToolPanel (key) {
    gridOptions.api.openToolPanel(key);
}

function closeToolPanel() {
    gridOptions.api.closeToolPanel();
}

function getOpenedToolPanel() {
    alert(gridOptions.api.getOpenedToolPanel());
}

function setSideBar(def) {
    gridOptions.api.setSideBar(def);
}

function getSideBar() {
    var sideBar = gridOptions.api.getSideBar();
    alert(JSON.stringify(sideBar));
    console.log(sideBar);
}

function setSideBarPosition(position) {
    gridOptions.api.setSideBarPosition(position);
}

function getOpenedToolPanelItem() {
    alert(gridOptions.api.getOpenedToolPanelItem());
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);

    // do http request to get our sample data - not using any framework to keep the example self contained.
    // you will probably use a framework like JQuery, Angular or something else to do your HTTP calls.
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', 'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json');
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var httpResult = JSON.parse(httpRequest.responseText);
            gridOptions.api.setRowData(httpResult);
        }
    };
});
