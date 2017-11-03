import React, { Component } from 'react';
import { defaultRecipes, messages } from './initData.js';
import './App.css';

//create a list of all recipe names from initial data
//TO DO: if user data is stored, use that instead.
let recipes = defaultRecipes;

class Parent extends Component {
  render() {
    return (
      <div>
        <p>NOTE: I am still completing this app. Please check back soon for the finished product!</p>
        <Header />
        <App />
        <Footer />
      </div>
    );
  }
};
class Header extends Component {
    render() {
      return (
        <header>
          <div className="banner">
            <h1 className='title'>My Recipes</h1>
          </div>
          <p>Add, edit, or view your recipes below.</p>
          <p>Your data is automatically stored, so you can come back and see it again later.</p>
          <hr/>
        </header>
      );
    }
}
class Footer extends Component {
  render() {
    return (
      <footer>
        <hr/>
          <p>This is a <a href="https://www.freecodecamp.org/challenges/build-a-recipe-box" target="_blank" rel="noopener noreferrer">freeCodeCamp project</a>.
          See my other work on my <a href="http://shoheishibata.com/categories/Programming/" target="_blank" rel="noopener noreferrer">website</a> as well as<a className="fa fa-github fa-2x" aria-hidden="true" href="https://github.com/shibatas/" target="_blank" rel="noopener noreferrer"></a>  and
          <a className="fa fa-codepen fa-2x" aria-hidden="true" href="https://codepen.io/Shohei51/" target="_blank" rel="noopener noreferrer"></a>.</p>
          <p>Shohei Shibata &#9426; copyright 2017</p>
      </footer>
    );
  }
}

//From here is all the app contents!
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null, //recipe array index position to be rendered
      editExisting: false,
      recipes: recipes,
      messages: messages,
      showRecipe: false,
      editRecipe: false,
    };
  }
  toggleRecipe = (e) => {
    this.setState({
      showRecipe: !this.state.showRecipe,
      id: e.target.id,
      editExisting: true
    })
  }
  toggleEdit = () => {
    this.setState({
      editRecipe: !this.state.editRecipe,
    })
  }
  render() {
    return (
      <div className="app">
        <RecipeDetails show={this.state.showRecipe} id={this.state.id} toggle={this.toggleRecipe} edit={this.toggleEdit}/>
        <EditRecipe show={this.state.editRecipe} id={this.state.id} existing={this.state.editExisting} toggle={this.toggleEdit} />
        <Messages messages={this.state.messages} />
        <RenderNames action={this.toggleRecipe} />
        <div className="app-footer">
          <hr/>
          <button onClick={this.toggleEdit}>Add a new recipe</button>
        </div>
      </div>
    );
  }
}
class Messages extends Component {
  render() {
    return (
      <div>
        {this.props.messages.map(function(item, index){
          return <p key={index}>{item}</p>
        })}
      </div>
    );
  }
}
class RenderNames extends Component {
  render() {
    return (
      <div>
        {recipes.map((recipe, index) => {
          return <button id={recipe.id} key={recipe.id} onClick={this.props.action}>{recipe.name}</button>;
        })}
      </div>
    );
  }
}
class RecipeDetails extends Component {
  render() {
    if (!this.props.show) {
      return null;
    } else {
      let recipe = recipes.find((item)=>{
        return item.id.toString() === this.props.id;
      });
      return (
        <div>
          <div className="backdrop" onClick={this.props.toggle}></div>
          <div className="modal">
            <div className="wrap">
              <button className="modal-close" onClick={this.props.toggle}>&#215;</button>
            </div>
            <h1>{recipe.name}</h1>
            <div className="recipe">
              <h3 className="left">Ingredients:</h3>
              <table>
                <thead>
                  <tr>
                    <th width='70%'>Ingredient</th>
                    <th>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {recipe.ingredients.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item[0]}</td>
                        <td>{item[1] + ' ' + item[2]}</td>
                      </tr> );
                  })}
                </tbody>
              </table>
              <h3 className="left">Instructions:</h3>
              <table className="instructions">
                <tbody>
                  {recipe.instructions.map((item, index) => {
                    return (
                        <tr key={index}>
                          <td width='50px'>{(index + 1) + '.'}</td>
                          <td>{item}</td>
                        </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button onClick={this.props.edit}>Edit this recipe</button>
              <button>Delete this recipe</button>
            </div>
          </div>
        </div>
      );
    }
  }
}
class EditRecipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'test'
    }
  }
  update = (e) => {
    console.log(e.target.id);
    this.setState({
      name: e.target.value
    })
  }
  submit = () => {
    console.log(this.state);

    this.props.toggle();
  }
  render() {
    if (!this.props.show) {
      return null;
    } else {
      return (
        <div>
          <div className="backdrop" onClick={this.props.toggle}></div>
          <form className="modal" action="javascript:void(0);" onSubmit={this.submit}>
            <div className="wrap">
              <button className="modal-close" onClick={this.props.toggle}>&#215;</button>
            </div>
            <h1>Recipe Editor</h1>
            <h3>Type in your recipe below and hit submit!</h3>
            <table className="row">
              <tbody>
                <tr>
                  <td className="left"><label>Name:</label></td>
                  <td colSpan="3"><input type="text" id="name" defaultValue={this.state.name} onChange={this.update}/></td>
                </tr>
                <tr><td><br/></td></tr>
                <tr>
                  <td className="left"><label>Ingredients:</label></td>
                </tr>
                <tr>
                  <td/>
                  <td className="center" width="200">name</td>
                  <td className="center">qty</td>
                  <td className="center">unit</td>
                </tr>
                <tr>
                  <td className="right"><label>1:</label></td>
                  <td><input type="text" /></td>
                  <td><input type="text" /></td>
                  <td><input type="text" /></td>
                </tr>
                <tr>
                  <td className="right"><label>2:</label></td>
                  <td><input type="text" /></td>
                  <td><input type="text" /></td>
                  <td><input type="text" /></td>
                </tr>
                <tr/>
                <tr><td><br/></td></tr>
                <tr>
                  <td className="left"><label>Instructions:</label></td>
                </tr>
                <tr>
                  <td className="right"><label>1:</label></td>
                  <td colSpan="3"><input type="text" /></td>
                </tr>
                <tr>
                  <td className="right"><label>2:</label></td>
                  <td colSpan="3"><input type="text" /></td>
                </tr>
              </tbody>
            </table>
            <div className="center">
              <button className='btn-small'>More Ingredients</button>
              <button className='btn-small'>More Instructions</button>
            </div>
            <div className="modal-footer">
              <input className='btn btn-submit' type="submit" value="submit"/>
            </div>
          </form>
        </div>
      );
    }
  }
}

export default Parent;