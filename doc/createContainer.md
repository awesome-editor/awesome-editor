# createContainer

- a helper function to create a React view component

The first pass looks like this:

```javascript
export default createContainer(
  [
    {observable: AppState.currentDocMinusTagsObservable, property: 'doc'},
    {observable: AppState.currentDocTagsObservable, property: 'tags'}
  ],
  {
    previewMode: false,
    updateDoc: AppState.updateDoc
  },
  {
    getInitialState() {

      return Object.assign(new DocData())
    }
  }
)(Editor)
```

Obvious problem is that it's not user friendly.
With a little more work can look like this:

```javascript
export default createContainer({
    doc: AppState.currentDocMinusTagsObservable,
    tags: AppState.currentDocTagsObservable
    previewMode: false,
    updateDoc: AppState.updateDoc
 })(Editor)
```

Basically, it's just a mapping from observables/values/functions to properties on Editor.

- assumes that if you pass an observable, it extracts the value and maps it to the property i.e.,
  you can't pass an observable to a stateless functional component
- you lose the spreading of properties i.e., AppState.currentDocMinusTagsObservable => doc
  in original code it was AppState.currentDocMinusTagsObservable => {uuid, doc, title, content}
  i.e., you lose ability to fine-grain the observable.

3rd pass:

```javascript
export default createContainer({
    observers: [
       {obs: AppState.currentDocMinusTagsObservable, props: ['uuid', 'doc', 'title', 'content']},
       {obs: AppState.currentDocTagsObservable, props: ['tags']}
    ],
    previewMode: false,
    updateDoc: AppState.updateDoc
 })(Editor)
```

We don't have any of the cons as above but it's not as intuitive. Under the hood it's also more complex.

## Verdict
- go with 2nd pass. It's dead simple, intuitive. If you need fine-grained control over components or for some reason
  need to pass an observable to a functional compoment, then create the class by hand.
  
## Wait! There's more

- We haven't discussed taking inputs from a parent container. 
