function deleteData(base, id, table, action = null){

    base(`${table}`).destroy([`${id}`], function(err, deletedRecords) {
        if (err) {
          console.error(err);
          return;
        }
        if(action){
            action(deletedRecords)
        }
      });
}

export default deleteData