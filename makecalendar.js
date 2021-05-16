/**
   * @parama {string} elem , the html element where the calentar will be appended
   * @parama {number} year
   * @parama {string or number} month, string must be in latin, number 1-12
   */

function createCalendar(elem, year, month){
      let start=document.querySelector(elem);
            
      let date =  (typeof(month) == 'string') ? new Date(`'${year} ${month}'`) : new Date (year,month-1) ;
      
      const mon = date.getMonth();
      console.log(mon)
      
      let table = document.createElement('table');
      let caption = document.createElement('caption');
      caption.innerHTML= date.toLocaleString('default', { month: 'long', year: 'numeric' });
      table.append(caption);

      //Make Days header (try do it in options)
      let days=["пн","вт","ср","чт","пт","сб","вс"];
      let row = document.createElement("tr");
      for (a of days){
        let th = document.createElement('th');
        th.innerHTML=a;
        row.append(th);
      }
      table.append(row);

      row = document.createElement("tr"); //null row element
      //create blank cells
      for (let i=0; i< getDay(date);i++){
        let td = document.createElement('td');
        row.append(td);
      }

    
        while (date.getMonth() == mon){
          let td = document.createElement('td');
          td.innerHTML= date.getDate();
          row.appendChild(td);
          //make new row every seven days 
          if ( getDay(date)%7 == 6){
            table.appendChild(row)
            row =document.createElement('tr');
          }
          
          date.setDate( date.getDate() + 1) ;   
        }
        //add empty cells in the end of month
        if(getDay(date) != 0){
          for (let i=getDay(date); i<7;i++){
            let td = document.createElement('td');
            row.appendChild(td);
          }
        }
        
        table.append(row)
        start.append(table)
    }
    /**
     * Convert setting days in a calendar to the eastern type MO-SU.
     * $returns {number} day[0]-> day[7] Sun
    */
    function getDay(date){
      let day=date.getDay();
      if (day==0)
        day=7;
      return day-1;
    }

createCalendar('body',2021,9);
