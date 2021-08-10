import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wildcardSearchFilterPipe'
})
export class WildcardSearchFilterPipePipe implements PipeTransform {
  transform(items: any[], fields: string[], value: string): any[] {
    if (!items) {
      //console.log("Search - no items!")
      return [];
    }
    //no search return everything
    if (!value || value === ""){
      return items;
    }

    let returnArray = [];

    //use regex split to split on space or * for wildcard
    let splitext = value.toLowerCase().split(/[\s\*]+/);
    //console.log(`split text = ${JSON.stringify(splitext)}`);
    //generate an and regex for all the split parts
    let regexp_and = "(?=.*" + splitext.join(")(?=.*") + ")";
    //console.log(`regex = ${regexp_and}`);
    // Compile the regular expression
    let re = new RegExp(regexp_and, "i");

    //loop through all the items
    for (let x = 0; x < items.length; x++) {
      //console.log(`item -> ${JSON.stringify(items[x])}`)
      let thisItem = items[x];
      //loop through all the key value pairs
      for (let key in thisItem){
        //test if this field should be searched
        if (!fields.includes(key)) continue;
        //if the item has the key property
        if(thisItem.hasOwnProperty(key)){
          //test it against the regex
          if (re.test(thisItem[key])) {
            //console.log(`match! -> ${key} -> ${thisItem[key]}`)
            //add it to the results array when matched
            returnArray.push(items[x]);
            //if we added an item skip the rest of the fields - whole item is added
            break;
          }
        }
      }
    }
    return returnArray;
  }




}
