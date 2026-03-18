import React, { useRef, useEffect } from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'tabulator-tables/dist/css/tabulator.min.css';
import './DataTable.css';

const DataTable = ({ data, type, title }) => {
  const tableRef = useRef(null);

  // Определение колонок в зависимости от типа таблицы
  const getColumns = () => {
    if (type === 'students') {
      return [
        { title: '№', field: 'id', width: 50, hozAlign: 'center' },
        { title: 'ФИО', field: 'name', width: 200 },
        { title: 'Группа', field: 'group', width: 100 },
        { title: 'Предмет 1', field: 'subject1', width: 100 },
        { title: 'Предмет 2', field: 'subject2', width: 100 },
        { title: 'Предмет 3', field: 'subject3', width: 100 },
        { title: 'Предмет 4', field: 'subject4', width: 100 }
      ];
    } else if (type === 'attendance') {
      return [
        { title: '№', field: 'id', width: 50, hozAlign: 'center' },
        { title: 'ФИО', field: 'name', width: 200 },
        { title: 'Дата 1', field: 'date1', width: 100 },
        { title: 'Дата 2', field: 'date2', width: 100 },
        { title: 'Дата 3', field: 'date3', width: 100 },
        { title: 'Дата 4', field: 'date4', width: 100 },
        { title: 'Дата 5', field: 'date5', width: 100 }
      ];
    }
    return [];
  };

  const options = {
    layout: 'fitColumns',
    pagination: 'local',
    paginationSize: 10,
    movableColumns: true,
    resizableRows: true,
    initialSort: [
      { column: 'id', dir: 'asc' }
    ],
    placeholder: 'Нет данных для отображения'
  };

  // Пример данных для демонстрации
  const getSampleData = () => {
  
  };

  const tableData = data.length > 0 ? data : getSampleData();

  return (
    <div className="contfor-table">
      <div className="pfp-block-inner">
        <h2>{title}</h2>
        <ReactTabulator
          ref={tableRef}
          columns={getColumns()}
          data={tableData}
          options={options}
        />
      </div>
    </div>
  );
};

export default DataTable;