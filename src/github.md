The issue happened when trying to use `state` and `snap` method in valtio to produce a global state with multiple properties.
State template could be like: 
```
state = proxy({data: [
    { id: 0, category: "A"},
    { id: 1, category: "B" },
    { id: 2, category: "C" },
    { id: 3, category: "D" },
    { id: 4, category: "E" },
    { id: 5, category: "F" },
    { id: 6, category: "G" },
  ],
  required: 0,
  requiredIsEdited: false,
})
```
Then, in the parent component, you will use a `snap.data.map()` to render all items
```
function ParentComponent () => {
return <div>{snap.data.map(x=><div key={x.id}>{x.category}</div>)}</div>
} 

````

- The most known fact and React's golden rule is to never render lists with keys made by index from `.map()` function, unfortunately, this rule didn't apply with valtio even when x.id instead of index.
- To check, open any CRUD app with valtio, go to react devtools, then **_Highlight updates when components render_** to **_true_**
- You will see how painful to perform with all re-renders for all items once you trigger any CRUD to your list.
- If you try to attach `React.memo()` to each component to reduce the effects it will not get you anywhere because `React.memo()` works on props for functional components and `useSnapshot` is hook not at prop attached to components
- To prove, again open react devtools, then profiler, and record some of your actions to UI.
- You will get all child items are re-rendered for each CRUD operation as reason for `prop changed (children)`, and the parent component is re-rendered because a `hooks changed`
![image](https://user-images.githubusercontent.com/15833672/127757965-20146085-c33e-472f-bc66-3b722e1caa67.png)
![image](https://user-images.githubusercontent.com/15833672/127757981-ed358a71-8c64-4bc8-ac9c-0f7ef78a2b69.png)

So, actually what really happens here is with each update to state, the parent component is re-rendered with a new useSnapshot hook to catch the latest updates, then, children are re-rendered also as due to new value that comes from new useSnapshot hook 
There's no mechanize to batch the array of old items with new/edited items, and also there's no way to confidence React to reconcile the only batched items to reduce re-renders



**Workaround**
As mentioned in documention
state for mutating & snap for reading

don't use snap for reading items inside any component's body - instead, declare and get access to all the properties needed to update the component "before return"

if you need to get a value you can use state again with no worries 

```
function ParentComponent () => {
const { data } = useSnapshot(state)
return <div>{state.data.map(x=><div key={x.id}>{x.category}</div>)}</div>
} 
```
What happened here is that when you get access to the proxy "touching proxy" from snapshot the component will listen to updates but the return items with get its value from state which is not a hook like useSnapshot that changed with each render and cause render