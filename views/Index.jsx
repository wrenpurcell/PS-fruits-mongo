const React = require('react')

class Index extends React.Component {
  render() {
    return (
      <div>
        <link rel="stylesheet" href="/css/app.css" />

        <h1>Fruits index page</h1>
        <ul>
          {
            this.props.fruits.map((fruit, i) => {
              return (
                <li key={i}>
                  The <a href={`/fruits/${fruit.id} `}>
                    {fruit.name}</a>

                    {` is ${fruit.color}.`}

                  {fruit.readyToEat ? <span> It is ready to eat. </span> : 
                  <span> It is not ready to eat!!!</span>}
                 <form action={`/fruits/${fruit._id}?_method=DELETE`} method="POST">
                    <input type="submit" value="DELETE" />
                  </form>
                  <a href={`/fruits/${fruit._id}/edit`}>Edit This Fruit</a>
                </li>
              )
            })
          }
        </ul>
        <nav>
          <a href='/fruits/new'>Create a new fruit</a>
        </nav>
      </div>
    )

  }
}
module.exports = Index