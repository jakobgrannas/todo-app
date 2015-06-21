var React = require('react'),
	ProductData = require('./ProductData'),
	ProductAPI = require('./utils/ProductAPI'),
	TodoApp = require('./components/todo');

// Load Mock Product Data into localStorage
ProductData.init();

// Load Mock API Call
ProductAPI.getProductData();

// Render FluxCartApp Controller View
/*React.render(
	<TodoApp />,
	document.getElementById('todo-app')
);*/
