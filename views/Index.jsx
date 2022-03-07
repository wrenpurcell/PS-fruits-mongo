const React = require('react')

class Index extends React.Component {
  render() {
    return (
      <div>
        <h1>Fruits index page</h1>
        <ul>
          {
            this.props.fruits.map((fruit, i)=>{
              <li>
                The <a href={`fruits/${fruit.id}`}>{fruit.name}</a>
                 { fruit.name } is { fruit.color}
                
                {fruit.readyToEat} ? `It is ready to eat` : `It is not ready to eat`
              </li>
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