function create(base, datas, table, action = null){

    const newDatas =[{
      fields: {
        ...datas
      }
    }] 

    base(`${table}`).create(
        newDatas
        , function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function (record) {
          console.log(record.getId());
          if(action){
            action(record)
          }
        });
      });
}

export default create