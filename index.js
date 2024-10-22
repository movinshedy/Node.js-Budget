import fs from 'fs';
import {Command} from "commander";
import chalk from 'chalk';

const program = new Command();

program
.name("BUDGET_TRACKER")
.description("To make your budget easy interm of seving time")



//add item
program
.command("new")
.description("Adds a new item")
.option("-t | --title <value>", "title of the new item to be added")
.option("-q | --quantity <value>", "the quantity of the new item to be added")
.option("-p | --unitprice <value>", "the price per quantity of item to be added")
.action(function(options){
    const title = options.title;
    const quantity = options.quantity;
    const unitprice = options.unitprice;
    
    const newItem = {
        title: title,
        quantity: quantity,
        unitprice: unitprice,
        lastUpdateAt: new Date(),
    };
  const loadedItems = fs.readFileSync('./data/items.json', "utf-8");
  let items;
  if (!loadedItems) {
    items=[];
  }
  items = JSON.parse(loadedItems);

  const itemExists = items.find((currentItem) => currentItem.title === title)
   if (itemExists) {
    console.log(chalk.bgBlue('Item with title already exists'))
    return;
   }
  items.push(newItem);

    fs.writeFileSync("./data/items.json", JSON.stringify(items));
    console.log(chalk.bgGreen('New Item added successfully!!!'))
})

//update item



//get item
program
.command("read")
.description("Display specified item")
.option("-t, --title <value>", "title of the item to be Displayed")
.action(function(options) {
    const title = options.title;
   const loadedItems= fs.readFileSync("./data/items.json", "utf8");
   const items = JSON.parse(loadedItems); 

   if (items.length === 0) {
    console.log(chalk.yellowBright("Their is no any Item"));
    return;
}
if (title) {
    const item = items.find((currentItem) => currentItem.title === title);
    if (item) {
        console.log(item.title)
        return
    }
    console.log(chalk.bgRed('No item with that title '))
    return;
}
items.forEach ((currentItem) => {
    console.log(chalk.bgBlack("========"))
    console.log(currentItem.title);
   });
});


//get items
/*program.command("read")
.description("Display All item")
.action(function() {
   const loadedItems= fs.readFileSync("./data/items.json", "utf8"); 
   const items = JSON.parse(loadedItems)

   if (items.length === 0) {
    console.log(chalk.yellowBright("Their is no any Item"));
    return;
   }

   items.forEach ((currentItem) => {
    console.log(chalk.bgBlack("========"))
    console.log(currentItem.title);
   });
});*/


//delete item
program.command("delete")
.description("delete a an item")
.option("-t, --title <value>", "title of the item to be deleted")
.action(function(options) {
    const title = options.title;
    const loadedItems = fs.readFileSync("./data/items.json", "utf8");
    const items = JSON.parse(loadedItems);
    if (items.length===0) {
        console.log(chalk.bgCyan('Nothing to delete'));
        return;
    }
    const remainingItems = items.filter((currentItem) => currentItem.title !== title);
    fs.readFileSync("./data/items.json", JSON.stringify(remainingItems));
    console.log(chalk.bgGreenBright('Item deleted successfully.')); 
})
program.parse (process.argv);