you probably want to write code like this:

```javascript
onChange(tag) {

  lookupTag(tag).then(tag => this.setState(tag))
}
```

Unfortunately, as pointed out, this is error prone: (1) difficult to coordinate different streams, 
(2) memory leaks with zombie listeners, (3) missed events.

Alternative?

```javascript
export default createComponent({
  lookupTag: AppState.lookupTag
  lookupTagResult: AppState.lookupTagObservable
})(Tag)
```

```javascript
export default ({lookupTag, lookupTagResult}) => {
  return (
    <div>{lookupTagResult}</div>
    <input onChange={evt => lookupTag(evt.target)} />
  )
}
```

So the component is pretty clean. One downside is that it's counterintuitive to get "values" from *another* function. 
But then again, this is how you do functional components in React.

The only downside is boilerplate. How the heck can we automate the creation of lookupTagResult?

Because of time travel, the saga must publish the result to the app dispatcher.
We can just return a value and automagically publish it. 
Now we need to listen to it. 
Here's where it gets hairy. Well, if we were attaching observers on the fly, it would get complex.
However, the lookupTagObservable gets created at component creation.

