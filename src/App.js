
import './App.css';
import {useState} from 'react';

function App() {
  const[items,Setitem] = useState([]);
  const numItems=items.length;
  const packedItems=items.filter((item)=>item.packed).length;
 
  function handleItem(item){
    Setitem((items)=>[...items,item])
  }
  function DeleteItem(id){
    console.log(id);
    Setitem((items)=>items.filter((item)=>item.id!==id));
  }
  function UpdateItem(id){

Setitem(items=>items.map((item)=>
  item.id === id ? { ...item, packed: !item.packed } : item))
  }
  function ClearAll(){
   const confirmed=window.confirm('Are you sure you want to delete everything');
    if(confirmed) Setitem([]);
  }
  return (
    <div className="App">
      <Logo></Logo>
     <Form onAddItems={handleItem}></Form>
     <List items={items} DeleteItem={DeleteItem} UpdateItem={UpdateItem} ClearAll={ClearAll}/>
     <Stats numItems={numItems} packedItems={packedItems} ></Stats>
    </div>
  );
}
 function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}

function Form({onAddItems}){
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  
 

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
 

   console.log(newItem);
   onAddItems(newItem)

    setDescription("");
    setQuantity(1);
  }
  return(
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  )
}
function List({items,DeleteItem,UpdateItem,ClearAll}){
  const[sort,Setsort]=useState("Sort by Description");
  let sortedItems;
  if(sort==='Sort by Description') sortedItems=items;
  if(sort==='Sort by Packed') sortedItems=items.slice().sort((a,b) =>Number(a.packed)-Number(b.packed));
  if(sort==='Sort by Order') sortedItems=items.slice().sort((a,b)=>a.description.localeCompare(b.description));

  return(
    <div className='list'>
     <ul>
      {sortedItems.map((item) =>(
        <Item item={item} key={item.id} DeleteItem={DeleteItem} UpdateItem={UpdateItem} ClearAll={ClearAll}/>
      ))}
     </ul>
<p>I love you</p>
<div className='actions'>
<select value={sort} onChange={(e)=>Setsort(e.target.value)}>
  <option value="Sort by Description">Sort by Description</option>
  <option value="Sort by Packed">Sort by Packed</option>
  <option value="Sort by Order">Sort by Order"</option>
</select>
<button onClick={ClearAll}>Clear List</button>

</div>
    </div>
  );
}
function Item({item,DeleteItem,UpdateItem}){
return(<li>
  <span style={item.packed?{textDecoration:"line-through"}:{}}>
    {item.quantity} {item.description} 
  </span>
  <button onClick={() => DeleteItem(item.id)}>❌</button>
  <input type="checkbox" value={item.packed} onChange={()=>UpdateItem(item.id)}></input>
</li>
);
}
function Stats({numItems,packedItems}){
  const Y=(packedItems/numItems)*100;
  if(numItems===0){
    return(< footer className='stats'>What are you waiting for?</footer>);
  }
  return(
    

    <footer className='stats'>
      {Y===100?<em className='stats'>You got to go now✈️</em>:<em>You have {numItems} items in your List, You packed {packedItems} items ({Y}% completed)</em>}</footer>
    
  )
}

export default App;
