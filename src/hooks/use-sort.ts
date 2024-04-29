import { ref, Ref } from 'vue';

function useSort(tableRef: Ref, cols: Ref<any[]>) {

  const sortQuery = ref();

  const resetColumnSort = (prop: string, sort: string) => {
    return cols.value.map(column => {
      if (column.prop !== prop && column.sortable) {
        console.log(column);
        column.sortable = true;
      } else if (column.prop === prop) {
        column.sortable = sort;
      }
      return column;
    })
  }

  const sortChange = (prop: string, sort: string) => {
    if (sort) {
      sortQuery.value = {
        prop,
        sort: sort.replace('ending', '')
      };
    } else {
      sortQuery.value = false;
    }
    cols.value = resetColumnSort(prop, sort);
    tableRef.value.reset();
  };

    return {
      sortQuery,
      sortChange
    };
}

export { useSort };